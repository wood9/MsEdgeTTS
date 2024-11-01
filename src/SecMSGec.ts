import crypto from "crypto";

export function generateSecMSGec() {
  const randomBytes = crypto.randomBytes(32);
  return randomBytes.toString("hex");
}

export function generateSecMSGec2(size = 64) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")
    .toUpperCase();
}

export function generateSecMSGecParam() {
  return "";

  const version = "1-114.0.1823.67";
  const gec = generateSecMSGec2().toUpperCase();
  return `&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=${version}`;
}
