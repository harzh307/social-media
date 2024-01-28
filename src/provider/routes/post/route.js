// routes/postRoutes.js

import express from "express";
import { createPost, getPosts } from "../../controllers/postController";

const router = express.Router();

// Define the route for creating a new post
router.get("/posts", getPosts);
router.post("/posts", createPost);

// export default router;
