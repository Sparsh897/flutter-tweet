import { Request, Response } from "express"; // Import Response from express

const asyncHandler = require("express-async-handler");
import {
  getTweetRepo,
  createTweetRepo,
  deleteTweetRepo,
  updateTweetRepo,
} from "../repositories/tweet.repository";

import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { updateUserWithTweetIdRepo } from "../repositories/user.repository";

export const getTweetController = asyncHandler(
  async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;

    try {
      const tweet = await getTweetRepo(tweetId);
      if (tweet) {
        res.status(200).json({ data: tweet });
      } else {
        res.status(500).json({ error: "Tweet not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export const createTweetController = asyncHandler(
  async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;

    try {
      const success = await createTweetRepo(tweet);
      if (success) {
        const userUpdateSuccess = await updateUserWithTweetIdRepo(tweet.adminId,tweet.tweetId);
        if(userUpdateSuccess){
          res.status(200).json({ data: tweet });
        }else{
          res.status(500).json({ error: "User not updated" });
        }
        
      } else {
        res.status(500).json({ error: "Tweet not created" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export const updateTweetController = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;

    try {
      const succes = await updateTweetRepo(updatedTweet.tweetId, updatedTweet);
      if (succes) {
        res.status(200).json({ data: "Tweet Updated" });
      } else {
        res.status(500).json({ error: "Tweet not Updated" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export const deleteTweetController = asyncHandler(
  async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    console.log(tweetId)
    try {
      const success = await deleteTweetRepo(tweetId);
    
      if (success) {
        res.status(200).json({ data: "Tweet Deleted" });
      } else {
        res.status(500).json({ error: "Tweet not deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

