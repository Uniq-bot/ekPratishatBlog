import jwt from "jsonwebtoken";


interface TokenPayload {
    id: string;
}

export const generateToken=(payload:TokenPayload)=>{
    const token= jwt.sign({
        userId:payload.id
    }, process.env.JWT_SECRET!, { expiresIn: '30d' })
    return token;
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Token verification error:", e);
        }
        return null;
    }
};