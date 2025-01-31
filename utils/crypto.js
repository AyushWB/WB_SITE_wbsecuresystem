import crypto from "crypto";
const SECURE_KEY = process.env.SECURE_KEY;

export function encrypt(value) {
  const password = SECURE_KEY;
  const iv = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, iv, 100000, 32, "sha256");
  const algorithm = "aes-256-cbc";
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${encrypted}-${iv.toString("hex")}`;
}

export function decrypt(encryptedString) {
  const password = SECURE_KEY;
  const [encrypted, ivHex] = encryptedString.split("-");
  const iv = Buffer.from(ivHex, "hex");
  const key = crypto.pbkdf2Sync(password, iv, 100000, 32, "sha256");
  const algorithm = "aes-256-cbc";
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
