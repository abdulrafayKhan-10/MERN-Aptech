const mongoose = require("mongoose");

const getHome = (req, res) => {
    res.send("getHome function is working");
};

module.exports = {
    getHome
};