import { Request } from "express";
export type Token = {
    uid: number,
    iat: number,
    exp: number,
}

export interface myRequest extends Request {
    uid?: number
}