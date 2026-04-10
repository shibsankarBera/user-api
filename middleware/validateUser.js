const validateUser = (req, res, next) => {
    const { id, firstName, lastName, hobby } = req.body;

    if (!id || !firstName || !lastName || !hobby) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    next();
};

module.exports = validateUser;