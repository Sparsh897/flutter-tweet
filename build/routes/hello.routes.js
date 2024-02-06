"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helloRouter = (0, express_1.Router)();
// Define the routes paths
helloRouter.get("/", (req, res) => {
    res.json({ data: "Server is live" });
});
exports.default = helloRouter;
