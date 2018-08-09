import sm3 from "@/api/sm3"
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if(!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if(!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
	if(!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
	if(!name) return;
	window.sessionStorage.removeItem(name);
}

//手机号校验
export const isPhoneVailable = pone => {
	var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if(!reg.test(pone)) {
		return true; //没通过
	} else {
		return false;
	}
}
//获取url参数
export const getQueryString = name => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

export const urlSearch = name => {
	let str = location.href; //取得整个地址栏

	let num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = str.match(reg);
	return unescape(r[2])
}

//获取签名算法
export const getSign = (reqtime, user, token) => {
	let str = "reqtime=" + reqtime + "&user=" + user + "&token=" + token;
	let hash = new sm3();
	let digest = hash.sum(str.toString().toLowerCase(), 'hex');
	return digest.toUpperCase();
}

//时间转换
export const getLocalTime = nS => {
	let date = new Date(nS);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

/* 
 * formatMoney(s,type) 
 * 功能：金额按千位逗号分割 
 * 参数：s，需要格式化的金额数值. 
 * 参数：type,判断格式化后的金额是否需要小数位. 
 * 返回：返回格式化后的数值字符串. 
 */
export const formatMoney = (s, type) => {
	if(/[^0-9\.]/.test(s))
		return "0";
	if(s == null || s == "")
		return "0";
	s = s.toString().replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	let re = /(\d)(\d{3},)/;
	while(re.test(s))
		s = s.replace(re, "$1,$2");
	s = s.replace(/,(\d\d)$/, ".$1");
	if(type == 0) { // 不带小数位(默认是有小数位)  
		let a = s.split(".");
		if(a[1] == "00") {
			s = a[0];
		}
	}
	return s;
}