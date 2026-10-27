import express, { type ErrorRequestHandler } from "express";
import helmet from "helmet";
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Database location: my-app/server/db/db1/students.db
const dbDir = path.resolve(dirname, "../db/db1");

fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, "students.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

app.use(helmet());
app.use(express.json({ limit: "20kb" }));

type StudentInput = {
  name: string;
  subject: string;
  award: string;
  school_year: string;
};

type Student = StudentInput & {
  id: number;
};

// Create the table if it doesn't exist.
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    award TEXT NOT NULL,
    school_year TEXT NOT NULL
  );
`);

// Insert sample records only when the table is empty.
const count = db
  .prepare("SELECT COUNT(*) AS total FROM students")
  .get() as { total: number };

console.log("Database location:", dbPath);
console.log("Existing student records:", count.total);

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO students (name, subject, award, school_year)
    VALUES (?, ?, ?, ?)
  `);

  const seed = db.transaction(() => {
    insert.run("Nguyễn Văn A", "TOÁN", "GIẢI NHẤT", "2024-2025");
    insert.run("Trần Thị B", "NGỮ VĂN", "GIẢI NHÌ", "2024-2025");
    insert.run("Lê Văn C", "VẬT LÝ", "GIẢI BA", "2024-2025");
    insert.run("Phạm Thị D", "HÓA HỌC", "GIẢI NHÌ", "2024-2025");
  });

  seed();
  console.log("Sample students inserted.");
}

// Debugging: these logs run on EVERY server start.
console.log(
  "DATABASE CONTENTS:",
  db.prepare("SELECT * FROM students").all()
);

console.log(
  "TABLES:",
  db.prepare(`
    SELECT name, sql
    FROM sqlite_master
    WHERE type = 'table'
  `).all()
);

const getStudents = db.prepare(`
  SELECT id, name, subject, award, school_year
  FROM students
  ORDER BY id ASC
`);

const getStudent = db.prepare(`
  SELECT id, name, subject, award, school_year
  FROM students
  WHERE id = ?
`);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: dbPath,
  });
});

app.get("/api/students", (_req, res) => {
  const students = getStudents.all() as Student[];
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ error: "Invalid student ID" });
    return;
  }

  const student = getStudent.get(id) as Student | undefined;

  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json(student);
});

const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`API: http://127.0.0.1:${PORT}`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
