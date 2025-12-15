// User inputs a long url
// The long URL is mapped to a short code
// The short code is stored in a databse with the original URL
// When user visits the short URL, the service retrieves the corresponding long URL from the db and redirects the use


function shortlink(linkID) {
    //base 10 to base 62
    const base62 = {
        0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9',
        10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F', 16: 'G', 17: 'H', 18: 'I', 19: 'J',
        20: 'K', 21: 'L', 22: 'M', 23: 'N', 24: 'O', 25: 'P', 26: 'Q', 27: 'R', 28: 'S', 29: 'T',
        30: 'U', 31: 'V', 32: 'W', 33: 'X', 34: 'Y', 35: 'Z',
        36: 'a', 37: 'b', 38: 'c', 39: 'd', 40: 'e', 41: 'f', 42: 'g', 43: 'h', 44: 'i', 45: 'j',
        46: 'k', 47: 'l', 48: 'm', 49: 'n', 50: 'o', 51: 'p', 52: 'q', 53: 'r', 54: 's', 55: 't',
        56: 'u', 57: 'v', 58: 'w', 59: 'x', 60: 'y', 61: 'z'
    };

    const divmod = (x, y) => [Math.floor(x / y), x % y];

    let result = "";

    let q = linkID;

    if (q === 0) return base62[0];

    while (q != 0) {
        let tmp = divmod(q, 62);
        result = base62[tmp[1]] + result;
        q = tmp[0];
    }
    return result;
}

function unshortlink(shortlink) {

    const base62reverse = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19,
        'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29,
        'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35,
        'a': 36, 'b': 37, 'c': 38, 'd': 39, 'e': 40, 'f': 41, 'g': 42, 'h': 43, 'i': 44, 'j': 45,
        'k': 46, 'l': 47, 'm': 48, 'n': 49, 'o': 50, 'p': 51, 'q': 52, 'r': 53, 's': 54, 't': 55,
        'u': 56, 'v': 57, 'w': 58, 'x': 59, 'y': 60, 'z': 61
    };

    let result = 0;
    for (let j = 0; j < shortlink.length; j++) {
        let char = shortlink[j];
        let val = base62reverse[char];
        result = result * 62 + val;
    }

    return result
}

module.exports = { shortlink, unshortlink };



