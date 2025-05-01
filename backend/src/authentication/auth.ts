import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userSchema } from "../zod/type";
import express, {Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router:Router = express.Router();

const saltRounds = 10;

router.post("/signup", async (req: Request, res: Response):Promise<any> => {
  try {
    console.log("I am here")
    const { email, password } = req.body;

    // Validate with Zod
    const parsedUser = userSchema.parse({ email, password });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedUser.email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(parsedUser.password, saltRounds);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: parsedUser.email,
        password: hashedPassword,
      },
    });

    // Create JWT
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    return res.status(201).json({
      message: "Signup successful",
      user: { id: newUser.id, email: newUser.email },
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Signup Error:", error.message);
    } else {
      console.error("Signup Unknown Error:", error);
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signin", async (req: Request, res: Response):Promise<any> => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

    // Validate with Zod
    const parsedUser = userSchema.parse({ email, password });

    // Find user
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedUser.email },
    });

    console.log(existingUser)
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      parsedUser.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Signin successful",
      user: { id: existingUser.id, email: existingUser.email },
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Signin Error:", error.message);
    } else {
      console.error("Signin Unknown Error:", error);
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
