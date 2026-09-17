const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET || "rota-change-this-secret";

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
  });
  pool.on("error", (err) => console.error("Database pool error:", err.message));
}

async function ensureAuthTable() {
  if (!pool) return;
  await pool.query(`
    create table if not exists rota_auth_users (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      email text not null unique,
      phone text,
      role text not null default 'Cliente',
      password_hash text not null,
      created_at timestamptz not null default now()
    );
    create index if not exists idx_rota_auth_users_email on rota_auth_users(lower(email));
  `);
}

function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email, phone: row.phone || "", role: row.role, created_at: row.created_at };
}

function makeToken(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return res.status(401).json({ error: "Não autenticado." });
  try {
    req.auth = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Sessão expirada. Entre novamente." });
  }
}

app.get("/api/health", async (req, res) => {
  if (!pool) return res.status(503).json({ ok: false, service: "ROTA", databaseConfigured: false, database: "not_configured" });
  try {
    await pool.query("select 1");
    return res.json({ ok: true, service: "ROTA", databaseConfigured: true, database: "connected" });
  } catch {
    return res.status(503).json({ ok: false, service: "ROTA", databaseConfigured: true, database: "error" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  if (!pool) return res.status(503).json({ error: "Banco de dados não configurado no servidor." });
  const { name, email, phone, role, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios." });
  if (String(password).length < 8) return res.status(400).json({ error: "A senha precisa ter pelo menos 8 caracteres." });
  const allowedRoles = ["Cliente", "Entregador", "Vendedor / Loja", "Caminhoneiro", "Empresa / VIP"];
  const safeRole = allowedRoles.includes(role) ? role : "Cliente";
  try {
    const emailNorm = String(email).trim().toLowerCase();
    const exists = await pool.query("select id from rota_auth_users where lower(email)=lower($1) limit 1", [emailNorm]);
    if (exists.rowCount) return res.status(409).json({ error: "Este e-mail já possui acesso. Entre na sua conta." });
    const passwordHash = await bcrypt.hash(String(password), 12);
    const result = await pool.query(
      "insert into rota_auth_users(name,email,phone,role,password_hash) values($1,$2,$3,$4,$5) returning id,name,email,phone,role,created_at",
      [String(name).trim(), emailNorm, phone ? String(phone).trim() : null, safeRole, passwordHash]
    );
    const user = publicUser(result.rows[0]);
    return res.status(201).json({ user, token: makeToken(user) });
  } catch (err) {
    console.error("register:", err.message);
    return res.status(500).json({ error: "Não foi possível criar o acesso agora." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  if (!pool) return res.status(503).json({ error: "Banco de dados não configurado no servidor." });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Informe e-mail e senha." });
  try {
    const result = await pool.query("select * from rota_auth_users where lower(email)=lower($1) limit 1", [String(email).trim().toLowerCase()]);
    if (!result.rowCount) return res.status(401).json({ error: "E-mail ou senha inválidos." });
    const row = result.rows[0];
    const valid = await bcrypt.compare(String(password), row.password_hash);
    if (!valid) return res.status(401).json({ error: "E-mail ou senha inválidos." });
    const user = publicUser(row);
    return res.json({ user, token: makeToken(user) });
  } catch (err) {
    console.error("login:", err.message);
    return res.status(500).json({ error: "Não foi possível entrar agora." });
  }
});

app.get("/api/auth/me", auth, async (req, res) => {
  if (!pool) return res.status(503).json({ error: "Banco de dados não configurado no servidor." });
  try {
    const result = await pool.query("select id,name,email,phone,role,created_at from rota_auth_users where id=$1 limit 1", [req.auth.sub]);
    if (!result.rowCount) return res.status(404).json({ error: "Usuário não encontrado." });
    return res.json({ user: publicUser(result.rows[0]) });
  } catch {
    return res.status(500).json({ error: "Não foi possível validar a sessão." });
  }
});

app.use(express.static(path.join(__dirname)));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not found" });
  res.sendFile(path.join(__dirname, "index.html"));
});

(async () => {
  try { await ensureAuthTable(); console.log("ROTA auth table ready"); }
  catch (err) { console.error("Auth table setup failed:", err.message); }
  app.listen(PORT, "0.0.0.0", () => console.log(`ROTA running on port ${PORT}`));
})();
