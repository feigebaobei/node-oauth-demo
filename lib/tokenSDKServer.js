// import sm from './sm.js'
// import axios from 'axios'
const sm = require('./sm.js')
const axios = require('axios')

// var hashStr = 'c888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a' // 与go代码里一样的字符串
// var priStr = '55c974f17a0b44178d982dcd478150b8a4c0f206f397d7880d06bf5a72932b81'
var sm2 = sm.sm2


// main()
function main() {
  test0()
  test1()
  test2()
}

// 使用指定的私钥
function test0() {
  var keyesDefine = sm2.genKeyPair(priStr)
  var ct = keyesDefine.encrypt(hashStr)
  console.log('ct:', `[${ct.join(', ')}]`)
  // ct: [246, 106, 106, 40, 249, 239, 104, 205, 94, 25, 74, 123, 117, 222, 186, 157, 161, 54, 72, 5, 161, 55, 231, 22, 35, 1, 41, 120, 226, 18, 197, 95, 143, 44, 190, 238, 171, 248, 247, 163, 91, 234, 30, 56, 158, 201, 3, 172, 214, 151, 42, 167, 104, 91, 90, 12, 34, 99, 41, 73, 16, 156, 197, 27, 253, 36, 73, 156, 146, 2, 200, 250, 44, 127, 17, 67, 162, 208, 186, 195, 225, 179, 163, 180, 116, 102, 126, 226, 35, 154, 39, 58, 206, 129, 255, 188, 61, 178, 253, 3, 203, 218, 136, 187, 226, 146, 186, 169, 2, 171, 209, 211, 186, 73, 67, 86, 61, 69, 97, 52, 88, 225, 75, 208, 231, 225, 45, 118, 46, 15, 250, 16, 193, 84, 3, 152, 135, 81, 63, 19, 170, 94, 178, 101, 148, 187, 41, 86, 30, 219, 31, 72, 230, 44, 144, 144, 155, 171, 205, 173]
  var mt = keyesDefine.decrypt(ct)
  console.log('mt:', `[${mt.join(', ')}]`)
  // mt: [99, 56, 56, 56, 99, 57, 99, 101, 57, 101, 48, 57, 56, 100, 53, 56, 54, 52, 100, 51, 100, 101, 100, 54, 101, 98, 99, 99, 49, 52, 48, 97, 49, 50, 49, 52, 50, 50, 54, 51, 98, 97, 99, 101, 51, 97, 50, 51, 97, 51, 54, 102, 57, 57, 48, 53, 102, 49, 50, 98, 100, 54, 52, 97]
  var signData = keyesDefine.signSha512(hashStr)
  console.log('signData:', signData)
  // signData: {r: "4e403f48d144c3077ea0cc2070535a9d9ccad580459b735f9c988b6f64851000", s: "6db31e8b77902d72417b4593b9e3734cb8f10389ce3382774d75b0d3a317b8a4"}
  var isok = keyesDefine.verify512(hashStr, signData.r, signData.s)
  console.log('isok:', isok)
  // isok: true
}

// 使用自动生成的私钥
function test1() {
  var keyesAuto = sm2.genKeyPair()
  // console.log('keyesAuto', keyesAuto)
  var ct = keyesAuto.encrypt(hashStr)
  console.log('ct:', `[${ct.join(', ')}]`)
  // ct: [246, 106, 106, 40, 249, 239, 104, 205, 94, 25, 74, 123, 117, 222, 186, 157, 161, 54, 72, 5, 161, 55, 231, 22, 35, 1, 41, 120, 226, 18, 197, 95, 143, 44, 190, 238, 171, 248, 247, 163, 91, 234, 30, 56, 158, 201, 3, 172, 214, 151, 42, 167, 104, 91, 90, 12, 34, 99, 41, 73, 16, 156, 197, 27, 253, 36, 73, 156, 146, 2, 200, 250, 44, 127, 17, 67, 162, 208, 186, 195, 225, 179, 163, 180, 116, 102, 126, 226, 35, 154, 39, 58, 206, 129, 255, 188, 61, 178, 253, 3, 203, 218, 136, 187, 226, 146, 186, 169, 2, 171, 209, 211, 186, 73, 67, 86, 61, 69, 97, 52, 88, 225, 75, 208, 231, 225, 45, 118, 46, 15, 250, 16, 193, 84, 3, 152, 135, 81, 63, 19, 170, 94, 178, 101, 148, 187, 41, 86, 30, 219, 31, 72, 230, 44, 144, 144, 155, 171, 205, 173]
  var mt = keyesAuto.decrypt(ct)
  console.log('mt:', `[${mt.join(', ')}]`)
  // mt: [99, 56, 56, 56, 99, 57, 99, 101, 57, 101, 48, 57, 56, 100, 53, 56, 54, 52, 100, 51, 100, 101, 100, 54, 101, 98, 99, 99, 49, 52, 48, 97, 49, 50, 49, 52, 50, 50, 54, 51, 98, 97, 99, 101, 51, 97, 50, 51, 97, 51, 54, 102, 57, 57, 48, 53, 102, 49, 50, 98, 100, 54, 52, 97]
  var signData = keyesAuto.signSha512(hashStr)
  console.log('signData:', signData)
  // signData: {r: "8fa4acb8ed782e0aadd2a03c49ab60abe3a1ad625c17f7207294762dbdcf63bd", s: "a1899998f6d57b6e9eb7c133f07032a910c5acf0b53c58b2cccd0755ff78afed"}
  var isok = keyesAuto.verify512(hashStr, signData.r, signData.s)
  console.log('isok:', isok)
  // isok: true
}

// 使用原版sm2.js的方法
function test2() {
  var keyes = sm2.genKeyPair()
  var sign = keyes.sign(hashStr)
  console.log('sign:', sign)
  // sign: {r: "64590e43b91e7a6c1249c9f3e19cb1f84e9fe56160d9f502a764e856193c9336", s: "2063cb56b981581a333b11ade303106c6c388a86955a01915ee5e6cfcba8faab"}
  var isok = keyes.verify(hashStr, sign.r, sign.s)
  console.log('isok:', isok)
  // isok: true
}

/**
 * axios的实例
 * @type {[type]}
 */
const instance = axios.create({
  baseURL: 'http://47.95.242.110:8587',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'keyli': 'valueli'
  }
})

/**
 * 用于测试的方法
 * @return {Function} [description]
 */
function fn () {
  console.log('welcome to here')
}

/**
 * 使用did请求公钥
 * @param  {string} did [description]
 * @return {promise}     [description]
 */
function getPubByDid (did) {
  let reqBody = {
    "jsonrpc":"2.0",
    "method":"did_getPubkeyByDid",
    "params":[
      // "did:ttm:u0ece7b787c097d55b87d4c01efae0fbe6a27b10cec8a67847c68f0482a8dc"
    ],
    "id":1
  }
  reqBody.params.push(did)
  return instance.get(did, {params: reqBody})
  // .then((res) => {
  //   console.log('res', res)
  // }).catch((err) => {
  //   console.log('err', err)
  // })
}


/**
 * 创建身份证书
 * @return {[type]} [description]
 */
function createIdCertify () {

}
/**
 * 验证身份证书
 * @return {[type]} [description]
 */
function validateIdCertify () {}
/**
 * 取消身份证书
 * @return {[type]} [description]
 */
function cancelIdCertify () {}
/**
 * 创建通用证书
 * @return {[type]} [description]
 */
function createCommonCertify () {}
/**
 * 验证通用证书
 * @return {[type]} [description]
 */
function validateCommonCertify () {}
/**
 * 核验通用证书
 * @return {[type]} [description]
 */
function checkCommonCertify () {}
/**
 * 取消通用证书
 * @return {[type]} [description]
 */
function cancelCheckCommonCertify () {}

module.exports = {
  main,
  test0,
  test1,
  test2,
  fn,
  getPubByDid,
  sm2,
  createIdCertify,
  validateIdCertify,
  cancelIdCertify,
  createCommonCertify,
  validateCommonCertify,
  checkCommonCertify,
  cancelCheckCommonCertify
}