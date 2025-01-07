import { NextFunction, Request, response, Response } from "express";
import { prisma } from "..";
import { hashSync,compareSync } from 'bcrypt';
import  * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/exceptions";

export const signUp = async (req:Request, res:Response,next: NextFunction) => {
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