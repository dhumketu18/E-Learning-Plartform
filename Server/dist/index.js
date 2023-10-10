"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const adminRouter_1 = __importDefault(require("./router/adminRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect("mongodb+srv://mayank:123@cluster0.cunevg1.mongodb.net/courses", {
    dbName: "courses",
});
app.use("/user", userRouter_1.default);
app.use("/admin", adminRouter_1.default);
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
