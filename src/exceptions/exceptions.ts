export class HttpExpection extends Error {
    message: string;
    errorCode: any;
    statusCode:number;
    errors:ErrorCode

    constructor(messsage:string, errorCode:ErrorCode, statusCode:number, errors:any){
        super(messsage);
        this.message = messsage;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors
       
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORECT_PASSWORD = 1003
}