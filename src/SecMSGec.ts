import { createHash } from "node:crypto";
const WINDOWS_FILE_TIME_EPOCH = 11644473600n;

export function generateSecMsGecToken(token: string): string {
  const ticks =
    BigInt(Math.floor(Date.now() / 1000) + Number(WINDOWS_FILE_TIME_EPOCH)) *
    10000000n;
  const roundedTicks = ticks - (ticks % 3000000000n);
  const strToHash = `${roundedTicks}${token}`;
  const hash = createHash("sha256");
  hash.update(strToHash, "ascii");
  return hash.digest("hex").toUpperCase();
}

export function generateSecMSGecParam(token: string) {
  const version = "1-130.0.2849.68";
  const gec = generateSecMsGecToken(token);
  return `&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=${version}`;
}
