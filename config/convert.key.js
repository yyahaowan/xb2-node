const fs = require('fs')
const path = require('path')

// 读取文件内容（多行）
const privateKey = fs.readFileSync(path.join('config', 'private.key'))
const publicKey = fs.readFileSync(path.join('config', 'public.key'))

// 用base64转成一行
const privateKeyBase64 = Buffer.from(privateKey).toString('base64')
const publicKeyBase64 = Buffer.from(publicKey).toString('base64')

// 输出转换结果
console.log('\nPRIVATE_KEY:', privateKeyBase64);
console.log('\nPUBLIC_KEY:', publicKeyBase64);