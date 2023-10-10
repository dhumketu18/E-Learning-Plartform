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
const router = express_1.default.Router();
const userRoutes = ["/courses", "/courses/:courseId", "/purchasedCourses"];
router.use(userRoutes, (0, middleware_1.middleWare)(models_1.User));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield models_1.User.findOne({ username });
    if (user) {
        res.send("username already in use");
    }
    else {
        const newUser = new models_1.User(req.body);
        yield newUser.save();
        res.status(200).send((0, middleware_1.generateAuthKey)(req.body));
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const user = yield models_1.User.findOne({ username });
    if (user) {
        if (user.password === password) {
            const { username, password } = req.headers;
            res.status(200).send({
                message: "Logged in successfully",
                token: (0, middleware_1.generateAuthKey)({ username, password }),
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
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield models_1.Courses.find({});
    res.status(200).send(courses);
}));
router.post("/courses/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const courseId = req.params.courseId;
    const { username } = req.params;
    const course = yield models_1.Courses.findById(courseId);
    if (!course) {
        res.status(400).send("course is not available");
        return;
    }
    const user = yield models_1.User.findOne({ username });
    if ((_a = user === null || user === void 0 ? void 0 : user.purchasedCourses) === null || _a === void 0 ? void 0 : _a.includes(course._id)) {
        res.status(200).send("course already purchased");
    }
    (_b = user === null || user === void 0 ? void 0 : user.purchasedCourses) === null || _b === void 0 ? void 0 : _b.push(course._id);
    yield (user === null || user === void 0 ? void 0 : user.save());
    res.status(200).send("Course Purchased Successfully");
}));
router.get("/purchasedCourses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals.username;
    const user = yield models_1.User.findOne({ username }).populate("purchasedCourses");
    const courses = (user === null || user === void 0 ? void 0 : user.purchasedCourses) || [];
    res.status(200).send(courses);
}));
exports.default = router;
