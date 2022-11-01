import {Operator} from "../type";

export const isToken = (token: any): token is Operator => {
    return Object.values(Operator).includes(token);
}
export class ParseTokenError extends Error {
}
export default {
    isToken,
    ParseTokenError
}
