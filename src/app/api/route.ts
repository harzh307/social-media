import express, { Request } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";

const app = express();

app.use(express.json());

export const GET = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ message: "hello" });
};
