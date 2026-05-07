import crypto from "crypto"

export default function generateOTP()
{
    return crypto.randomInt(1000000, 9999999)
}

