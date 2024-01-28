import express from "express";
import { getAllUsers } from "../../controllers/userController";
import { login, signUp } from "../../controllers/userAuth";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/sign-up", signUp);
router.post("/login", login);

// export default router;
