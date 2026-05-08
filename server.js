const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to handle JSON data and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple "Database" array
let devices = [
    { id: 1, name: "Main Rig", type: "Desktop", os: "Windows 11", ip: "192.168.1.15" }
];

// --- HTML Routes ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/inventory', (req, res) => res.sendFile(path.join(__dirname, 'views/inventory.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));

// --- API Routes (Requirement: 3 Routes) ---

// 1. GET: Retrieve all devices
app.get('/api/devices', (req, res) => {
    res.json(devices);
});

// 2. POST: Add a new device (Requirement: Submit form data)
app.post('/api/devices', (req, res) => {
    const newDevice = {
        id: devices.length + 1,
        ...req.body
    };
    devices.push(newDevice);
    // Requirement: Redirect user after submission
    res.status(201).json({ message: "Success", redirect: "/inventory" });
});

// 3. GET: System Status
app.get('/api/status', (req, res) => {
    res.json({ online: true, count: devices.length, serverTime: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});