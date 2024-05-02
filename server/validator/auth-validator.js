const {z} = require("zod")
 

const loginSchema = z.object({
    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Please enter a valid Email Address"})
    .min(3,{message:" email Must be of 10 chars"})
    .max(225,{message:" email Must be of 225 chars"}),

    password: z
    .string({required_error:"password is required"})
    .min(8,{message:" password Must be of 8 chars"})
    .max(225,{message:" password Must be of 225 chars"}),
})
const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:" Name Must be of 3 chars"})
    .max(225,{message:" Name Must be of 225 chars"}),



    phone: z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:" phone Must be of 10 chars"})
    .max(20,{message:" phone Must be of 225 chars"}),



});
module.exports= {signupSchema,loginSchema};
