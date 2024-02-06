"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserController = void 0;
const asyncHandler = require("express-async-handler");
const user_repository_1 = require("../repositories/user.repository");
exports.getUserController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield (0, user_repository_1.getUserRepo)(userId);
        if (user) {
            res.status(200).json({ data: user });
        }
        else {
            res.status(500).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.createUserController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const succes = yield (0, user_repository_1.createUserRepo)(user);
        if (succes) {
            res.status(200).json({ data: user });
        }
        else {
            res.status(500).json({ error: "User not created" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.updateUserController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = req.body;
    try {
        const succes = yield (0, user_repository_1.updateUserRepo)(updatedUser.uid, updatedUser);
        if (succes) {
            res.status(200).json({ data: "user updated" });
        }
        else {
            res.status(500).json({ error: "User not Updated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.deleteUserController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const success = yield (0, user_repository_1.deleteUserRepo)(userId);
        if (success) {
            res.status(200).json({ data: "User Deleted" });
        }
        else {
            res.status(500).json({ error: "User not deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
