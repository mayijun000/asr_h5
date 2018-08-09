import { baseUrl } from './env'
import { getStore } from "@/config/mUtils"
export default async(url = '', data = {}, type = 'GET', isBody = true, method = 'fetch') => {
	type = type.toUpperCase();

	if(type == 'GET') {
		let dataStr = '?temp=' + new Date().getTime() + '&'; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + encodeURIComponent(data[key]) + '&';
		})

		dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		url = url + dataStr;
	}

	let token = getStore("token");

	if(window.fetch && method == 'fetch') {

		var headers = new Headers();
		headers.append('Accept', 'application/json');
		if(type == 'GET') {
			headers.append('Content-Type', 'application/json; charset=UTF-8');
		} else {
			if(isBody == "json") {
				headers.append('Content-Type', 'application/json; charset=UTF-8');
			}else if(isBody == "formdata"){
				/*headers.append('Content-Type', 'multipart/form-data; charset=UTF-8');*/
			} else {
				headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			}
		}
		headers.append('token', token);

		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: headers,
			mode: "cors",
			//cache: "no-cache"
		}

		if(type == 'POST') {
			if(isBody == "json") {
				let value = ""
				if(typeof(data) == "string") {
					value = data
				} else {
					value = JSON.stringify(data)
				}
				Object.defineProperty(requestConfig, 'body', {
					value: value
				});
			}else if(isBody == "formdata"){
				let formdata = new FormData();
				for(let key in data) {
					if(key == "files"){
						for(var i =0;i < data[key].length;i++){    //提交时，我们把filearr中的数据遍历一遍
							formdata.append("files", data[key][i]); //用append添加到formData中，就得用户最终要提交的图片了	
						};
					}else{
						formdata.append(key,data[key]);						
					}
				}
						
				Object.defineProperty(requestConfig, 'body', {
					value: formdata
				});
			}  else {
				let dStr = "";
				for(let key in data) {
					dStr += key + "=" + data[key] + "&";
				}
				dStr = dStr.substr(0, dStr.lastIndexOf('&'));
				Object.defineProperty(requestConfig, 'body', {
					value: dStr
				});
			}
		}

		try {
			const response = await fetch(url, requestConfig);
			if(response.status == 200) {
				let res = response.json();
				return res;
			}
		} catch(error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if(window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if(type == 'POST') {
				if(typeof(data) == "string") {
					sendData = data
				} else if(isBody == "formdata"){
					let formdata = new FormData();
					for(let key in data) {
						formdata.append(key,data[key]);
					}
					sendData = formdata;
				} else {
					if(isBody == "json") {
						let dStr = "";
						for(let key in data) {
							dStr += key + "=" + data[key] + "&";
						}
						sendData = dStr.substr(0, dStr.lastIndexOf('&'));
					}
				}
				if(isBody == "json") {
					requestObj.setRequestHeader("Content-type", "application/json; charset=UTF-8");
				}else if(isBody == "formdata"){
					/*headers.append('Content-Type', 'multipart/form-data; charset=UTF-8');*/
				} else {
					requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				}
			} else {
				requestObj.setRequestHeader("Content-type", "application/json; charset=UTF-8");
			}
			requestObj.open(type, url, true);
			requestObj.withCredentials = true;
			requestObj.setRequestHeader("token", token);
			requestObj.send(sendData);
			requestObj.onreadystatechange = () => {
				if(requestObj.readyState == 4) {
					if(requestObj.status == 200) {
						let obj = requestObj.response
						if(typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}