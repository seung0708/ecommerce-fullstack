function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated
    }
    res.status(401).json({ message: "Please log in to access this resource." });
}

function isSeller(req, res, next) {
    if (req.user && req.user.role === 'seller') {
        return next(); // User is a seller
    }
    res.status(403).json({ message: "Access denied. Sellers only." });
}

module.exports = {
    isAuthenticated,
    isSeller
};