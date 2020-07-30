function utf8_encode(string: string) {
  return unescape(encodeURIComponent(string))
}

function rotateLeft(lValue: number, iShiftBits: number) {
  return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
}

function addUnsigned(lX: number, lY: number) {
  const lX8 = lX & 0x80000000
  const lY8 = lY & 0x80000000
  const lX4 = lX & 0x40000000
  const lY4 = lY & 0x40000000
  const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)

  if (lX4 & lY4) {
    return lResult ^ 0x80000000 ^ lX8 ^ lY8
  }
  if (lX4 | lY4) {
    if (lResult & 0x40000000) {
      return lResult ^ 0xc0000000 ^ lX8 ^ lY8
    } else {
      return lResult ^ 0x40000000 ^ lX8 ^ lY8
    }
  } else {
    return lResult ^ lX8 ^ lY8
  }
}

const _F = (x: number, y: number, z: number) => {
  return (x & y) | (~x & z)
}
const _G = (x: number, y: number, z: number) => {
  return (x & z) | (y & ~z)
}
const _H = (x: number, y: number, z: number) => {
  return x ^ y ^ z
}
const _I = (x: number, y: number, z: number) => {
  return y ^ (x | ~z)
}

const _FF = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  ac: number
) => {
  a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac))
  return addUnsigned(rotateLeft(a, s), b)
}

const _GG = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  ac: number
) => {
  a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac))
  return addUnsigned(rotateLeft(a, s), b)
}

const _HH = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  ac: number
) => {
  a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac))
  return addUnsigned(rotateLeft(a, s), b)
}

const _II = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  ac: number
) => {
  a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac))
  return addUnsigned(rotateLeft(a, s), b)
}

const convertToWordArray = (str: string) => {
  let lWordCount: number
  const lMessageLength = str.length
  const lNumberOfWords_temp1 = lMessageLength + 8
  const lNumberOfWords_temp2 =
    (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
  const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
  const lWordArray: number[] = new Array(lNumberOfWords - 1)
  let lBytePosition = 0
  let lByteCount = 0
  while (lByteCount < lMessageLength) {
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] =
      lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition)
    lByteCount++
  }
  lWordCount = (lByteCount - (lByteCount % 4)) / 4
  lBytePosition = (lByteCount % 4) * 8
  lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
  lWordArray[lNumberOfWords - 2] = lMessageLength << 3
  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
  return lWordArray
}

const wordToHex = (lValue: number) => {
  let wordToHexValue = ''
  let wordToHexValue_temp = ''
  let lByte: number
  for (let lCount = 0; lCount <= 3; lCount++) {
    lByte = (lValue >>> (lCount * 8)) & 255
    wordToHexValue_temp = '0' + lByte.toString(16)
    wordToHexValue =
      wordToHexValue +
      wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2)
  }
  return wordToHexValue
}

function md5(str: string) {
  var xl

  const S11 = 7
  const S12 = 12
  const S13 = 17
  const S14 = 22
  const S21 = 5
  const S22 = 9
  const S23 = 14
  const S24 = 20
  const S31 = 4
  const S32 = 11
  const S33 = 16
  const S34 = 23
  const S41 = 6
  const S42 = 10
  const S43 = 15
  const S44 = 21

  str = utf8_encode(str)
  const x = convertToWordArray(str)
  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476

  let AA: number
  let BB: number
  let CC: number
  let DD: number

  xl = x.length
  for (let k = 0; k < xl; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = _FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
    d = _FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070db)
    b = _FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
    a = _FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
    c = _FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
    b = _FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
    c = _FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
    d = _FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
    c = _FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
    a = _GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
    d = _GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
    b = _GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
    a = _GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = _GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
    b = _GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
    d = _GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
    c = _GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
    a = _GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
    d = _GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
    a = _HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
    b = _HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
    a = _HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
    c = _HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
    b = _HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
    d = _HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
    c = _HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
    a = _HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
    d = _HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
    b = _HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
    a = _II(a, b, c, d, x[k + 0], S41, 0xf4292244)
    d = _II(d, a, b, c, x[k + 7], S42, 0x432aff97)
    c = _II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
    b = _II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
    a = _II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
    d = _II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
    c = _II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
    a = _II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
    d = _II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
    c = _II(c, d, a, b, x[k + 6], S43, 0xa3014314)
    b = _II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
    a = _II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
    d = _II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
    c = _II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
    b = _II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
    a = addUnsigned(a, AA)
    b = addUnsigned(b, BB)
    c = addUnsigned(c, CC)
    d = addUnsigned(d, DD)
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)

  return temp.toLowerCase()
}

function convert(src: string, alphabet: string) {
  const sourceBase = 16
  const destBase = alphabet.length

  let val = 0
  let mlt = 1

  for (let i = 0; i < src.length; i++) {
    val += mlt * parseInt(src[i], 16)
    mlt *= sourceBase
  }

  let wet = val
  let result = ''
  let i = 1
  let digitVal = wet % destBase
  while (wet >= destBase) {
    digitVal = wet % destBase
    if (digitVal === 0) {
      digitVal = (i * 10) % destBase
      i += 1
    }
    const digit = alphabet[Math.floor(digitVal)]
    result = digit.concat(result)
    wet /= destBase
  }

  const digit = alphabet[Math.floor(digitVal)]
  result = digit.concat(result)

  return result
}

export function generatePassword(pass: string, salt: string) {
  const hash = md5(pass + salt)
  console.log(hash)
  return convert(
    hash,
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=~!@#$%^&*()_+,./<>?;:[]{}|'
  )
}
