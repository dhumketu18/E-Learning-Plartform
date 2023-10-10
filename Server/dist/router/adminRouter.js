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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../db/models");
const middleware_1 = require("../middleware");
const middleware_2 = require("../middleware");
const router = express_1.default.Router();
const middlewareRoutes = ["/courses", "/courses/:courseId"];
router.use(middlewareRoutes, (0, middleware_1.middleWare)(models_1.Admin));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield models_1.Admin.findOne({ username });
    if (user) {
        res.send("username already in use");
    }
    else {
        const newAdmin = new models_1.Admin({ username, password });
        yield newAdmin.save();
        res.status(200).send((0, middleware_2.generateAuthKey)(req.body));
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const user = yield models_1.Admin.findOne({ username });
    if (user) {
        if (user.password === password) {
            res.status(200).send({
                message: "Logged in successfully",
                token: (0, middleware_2.generateAuthKey)(req.body),
            });
        }
        else {
            res.status(401).send("Password did not match");
        }
    }
    else {
        res.status(404).send("User is not registered");
    }
}));
router.post("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const course = new models_1.Courses(Object.assign({}, req.body));
    yield course.save();
    const admin = yield models_1.Admin.findOne({ username });
    if (!admin) {
        return res.status(401).send("admin not found");
    }
    admin.createdCourses.push(course._id);
    yield admin.save();
    res
        .status(200)
        .send({ message: "Course  has been created successfully", id: course.id });
}));
router.put("/courses/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const { username } = res.locals;
    const course = yield models_1.Courses.findById(courseId);
    const admin = yield models_1.Admin.findOne({ username });
    if (!admin) {
        return res.status(401).send("admin not found");
    }
    if (!course) {
        return res.status(401).send("course not found");
    }
    if (admin.createdCourses.includes(course._id)) {
        const updatedCourse = yield models_1.Courses.findByIdAndUpdate(courseId, Object.assign(Object.assign({}, req.body), { _id: courseId }), {
            new: true,
        });
        res.status(200).send("Course updated successfully");
    }
    else {
        res.send(400);
    }
}));
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = res.locals.username;
    const admin = yield models_1.Admin.findOne({ username }).populate("createdCourses");
    if (!admin) {
        return res.status(401).send("admin not found");
    }
    const courses = admin.createdCourses || [];
    res.status(200).json({ courses });
}));
exports.default = router;
