import { ErrorCode, HttpExpection } from "./exceptions";

export class BadRequestException extends HttpExpection {
    constructor(message:string, errorCode:ErrorCode) {
        super(message, errorCode, 400, null);
    }
}