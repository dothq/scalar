import express from "express";
import { PrismaClient } from "@prisma/client"
import argon from 'argon2';

const prisma = new PrismaClient();
const router = express.Router();

router.post("/api/identity/accounts/signup", async (req, res) => {
    const { email, password, name } = req.body

    await prisma.users.create({
        data: {
            email,
            password,
            name
        },
    })  
    res.json({ ok: true })
})

export default router;