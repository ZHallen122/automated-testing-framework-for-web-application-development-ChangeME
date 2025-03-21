import express from 'express';
import { Database } from 'better-sqlite3';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './database.sqlite';

// Middleware configuration
app.use(cors());
app.use(express.json());

// Database initialization
const db = new Database(DB_PATH, { verbose: console.log });

// Execute the schema.sql file for setting up the database structure
try {
    const schema = fs.readFileSync('./schema.sql', 'utf-8');
    db.exec(schema);
    console.log('Database initialized successfully');
} catch (error) {
    console.error('Error executing schema:', error);
}

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// User Management Routes
app.post('/api/users', (req, res) => {
    const { username, email, password } = req.body;
    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    try {
        const result = stmt.run(username, email, password);
        res.status(201).json({ userId: result.lastInsertRowid, username, email, createdAt: new Date() });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Error creating user' });
    }
});

app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    // Here you would validate the user credentials
    // and generate a JWT token in a real application.
    res.status(200).json({ token: 'example.token.here' });
});

// Test Management Routes
app.post('/api/tests', (req, res) => {
    const { testName, testElements } = req.body;
    const stmt = db.prepare('INSERT INTO tests (testName, testElements) VALUES (?, ?)');
    try {
        const result = stmt.run(testName, JSON.stringify(testElements));
        res.status(201).json({ testId: result.lastInsertRowid, testName, createdAt: new Date() });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Error creating test' });
    }
});

app.get('/api/tests/:testId', (req, res) => {
    const { testId } = req.params;
    const stmt = db.prepare('SELECT * FROM tests WHERE testId = ?');
    const test = stmt.get(testId);
    if (test) {
        res.status(200).json(test);
    } else {
        res.status(404).json({ code: 404, message: 'Test not found' });
    }
});

// Report Management Routes
app.post('/api/reports', (req, res) => {
    const { testId, metrics, status } = req.body;
    const stmt = db.prepare('INSERT INTO reports (testId, metrics, status) VALUES (?, ?, ?)');
    try {
        const result = stmt.run(testId, JSON.stringify(metrics), status);
        res.status(201).json({ reportId: result.lastInsertRowid, executionTimestamp: new Date(), status, metrics });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Error generating report' });
    }
});

app.get('/api/reports/:testId', (req, res) => {
    const { testId } = req.params;
    const stmt = db.prepare('SELECT * FROM reports WHERE testId = ?');
    const reports = stmt.all(testId);
    if (reports.length > 0) {
        res.status(200).json({ reports });
    } else {
        res.status(404).json({ code: 404, message: 'No reports found for this test' });
    }
});

// CI/CD Integration Management Routes
app.post('/api/integrations', (req, res) => {
    const { serviceName, configuration } = req.body;
    const stmt = db.prepare('INSERT INTO integrations (serviceName, configuration) VALUES (?, ?)');
    try {
        const result = stmt.run(serviceName, JSON.stringify(configuration));
        res.status(201).json({ integrationId: result.lastInsertRowid });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Error creating CI/CD integration' });
    }
});

app.get('/api/integrations/:integrationId', (req, res) => {
    const { integrationId } = req.params;
    const stmt = db.prepare('SELECT * FROM integrations WHERE integrationId = ?');
    const integration = stmt.get(integrationId);
    if (integration) {
        res.status(200).json(integration);
    } else {
        res.status(404).json({ code: 404, message: 'Integration not found' });
    }
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});