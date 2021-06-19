import CryptoJS from 'crypto-js';
const passphrase = process.env.HASH_SECRET;

export const encryptWithAES = (password) => {
	return CryptoJS.AES.encrypt(password, passphrase).toString();
};

export const decryptWithAES = (ciphertext) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
};