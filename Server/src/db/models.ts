import mongoose, { ObjectId, Schema, Types } from "mongoose";
interface userType {
  username: string;
  password: string;
  purchasedCourses?: Types.ObjectId[];
}

const userSchema = new Schema<userType>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});

interface adminType {
  username: string;
  password: string;
  createdCourses: Types.ObjectId[];
}
const adminSchema = new Schema<adminType>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});

interface courseType {
  title: String;
  description: String;
  price: Number;
  imageLink: String;
  published: Boolean;
}

const courseSchema = new Schema<courseType>({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const Courses = mongoose.model("Courses", courseSchema);
export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
