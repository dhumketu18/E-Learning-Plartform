import express from "express";
import { Admin, Courses } from "../db/models";
import { middleWare } from "../middleware";
import { Request, Response, NextFunction } from "express";
import { generateAuthKey } from "../middleware";

const router = express.Router();
const middlewareRoutes = ["/courses", "/courses/:courseId"];
router.use(middlewareRoutes, middleWare(Admin));

router.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (user) {
    res.status(404).send("username already in use");
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(200).send(generateAuthKey(req.body));
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.headers;
  const user = await Admin.findOne({ username });
  if (user) {
    if (user.password === password) {
      res.status(200).send({
        message: "Logged in successfully",
        token: generateAuthKey(req.body),
      });
    } else {
      res.status(401).send("Password did not match");
    }
  } else {
    res.status(404).send("User is not registered");
  }
});

router.post("/courses", async (req: Request, res: Response) => {
  const { username } = res.locals;
  const course = new Courses({ ...req.body });
  await course.save();
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).send("admin not found");
  }
  admin.createdCourses.push(course._id);
  await admin.save();
  res
    .status(200)
    .send({ message: "Course  has been created successfully", id: course.id });
});

router.put("/courses/:courseId", async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const { username } = res.locals;
  const course = await Courses.findById(courseId);
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).send("admin not found");
  }
  if (!course) {
    return res.status(401).send("course not found");
  }
  if (admin.createdCourses.includes(course._id)) {
    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      { ...req.body, _id: courseId },
      {
        new: true,
      }
    );
    res.status(200).send("Course updated successfully");
  } else {
    res.send(400);
  }
});

router.get("/courses", async (req: Request, res: Response) => {
  const username = res.locals.username;
  const admin = await Admin.findOne({ username }).populate("createdCourses");
  if (!admin) {
    return res.status(401).send("admin not found");
  }
  const courses = admin.createdCourses || [];
  res.status(200).json({ courses });
});

export default router;
