import CryptoJS from "crypto-js";

// For now ive hardcoded the key.

const SECRET_KEY = "my-super-secret-key";

export function encryptNote(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decryptNote(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}