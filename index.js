const bluebird = require('bluebird') // 为什么要用蓝鸟的promise替换node自身的promise呢？找时间查一下
const express = require('express')
const app = express()
const bodyParser = require('body-parser') // 需要这个中间件来处理post请求
const cookieParser = require('cookie-parser') // 解析cookies的
// const session = require('express-session') // 创建session的
const config = require('./config/')
const commonRouter = require('./routers/common.router.js')

global.Promise = bluebird

//连接数据库
const mongoose = require('mongoose')
mongoose.Promise = global.Promise // mongoose的Promise被弃用了...
mongoose.connect('mongodb://localhost/blog')
const db = mongoose.connection
db.on('error', (error) => {
	console.log(`连接数据库失败：${error}`)
})
db.on('open', () => {
	console.log('连接数据库成功')
})

app.use('/static', express.static('public'))//设置资源目录

//处理json与formData数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 解释cookise的
app.use(cookieParser())
// app.use(session({
// 	resave: false,
// 	saveUninitialized: true,
// 	secret: RandomSecret(),
// 	name: 'blogSession',
// 	cookie: { maxAge: 60 * 1000}
// }))

// use 路由
app.use( commonRouter )

// 测试 cookieParser 
app.get('/', function (req, res) {
    if (req.cookies.visit) {
        res.cookie('visit', +req.cookies.visit + 1, {maxAge: 10000})
        res.send("再次欢迎访问")
    } else {
        res.cookie('visit', 1, {maxAge: 10000})
        res.send("欢迎首次访问")
    }
})

// 配置文件选项，监听
app.listen(config.port)