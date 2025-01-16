import { HttpExpection } from "./exceptions";

export class UnprocessableEntityException extends HttpExpection {
    constructor(error:any, message:string, errorCode:number) {
        super(message,errorCode,422,error)
    }
}