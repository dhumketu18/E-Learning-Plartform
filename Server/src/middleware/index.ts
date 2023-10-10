import jwtToken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";

export const generateAuthKey = (user: {
  username: string;
  password: string;
}) => {
  return jwtToken.sign(user, secretKey, { expiresIn: "1h" });
};

export const secretKey = "SECRET_KEY";

export const middleWare =
  <T>(Model: Model<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined =
      req.headers.authorization?.split(" ")[1];
    if (!authorization) {
      return res.status(401).send("unauthorized");
    }
    jwtToken.verify(authorization, secretKey, async (err, user) => {
      if (err) {
        return res.send(err);
      } else {
        const { username, password } = user as {
          username: string;
          password: string;
        };
        const obj = await Model.findOne({ username, password });
        if (obj) {
          res.locals = { ...res.locals, username };
          next();
        } else {
          res.status(400).send("Invalid Access");
        }
      }
    });
  };
