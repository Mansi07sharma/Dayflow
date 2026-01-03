import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "Sample_Secret_Key_Change_In_Production";

export function authorize(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
