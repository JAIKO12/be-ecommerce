import { Request, response, Response } from "express";
import { prisma } from "..";
import { hashSync,compareSync } from 'bcrypt';
import  * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";

export const signUp = async (req:Request, res:Response) => {
  const {email, password, name} = req.body;

  const user = await prisma.user.findFirst({where: {email}});
  
  if (user) {
    throw new Error('User already exists');
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
    throw new Error('User does not exist');
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