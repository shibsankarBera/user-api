const express = require("express");
const users = require("./data/users");
const app = express();


// Import middleware
const logger = require("./middleware/logger");
const validateUser = require("./middleware/validateUser");


// Built-in middleware to parse JSON
app.use(express.json());
// Custom middleware: Logger
app.use(logger);

app.get("/", (req, res) => {
    res.send("User API is running");
});




// GET all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

/////post routes CREATE USER
app.post("/user",validateUser, (req, res) => {
    const newUser = req.body;

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});

///UPDATE USERS
app.put("/user/:id", validateUser,(req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = { ...users[index], ...req.body };

    res.status(200).json({
        message: "User updated",
        user: users[index]
    });
});

////DELETE USERS
app.delete("/user/:id", (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deleted = users.splice(index, 1);

    res.status(200).json({
        message: "User deleted",
        user: deleted[0]
    });
});

 // Global error handler
 
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        message: "Internal Server Error"
    });
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
