import { ReqHandler } from "../src";

export const get: ReqHandler = ({ res }) => {
    res.json({ message: "Hello, world!" });
};