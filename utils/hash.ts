import * as Crypto from "expo-crypto";

export const hashPassword = async (password: string, username: string) => {
  const salt = (await Crypto.getRandomBytesAsync(8)).join() + username;
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt
  );
  return digest + "." + salt;
};

export const verifyPassword = async (password: string, hash: string) => {
  const [digest, salt] = hash.split(".");
  const newDigest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt
  );
  return digest === newDigest;
};
