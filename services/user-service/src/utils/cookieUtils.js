const setRefreshTokenCookie = (res, token) =>{
    return res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

const clearRefreshTokenCookie = (res) =>{
    return res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });
}

export { setRefreshTokenCookie, clearRefreshTokenCookie };