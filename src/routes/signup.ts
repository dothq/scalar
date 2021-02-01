import express from "express";
import { PrismaClient } from "@prisma/client"
import argon from 'argon2';

const prisma = new PrismaClient();
const router = express.Router();

const isValidArgon = async (argonStr: string) => {
    let hash;

    try {
        hash = await argon.verify(argonStr, "");
        if(typeof(hash) !== "undefined" && argonStr.startsWith("$argon2")) return true;
    } catch {
        return false;
    }
}

router.post("/id/accounts/signup", async (req, res) => {
    const { email, password, name } = req.body

    if(!await isValidArgon(password)) return res.json({ ok: false, error: "INVALID_ARGON_HASH" })

    await prisma.user.create({
        data: {
            email,
            password,
            name
        },
    })
  
    res.json({ ok: true })
})

export default router;