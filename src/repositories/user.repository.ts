import mongoose, { model } from "mongoose";
import Usermodel from "../database/models/user.model";

import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserRepo = async (
  userId: string
): Promise<IUserInterface | null> => {
  try {
    const user = await Usermodel.findOne({ uid: userId });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUserRepo = async (userId: string): Promise<boolean> => {
  try {
    const deleted = await Usermodel.findOneAndDelete({ uid: userId });
    if (deleted) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createUserRepo = async (
  user: IUserInterface
): Promise<boolean> => {
  try {
    await Usermodel.create(user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUserRepo = async (
  userId: string,
  updatedUser: IUserInterface
): Promise<boolean> => {
  try {
    const result = await Usermodel.findOneAndUpdate(
      { uid: userId },
      updatedUser,
      { new: true }
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const updateUserWithTweetIdRepo= async(
  userId:string,
  tweetId:string,
):Promise<boolean> => {
  try{
const result=await Usermodel.findOneAndUpdate(
  {uid:userId},
  {$push:{tweets:tweetId}}
);
if(result){
  return true;
}else{
  return false;
}
  }catch(error){
    console.log(error);
    return false;
  }
}
export const deleteUserWithTweetIdRepo= async(
  userId:string,
  tweetId:string,
):Promise<boolean> => {
  try{
const result=await Usermodel.findOneAndUpdate(
  {uid:userId},
  {$pull:{tweets:tweetId}}
);
if(result){
  return true;
}else{
  return false;
}
  }catch(error){
    console.log(error);
    return false;
  }
}