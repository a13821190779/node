const { max, min } = Math
const { toString } = Object.prototype

// 验证用户名
const user = function(str, length = [8,16]) {
	try {
		const reg = new RegExp(`^[a-zA-Z0-9_-]{${min.apply(null, length)},${max.apply(null, length)}}$`)
		if (toString.call(length) !== '[object Array]' || length.length !== 2 || max.apply(null, length) > 20 || min.apply(null, length) < 2) {
			throw 'user方法的第二个参数要求长度为2的数组，且最小值>=2，最大值<=20'
		}
		if (toString.call(str) !== '[object String]') {
			throw 'user方法的第一个参数要求为String类型'
		}
		return reg.test(str)
	} catch (err) {
		console.log(`%cWARN: ${err}`, 'color:#FF4949;')
	}
}

// 验证Email
const email = function(str) {
	try {
		const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
		if (toString.call(str) !== '[object String]') {
			throw 'email方法的第一个参数要求为String类型'
		}
		return reg.test(str)
	} catch (err) {
		console.log(`%cWARN: ${err}`, 'color:#FF4949;')
	}
}

// 验证部分中文，可以取反判断不能有中文的句子
const partCn = function(str) {
	try {
		const reg = /[\u4E00-\u9FA5]/
		if (toString.call(str) !== '[object String]') {
			throw 'email方法的第一个参数要求为String类型'
		}
		return reg.test(str)
	} catch (err) {
		console.log(`%cWARN: ${err}`, 'color:#FF4949;')
	}
}

// 验证密码长度，没有强度
const password = function(str, length = [8,16]) {
	try {
		const reg = new RegExp(`^(\\w){${min.apply(null, length)},${max.apply(null, length)}}$`)
		if (toString.call(length) !== '[object Array]' || length.length !== 2 || max.apply(null, length) > 20 || min.apply(null, length) < 2) {
			throw 'user方法的第二个参数要求长度为2的数组，且最小值>=2，最大值<=20'
		}
		return reg.test(str)
	} catch (err) {
		console.log(`%cWARN: ${err}`, 'color:#FF4949;')
	}
}

// 判断两次密码是否一致
const issamepw = function(str1, str2) {
	if (str1 === str2) {
		return true
	} else {
		return false
	}
}

export default {
	user,
	email,
	partCn,
	password,
	issamepw
}
