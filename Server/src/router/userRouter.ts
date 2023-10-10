import express from "express";
import { Request, Response, NextFunction } from "express";
import { User, Courses } from "../db/models";
import { generateAuthKey, middleWare } from "../middleware";

const router = express.Router();

const userRoutes = ["/courses", "/courses/:courseId", "/purchasedCourses"];
router.use(userRoutes, middleWare(User));

router.post("/signup", async (req: Request, res: Response) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.send("username already in use");
  } else {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send(generateAuthKey(req.body));
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username });
  if (user) {
    if (user.password === password) {
      const { username, password } = req.headers as {
        username: string;
        password: string;
      };
      res.status(200).send({
        message: "Logged in successfully",
        token: generateAuthKey({ username, password }),
      });
    } else {
      res.status(401).send("Password did not match");
    }
  } else {
    res.status(404).send("User is not registered");
  }
});

router.get("/courses", async (req: Request, res: Response) => {
  const courses = await Courses.find({});
  res.status(200).send(courses);
});

router.post("/courses/:courseId", async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const { username } = req.params;
  const course = await Courses.findById(courseId);

  if (!course) {
    res.status(400).send("course is not available");
    return;
  }
  const user = await User.findOne({ username });
  if (user?.purchasedCourses?.includes(course._id)) {
    res.status(200).send("course already purchased");
  }
  user?.purchasedCourses?.push(course._id);
  await user?.save();
  res.status(200).send("Course Purchased Successfully");
});

router.get("/purchasedCourses", async (req: Request, res: Response) => {
  const { username } = res.locals.username;
  const user = await User.findOne({ username }).populate("purchasedCourses");
  const courses = user?.purchasedCourses || [];
  res.status(200).send(courses);
});

export default router;
