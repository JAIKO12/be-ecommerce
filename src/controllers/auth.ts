import { NextFunction, Request, response, Response } from "express";
import { prisma } from "..";
import { hashSync,compareSync } from 'bcrypt';
import  * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/exceptions";
import { UnprocessableEntityException } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

export const signUp = async (req:Request, res:Response,next: NextFunction) => {

  try {
    SignUpSchema.parse(req.body);
    const {email, password, name} = req.body;

    const user = await prisma.user.findFirst({where: {email}});
    
    if (user) {
      next (new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS));
    } 
    const response = await prisma.user.create({
      data:{
          email,
          password:hashSync(password, 10),
          name
      }
    })
    res.status(200).json({
      message:'Succsecfully created user',
      data:response
    })
  } catch (err:any) {
    const issues = err?.issues
    console.log(issues);
    next(new UnprocessableEntityException(issues, 'Unprocessabe entity',ErrorCode.UNPORCESSABLE_ENTITY ))
  }
};
export const login = async (req:Request, res:Response) => {
  const {email, password} = req.body;

  const user = await prisma.user.findFirst({where: {email}});
  
  if (!user) {
    throw new BadRequestException('User Not Found', ErrorCode.USER_NOT_FOUND)
  }
  if (!compareSync(password, user.password)) {
    throw new Error('Invalid password');
  }
  const token =  jwt.sign({
    userId:user.id,
  }, JWT_SECRET)

  res.status(200).json({
    message:'Succsecfully login user',
    data: token
  })
};