export default function storeRefreshToken(token, res) {
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/token/refresh",
    });
}
