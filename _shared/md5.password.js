var CryptoJS = require('crypto-js');

exports.strToMd05 = (password) => {
    var hash = CryptoJS.HmacSHA256(password, "secretkey");
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
}

exports.Md05ToStr = (encodedPassword) => {
    let decrypted = CryptoJS.AES.decrypt(encodedPassword, "secretkey");
    return decryptedData;
}