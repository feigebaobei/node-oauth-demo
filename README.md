# 链信服务服务端SDK使用说明

该说明文档以孙老师的《链信服务应用端SDK使用说明》为蓝本开发的。
使用了node.js语言。
文件名：tokenSDKServer.js

在终端进入`项目根目录/lib`.执行`node testTokenSDKServer.js`。
tokenSDKServer.js     // 使用nodo.js语言写的服务端sdk  
testTokenSDKServer.js // 测试tokenSDKServer.js的文件

## 什么是链信服务服务端SDK - chain application sdk
链信服务服务端SDK是为接入链信服务的应用系统准备的开发包，由应用系统的服务器端加载使用。SDK为身份/存证/积分等链信服务提供基于DID确权访问的服务封装接口，确保对链信节点的正确访问，从而组成的安全可信可靠的数据云服务。
该SDK嵌入传统应用服务端系统后，使之成为兼顾中心化与去中心化优势的混合应用系统。
该SDK为上述服务端应用提供了简单易用的node.js开发接口，屏蔽了复杂的链信DID、存证服务等机制。使用该SDK可以实现基于链信DID数据确权服务的快速开发。

## 定义

### 应用服务
是指访问由链节点组成的安全可信数据云服务系统，
如：身份/存证/积分等应用服务，
应用服务的客户端通过访问应用服务实现区块链存证或积分功能。

### 链信服务服务端SDK

是指嵌入应用服务系统中，为应用服务提供符合链节点要求的数据格式，包括存证数据报文的组织、签名、提交到区块链并获得确权数据指纹，以及其它私有数据加解密服务功能。

## 功能

- 可信身份DID管理：提供去中心化数字身份标识DID，并将该DID与权益管理的公私钥绑定。
- 提交数据存证声明：按照区块链存证服务要求的格式对数据签名，并提交到区块链上，获得数据存证指纹。
- 私密数据加解密：提供DID对应私密数据的存取，
私密数据加密存储于本地文件系统。

## 使用方式

- 预申请应用系统DID：在封装了链信服务客户端的app上申请应用系统DID（即adid）
- 应用服务端引入DID的配置文件。用户在应用服务端绑定DID，从而后续提交的确权数据具有不可抵赖不可篡改的特性
- 应用服务端引入链信服务服务端SDK：tokenSDKServer.js

## 支持链信服务端SDK项目的开发
### 项目配置

#### install

```
npm install tokenSDKServer
```

#### 引入

```
const tokenSDKServer = require('./tokenSDKServer')
```

### 资源导入

链信服务端SDK采用预分配应用系统DID的方式，即以资源文件的形式一次性将DID所依赖的资源导入到应用系统，
资源文件名为`a0f49a0b95a5201b690bf0b79eb715dad9ae7815efe9800998ecf8427e8d74.ttm`。
文件内容包括：
- 内容编码txt文本
- 内容正文
  - nickname:did:encodebased64_SM4(json数组，密钥)
  - 密钥
    - 身份密码
    - 导出或备份时生产的备份验证码
- nickname：did的昵称，用于显示和提示及校验
- did：去掉前缀的did字串
- json数组
  - name：实名
  - phone：可收验证码确权的手机号
  - pdid：关联的父did，可通过父did确权
  - node：服务器接入点域名
  - prikey：私钥
    - encode_based64_SM4(私钥，文件名did+nickname)
  - 这个加密是为了保证文件完整性没有被破坏，与导出时一致：文件名和昵称

*注意：文件保存在系统运行的当前目录下。*

### api（暂定）

|方法名|功能|参数|返回|示例|备注|
|-|-|-|-|-|-|
|getPubByDid|使用did请求公钥|did string|pub|`tokenSDKServer.getPubByDid("did:ttm:u0ece7b787c097d55b87d4c01efae0fbe6a27b10cec8a67847c68f0482a8dc")`||
|createIdCertify|创建身份证书|||||
|validateIdCertify|验证身份证书|||||
|cancelIdCertify|取消身份证书|||||
|createCommonCertify|创建通用证书|certifyCategoryId string, hashCont string, endtime string 单位：秒, sign string|`{"claim_sn": "string", "certifyCategoryId": "string", "hashCont": "string", "statusCode": 0}`|`tokenSDKServer.createCommonCertify('12345678', '0a4391581d6e6f632b2457b6f53844ccbaef2e0aa0ea54efa9ae366d', '1588648619', '7f616bf614edba17eadb6963f671cbbba2131bac8f3b2bff8b9bfaea')`||
|validateCommonCertify|验证通用证书|did string, certifyCategoryId string, hashCont string, endtime string, sign string|boolean|`tokenSDKServer.validateCommonCertify("did:ttm:u0ece7b787c097d55b87d4c01efae0fbe6a27b10cec8a67847c68f0482a8dc", "12345678", "0a4391581d6e6f632b2457b6f53844ccbaef2e0aa0ea54efa9ae366d", "1588648619", "7f616bf614edba17eadb6963f671cbbba2131bac8f3b2bff8b9bfaea")`||
|checkCommonCertify|核验通用证书|||||
|cancelCheckCommonCertify|取消通用证书|did string, certifyCategoryId string, hashCont string, endtime string, sign string|`{"claim_sn": "string", "certifyCategoryId": "string", "hashCont": "string",  "cancelSign": {"sign": "string", by-did: "string", "endtime": "string", "status": "cancel"}, "statusCode": 0}`|`tokenSDKServer.validateCommonCertify("did:ttm:u0ece7b787c097d55b87d4c01efae0fbe6a27b10cec8a67847c68f0482a8dc", "12345678", "0a4391581d6e6f632b2457b6f53844ccbaef2e0aa0ea54efa9ae366d", "1588648619", "7f616bf614edba17eadb6963f671cbbba2131bac8f3b2bff8b9bfaea")`||

## 部署
系统在部署的阶段除了要部署生成的二进制代码，也同样需要部署资源文件，资源文件的部署与开发阶段一样，将资源文件保存在系统运行的当前目录下。
当运行initSDK执行SDK初始化操作，后发起claimSubmit方法调用，如果调用成功，说明完成了系统的正确部署。也可以发起加密和解密以验证私有数据的加解密功能。
