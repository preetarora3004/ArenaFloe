import z from 'zod';

export const userSchema = z.object({
    username : z.string().lowercase().max(12),
    password : z.string().max(8),
    role : z.enum(["user", "admin", "vendor", "security"]).optional()
})

export const merchandiseSchema = z.object({
    name : z.string(),
    stock : z.number(),
    price : z.number(),
    description : z.string()
})
