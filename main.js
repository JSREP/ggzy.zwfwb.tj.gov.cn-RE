const CryptoJS = require("crypto-js")

/**
 * 获取真实的URL
 *
 * @param fakeURL {string} 加的被编码的URL
 * @return {string | null} 对应的真实的URL
 */
function getRealURL(fakeURL) {
    if (typeof (fakeURL) === "undefined" || fakeURL === "#") {
        return null;
    }
    const fakeURLSplit = fakeURL.split("/");
    const fakeURLNameSuffixSplit = fakeURLSplit[fakeURLSplit.length - 1].split('.');
    const fakeURLName = fakeURLNameSuffixSplit[0];
    const fakeURLSuffix = fakeURLNameSuffixSplit[1];
    if (!/^\+?[1-9][0-9]*$/.test(fakeURLName) || fakeURLSuffix.indexOf("jhtml") === -1) {
        return null;
    }
    const contentUTF8 = CryptoJS.enc.Utf8.parse(fakeURLName);
    // 这个key是固定的写死的
    const key = "qnbyzzwmdgghmcnm";
    const keyUTF8 = CryptoJS.enc.Utf8.parse(key);
    const encryptResultUTF8 = CryptoJS.AES.encrypt(contentUTF8, keyUTF8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    let encryptResultString = encryptResultUTF8.toString();
    encryptResultString = encryptResultString.replace(/\//g, "^");
    encryptResultString = encryptResultString.substring(0, encryptResultString.length - 2);
    fakeURLSplit[fakeURLSplit.length - 1] = encryptResultString + '.' + fakeURLSuffix;
    let realURL = "";
    for (let i = 0; i < fakeURLSplit.length; i++) {
        realURL += fakeURLSplit[i] + '/'
    }
    realURL = realURL.substring(0, realURL.length - 1);
    return realURL;
}

// const fakeURL = "http://ggzy.zwfwb.tj.gov.cn:80/jyxxzbjb/1002258.jhtml";
const fakeURL = "http://ggzy.zwfwb.tj.gov.cn:80/jyxxzbjb/1002191.jhtml";
console.log(getRealURL(fakeURL));
// Output:
// http://ggzy.zwfwb.tj.gov.cn:80/jyxxzbjb/^wlArcqzjP6SECiVa^XSmQ.jhtml






