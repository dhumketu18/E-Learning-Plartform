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
exports.middleWare = exports.secretKey = exports.generateAuthKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAuthKey = (user) => {
    return jsonwebtoken_1.default.sign(user, exports.secretKey, { expiresIn: "1h" });
};
exports.generateAuthKey = generateAuthKey;
exports.secretKey = "SECRET_KEY";
const middleWare = (Model) => (req, res, next) => {
    var _a;
    const authorization = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!authorization) {
        return res.status(401).send("unauthorized");
    }
    jsonwebtoken_1.default.verify(authorization, exports.secretKey, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.send(err);
        }
        else {
            const { username, password } = user;
            const obj = yield Model.findOne({ username, password });
            if (obj) {
                res.locals = Object.assign(Object.assign({}, res.locals), { username });
                next();
            }
            else {
                res.status(400).send("Invalid Access");
            }
        }
    }));
};
exports.middleWare = middleWare;
