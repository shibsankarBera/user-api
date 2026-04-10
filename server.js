const express = require("express");
const users = require("./data/users");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("User API is running");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
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