import { Request, Response } from "express"; // Import Response from express

const asyncHandler = require("express-async-handler");
import {
  getUserRepo,
  createUserRepo,
  deleteUserRepo,
  updateUserRepo,
} from "../repositories/user.repository";

import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    try {
      const user = await getUserRepo(userId);
      if (user) {
        res.status(200).json({ data: user });
      } else {
        res.status(500).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }
);

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const user: IUserInterface = req.body;

    try {
      const succes = await createUserRepo(user);
      if (succes) {
        res.status(200).json({ data: user });
      } else {
        res.status(500).json({ error: "User not created" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export const  updateUserController = asyncHandler(
    async (req: Request, res: Response) => {
      const updatedUser: IUserInterface = req.body;
  
      try {
        const succes = await updateUserRepo(updatedUser.uid,updatedUser);
        if (succes) {
          res.status(200).json({ data: "user updated"  });
        } else {
          res.status(500).json({ error: "User not Updated" });
        }
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  );

  export const deleteUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.params.userId as string;
      try {
        
          const success = await deleteUserRepo(userId);
          if (success) {
            res.status(200).json({ data: "User Deleted" });
          } else {
            res.status(500).json({ error: "User not deleted" });
          }
       
      } catch (error) {
        res.status(500).json({ error: error});
      }
    }
  );