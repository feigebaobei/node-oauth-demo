const tokenSDKServer = require('./tokenSDKServer')

// 为模拟验签过程，现生成一套密钥对。
// 这套密钥对与使用go生成的密钥对一样。
// let keyes = tokenSDKServer.sm2.genKeyPair()
// console.log(keyes)

// 不用js生成的密钥对了。使用庆雪给的密钥对。
// 私钥：0x795c876501792b31029d42f52a78270fe4a5503e5cb728a29c13a110e63feef0
// 公钥：0x04d7d500129379b458a92289ce23b2d774d08692d0827c72aca6e8ac869bbcd3b0d21abfbf0e3a55578ef34532bac2222a88f967137039915089315278aebdd3a1
// did：did:ttm:u0f49a0b95a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74

const priv = '0x795c876501792b31029d42f52a78270fe4a5503e5cb728a29c13a110e63feef0'
const pub = '0x04d7d500129379b458a92289ce23b2d774d08692d0827c72aca6e8ac869bbcd3b0d21abfbf0e3a55578ef34532bac2222a88f967137039915089315278aebdd3a1'
const did = 'did:ttm:u0f49a0b95a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74'

// // 1.1 使用did请求公钥。
// var pub = null
// async function testAsync () {
//   tokenSDKServer.getPubByDid("did:ttm:u0ece7b787c097d55b87d4c01efae0fbe6a27b10cec8a67847c68f0482a8dc").then(res => {
//     console.log('res.data', res.data)
//     pub = res.data
//   }).catch(err => {
//     console.log('err', err)
//   })
// }

// // 1.2 使用公钥验签客户端传来的数据。
// // 需要加签的数据
// let signObj = '{"name": "NAME","school": "SCHOOL"}'

// var keyesAuto = tokenSDKServer.sm2.genKeyPair() // 生成密钥对
// var signData = keyesAuto.signSha512(signObj) // 使用私钥加签
// var isok = keyesAuto.verify512(signObj, signData.r, signData.s) // 使用公钥验签
// console.log("验签结果：", isok)






// 创建身份证书

// 申请验证身份证书
// 验证身份证书
// 使用身份证书
// 取消身份证书

// 创建通用证书
// 申请验证通用证书
// 验证通用证书
// 核验通用证书
// 取消通用证书

// 加签数据（一般用于授权）
// 验签数据




