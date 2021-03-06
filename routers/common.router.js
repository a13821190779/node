const express = require('express')
const router = express.Router({
	caseSensitive: false //默认不区分大小写
})
const userRouter = require('./user.router.js')

router.use(( req, res, next ) => {
	process.env.NODE_ENV === 'production' && next() // 这里可能有坑，先记一下
	// 跨域接受cookies，进行身份验证
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers','x-requested-with, accept, origin, content-type')//处理发送json数据，非简单请求
	res.header('X-Powered-By',' 3.2.1')
	res.header('Content-Type', 'application/json;charset=utf-8')
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')//不缓存即不会出现304
	next()
})

router.use(userRouter)

module.exports = router