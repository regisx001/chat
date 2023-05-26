import { z } from "zod"


export const registerSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(6, {
            message: "password must contain at least 8 characters"
        }),
    passwordConfirm: z
        .string()
        .min(8, {
            message: "password must contain at least 8 characters"
        }),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, {
            message: "password must contain at least 8 characters"
        }),
})