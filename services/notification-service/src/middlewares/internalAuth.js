import crypto from "node:crypto";

const internalAuth = (req, res, next) => {
  const providedKey = req.get("x-internal-api-key");
  const expectedKey = process.env.INTERNAL_API_KEY;

  if (!providedKey || !expectedKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized internal request.",
    });
  }

  const providedBuffer = Buffer.from(providedKey);
  const expectedBuffer = Buffer.from(expectedKey);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized internal request.",
    });
  }

  next();
};

export default internalAuth;
