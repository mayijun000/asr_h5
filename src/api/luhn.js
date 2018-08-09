//Luhm校验规则：16位银行卡号（19位通用）:  

// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。  
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。  
// 3.将加法和加上校验位能被 10 整除。  

//方法步骤很清晰，易理解，需要在页面引用Jquery.js      

//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件  
export const luhmCheck = bankno => {
	let lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）  

	let first15Num = bankno.substr(0, bankno.length - 1); //前15或18位  
	let newArr = new Array();
	for(let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组  
		newArr.push(first15Num.substr(i, 1));
	}
	let arrJiShu = new Array(); //奇数位*2的积 <9  
	let arrJiShu2 = new Array(); //奇数位*2的积 >9  

	let arrOuShu = new Array(); //偶数位数组  
	for(let j = 0; j < newArr.length; j++) {
		if((j + 1) % 2 == 1) { //奇数位  
			if(parseInt(newArr[j]) * 2 < 9)
				arrJiShu.push(parseInt(newArr[j]) * 2);
			else
				arrJiShu2.push(parseInt(newArr[j]) * 2);
		} else //偶数位  
			arrOuShu.push(newArr[j]);
	}

	let jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数  
	let jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数  
	for(let h = 0; h < arrJiShu2.length; h++) {
		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}

	let sumJiShu = 0; //奇数位*2 < 9 的数组之和  
	let sumOuShu = 0; //偶数位数组之和  
	let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和  
	let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和  
	let sumTotal = 0;
	for(let m = 0; m < arrJiShu.length; m++) {
		sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}

	for(let n = 0; n < arrOuShu.length; n++) {
		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}

	for(let p = 0; p < jishu_child1.length; p++) {
		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	//计算总和  
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

	//计算Luhm值  
	let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	let luhm = 10 - k;

	if(lastNum == luhm && lastNum.length != 0) {
		//       $("#banknoInfo").html("Luhm验证通过");  
		return true;
	} else {
		//       $("#banknoInfo").html("银行卡号必须符合Luhm校验");  
		return false;
	}
}