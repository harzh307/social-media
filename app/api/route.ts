import express, { Request } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then((mon) => {
    console.log("connected");
    NextResponse.json({ message: "connected" });
    return mon;
  })
  .catch((err) => {
    console.log("Failed");
    return NextResponse.json(err);
  });
export const GET = (req: NextRequest, res: NextResponse, next) => {
  return NextResponse.json({ message: "hello" });
};
