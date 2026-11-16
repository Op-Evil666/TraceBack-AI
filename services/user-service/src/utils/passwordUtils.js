import argon from "argon2";

const hashPassword = async(password) =>{
    const hashedPassword = await argon.hash(password, { 
        type: argon.argon2id,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1
    });
    return hashedPassword;
}

const verifyPassword = async(password, hashedPassword) =>{
    const isMatch = await argon.verify(hashedPassword, password);
    return isMatch;
}

export { hashPassword, verifyPassword };