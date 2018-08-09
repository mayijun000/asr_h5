<template>
	<div>
		<headTop showBack="1" title="签订贷款合同"></headTop>
		<div class="list">
			<div class="process">
				<dl>
					<dt>
							<span class="circular step"></span>
							<span class="line step"></span>
						</dt>
					<dd>选择产品</dd>
				</dl>
				<dl>
					<dt>
							<span class="line step"></span>
							<span class="circular step"></span>
							<span class="line step"></span>
						</dt>
					<dd>填写申请</dd>
				</dl>
				<dl>
					<dt>
							<span class="line step"></span>
								<span class="circular step"></span>
								<span class="line step"></span>
							</dt>
					<dd>平台初审</dd>
				</dl>
				<dl>
					<dt>
							<span class="line step"></span>
								<span class="circular step"></span>
								<span class="line step"></span>
							</dt>
					<dd>完善资料</dd>
				</dl>
				<dl>
					<dt>
							<span class="line step"></span>
								<span class="circular step"></span>
								<span class="line step"></span>
							</dt>
					<dd>银行授信</dd>
				</dl>
				<dl>
					<dt>
							<span class="line step"></span>
								<span class="circular step"></span>
								<span class="line step"></span>
							</dt>
					<dd>开户&签订合同</dd>
				</dl>
				<dl>
					<dt>
								<span class="line"></span>
								<span class="circular"></span>
							</dt>
					<dd>立即放款</dd>
				</dl>
			</div>
		</div>
		<div class="list">
			<div class="list_tip">
				<img src="../../static/caution.png" />
				<span>请如实填写签订贷款合同内容，以保证贷款的顺利进行！</span>
			</div>
			<h3>填写签订信息</h3>
			<form enctype="multipart/form-data">
				<div class="list_cont">
					<div class="form">
						<p>
							<label><span>*</span>合同总额(元):</label>
							<input type="text" placeholder="请输入合同总额" v-model="submitData.loanAmount">
						</p>
						<p class="other">
							<label><span>*</span>贷款还款方式:</label>
							<input type="text" placeholder="请选择还款方式" value="一次性还本付息">
						</p>
						<p class="other">
							<label><span>*</span>贷款投向:</label>
							<input type="text" placeholder="请选择贷款投向" v-model="submitData.direction" readonly="readonly" @click="showModePicker">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="regionVisible" position="bottom" class="region-popup">
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeModePicker">取消</span>
									<span class="mint-datetime-action mint-datetime-confirm" @click="okModePicker">确定</span>
								</div>
								<mt-picker :slots="modeListSlots" valueKey="name" :visibleItemCount="7" @change="onModeChange" :itemHeight="60"></mt-picker>
							</mt-popup>
						</p>
						<p>
							<label><span>*</span>贷款用途:</label>
							<input type="text" placeholder="请输入贷款用途" v-model="submitData.ln_use">
						</p>
						<p>
							<label><span>*</span>申请人姓名:</label>
							<input type="text" placeholder="请输入申请人姓名" v-model="submitData.userRealName" readonly="readonly">
						</p>
						<p>
							<label><span>*</span>申请人身份证号码:</label>
							<input type="text" placeholder="请输入身份证号码" v-model="submitData.userIdno" readonly="readonly">
						</p>
						<p>
							<label><span>*</span>一类账户银行:</label>
							<input type="text" placeholder="请输入一类账户银行" v-model="submitData.cardBankName" readonly="readonly">
						</p>
						<p>
							<label><span>*</span>一类账户卡号:</label>
							<input type="text" placeholder="请输入一类账户卡号" v-model="submitData.cardNo" readonly="readonly">
						</p>
						<p>
							<label><span>*</span>银行卡预留手机号:</label>
							<input type="text" placeholder="请输入手机号码" maxlength="11" style="width:35%;" v-model="submitData.cardMobile" readonly="readonly">
							<a href="javascript:void(0);" class="btn" v-show="isCodeSend" @click="sendMobileCode">获取验证码</a>
							<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
						</p>
						<p>
							<label><span>*</span>短信验证码:</label>
							<input type="number" placeholder="请输入短信验证码" style="width:35%;" v-model="submitData.bank_auth_code">
							<i class="cancel" @click="cancel">&nbsp;</i>
						</p>
						<p class="agree" id="agreeBox">
							<input type="checkbox" v-model="checkBox2" class="agree"></b>
							<span>我已阅读并同意<a href="javascript:;" @click="toAgreeContract" class="angents">《中关村银行个人借款合同》</a></span>
						</p>

					</div>
				</div>
				<div class="btn">
					<a href="javascript:void(0);" class="apply" @click="submitApply">立即签订合同</a>
				</div>
			</form>
			<mt-popup v-model="popupVisible" style="width:80%;">
				<div class="list">
					<h3>贷款合同详情</h3>
					<div class="list_cont">
						<ul>
							<li><i>贷款还款方式:</i><span>一次性还本付息</span></li>
							<li><i>申请人姓名:</i><span>{{submitData.userRealName}}</span></li>
							<li><i>申请人身份证号码:</i><span>{{submitData.userIdno}}</span></li>
							<li><i>申请人一类账户开户银行:</i><span>{{submitData.cardBankName}}</span></li>
							<li><i>一类账户卡:</i><span>{{submitData.cardNo}}</span></li>
							<li><i>银行卡预留手机号:</i><span>{{submitData.cardMobile}}</span></li>
							<li><i>预留手机号码短信验证码:</i><span>{{submitData.bank_auth_code}}</span></li>
							<li>
								<p><a href="javascript:;" class="col" @click="toAgreeContract">《中关村银行个人借款合同》</a>我已经同意和中关村银行签署贷款电子合同</p>	
							</li>
						</ul>
					</div>
				</div>
				<div><a href="javascript:void(0);" class="applyMin" @click="signData">我填写的信息正确，立即签订贷款合同</a></div>
				<div style="margin:0.15rem 0;"><a href="javascript:void(0);" class="applyMin" @click="closePopup">返回重新填写</a></div>
			</mt-popup>
			<mt-popup v-model="successPopup" style="width:80%;">
				<div class="list">
					<h3 style="font-size: 0.18rem;">《中关村银行贷款合同签署成功通知书》</h3>
					<div class="list_cont">
						<ul>
							<li><i>贷款合同总额（元）:</i><span>{{successLoan.loanAmount}}</span></li>
							<li><i>贷款合同号:</i><span>{{successLoan.loanContractNo}}</span></li>
							<li><i>还款方式:</i><span>一次性还本付息</span></li>
							<li><i>中关村银行二类账户号码:</i><span>{{successLoan.zgcbAccountNo}}</span></li>
						</ul>
					</div>
				</div>
				<div style="margin-bottom: 0.15rem;"><a href="javascript:void(0);" class="applyMin" @click="toZgcPaymentPlan">查看还款计划</a></div>
			</mt-popup>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { findCreditByApplyId, sendMobileCode, checkMobileCode,sign } from "@/api/getData"
	import { Toast, Indicator, Picker, Popup } from 'mint-ui';
	import { getStore } from "@/config/mUtils"
	import chineseDistricts from '@/api/chineseDistricts.json'
	export default {
		data() {
			return {
				applyId: "",
				productId: "",
				credit:{},
				submitData:{
	                creditId : "",
	                loanAmount : "",
	                userRealName : "",
	                userIdno : "",
	                direction : "",
	                ln_use : "",
	                cardBankCode :"",
	                cardBankName : "",
	                cardNo : "",
	                cardMobile : "",
	                loanTermCd : "LT02",
	                loanTerm : "",
	                verify_no : "",
	                bank_auth_code : ""
	            },
	            min:"",
				checkBox2: false, //是否同意协议
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true,
				modeInit: false,
				regionVisible:false,//选择框是否显示
				popupVisible:false,//确认框是否显示
				successPopup:false,//签订合同成功
				successLoan:{},
				modeListSlots: [
					//省  
					{
						flex: 1,
						values: this.getProvinceArr(), //获取一级数据
						className: 'slot1',
						textAlign: 'center',
						defaultIndex: 0
					},
					//分隔符  
					{
						divider: true,
						content: '',
						className: 'slot2'
					},
					//市  
					{
						flex: 1,
						values: this.getCityArr("A"),
						className: 'slot3',
						textAlign: 'center',
						defaultIndex: 0
					},
					{
						divider: true,
						content: '',
						className: 'slot4'
					},
					//县  
					{
						flex: 1,
						values: this.getCountyArr("A01"),
						className: 'slot5',
						textAlign: 'center',
						defaultIndex: 0
					},
					{
						divider: true,
						content: '',
						className: 'slot6'
					},
					//最小
					{
						flex: 1,
						values: this.getMinArr("A011"),
						className: 'slot7',
						textAlign: 'center',
						defaultIndex: 0
					},
				],
			}
		},
		created() {
			this.applyId = this.$route.query.applyId;
			this.productId = this.$route.query.productId;
			this.findCreditByApplyId();
		},
		components: {
			headTop,
			Picker,
			Popup 
		},
		methods: {
			//遍历json，返回省级对象数组  
			getProvinceArr() {
				let provinceArr = [];
				let list = chineseDistricts["86"]["1"];
				list.forEach(function(item){
					let obj = {};
					obj.name = item.address;
					obj.code = item.code;
					provinceArr.push(obj);
				});
				return provinceArr;
			},
			//遍历json，返回市级对象数组  
		    getCityArr(province) {  
		        let cityArr = [];  
		        let list = chineseDistricts;
				for(let child in list[province]){
					let obj = {};
					obj.name = list[province][child];
					obj.code = child;
					cityArr.push(obj);
				}
		        return cityArr;  
		    },
		    //遍历json，获取三级
		    getCountyArr(city){
		    	let countyArr = [];  
		        let list = chineseDistricts;
				for(let child in list[city]){
					let obj = {};
					obj.name = list[city][child];
					obj.code = child;
					countyArr.push(obj);
				}
		        return countyArr;  
		    },
		    //遍历json，获取四级
		    getMinArr(county){
		    	let minArr = [];  
		        let list = chineseDistricts;
				for(let child in list[county]){
					let obj = {};
					obj.name = list[county][child];
					obj.code = child;
					minArr.push(obj);
				}
		        return minArr;  
		    },
			//获取用户信息
			async findCreditByApplyId() {
				try {
					const res = await findCreditByApplyId({
						applyId: this.applyId
					});
					if(res.errorCode == "0") {
						let credit = res.dataBody.credit;
						this.credit = credit;
		                this.submitData.creditId = credit.id;
		                this.submitData.loanAmount = credit.creditAmount;
		                this.submitData.userRealName = credit.userRealName;
		                this.submitData.userIdno = credit.userIdno;
		                this.submitData.cardBankCode = credit.cardBankCode;
		                this.submitData.cardBankName = credit.cardBankName;
		                this.submitData.cardNo = credit.cardNo;
		                this.submitData.cardMobile = credit.cardMobile;

					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}

			},
			//发送手机验证码
			async sendMobileCode() {
				try {
					const res = await sendMobileCode({
						mobile : this.submitData.cardMobile
					});
					if(res.errorCode == "0") {
						Toast({
							message: '短信已发送，请查收！',
						});
						this.countNum();
					} else if(res.errorCode == "9999") {
						Toast({
							message: '发送失败',
						});
					} else if(res.errorCode == "1001") {
						Toast({
							message: '请填写手机号码',
						});
					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}

			},
			//检查手机验证码
			async checkMobileCodeData(){
				try {
					const res = await checkMobileCode({
						mobile : this.submitData.cardMobile,
						code:this.submitData.bank_auth_code,
					});
					if (res.errorCode == "0") {
                        this.showPopup();
                    } else if (res.errorCode == "3006") {
                    	Toast({
							message: '验证码不正确，请输入正确的验证码！',
						});
                    } else {
                    	Toast({
							message: '手机号码不正确或验证码过期，请输入正确信息！',
						});
                    }
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//提交申请
			async signData() {
				try {
					const res = await sign(this.submitData);
					if(res.errorCode == "0") {
						this.closePopup();
						this.successPopup = true;
						this.successLoan = data.dataBody.loan;
					} else {
						Toast({
							message: res.errorString,
						});
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//验证码倒计时
			countNum() {
				clearTimeout(this.timeoutCount);
				let _this = this;
				if(this.countDown > 0) {
					this.isCodeSend = false;
					this.timeoutCount = setTimeout(function() {
						_this.countNum();
					}, 1000);
					this.countDown = this.countDown - 1;
				} else {
					this.isCodeSend = true;
					this.countDown = 60;
				}
			},
			//验证数据
			checkData() {
				let submitData = this.submitData;
				if(submitData.loanAmount > this.credit.creditAmount) {
					Toast({
						message: '合同总额不能超过银行授信额度',
					});
					return false;
				} else if(submitData.direction == "") {
					Toast({
						message: '贷款投向不能为空',
					});
					return false;
				}else if(submitData.ln_use == "") {
					Toast({
						message: '贷款用途不能为空',
					});
					return false;
				}else if(submitData.bank_auth_code == "") {
					Toast({
						message: '短信验证码不能为空',
					});
					return false;
				}
				return true;
			},
			//提交申请按钮
			submitApply() {
				if(this.checkBox2) {
					if(this.checkData()) {
						this.checkMobileCodeData();
					}
				} else {
					Toast({
						message: '请勾选中关村银行个人借款合同',
					});
				}
			},
			//展示确认合同信息
			showPopup(){
				this.popupVisible = true;
			},
			closePopup(){
				this.popupVisible = false;
			},
			//清空短信验证码
			cancel() {
				this.submitData.bank_auth_code = "";
			},
			//跳转授权协议
			toAgreeContract() {
				this.$router.push({
					path: 'zgc_agreeContract'
				});
			},
			//跳转到还款计划
			toZgcPaymentPlan() {
				this.$router.push({
					path: 'zgcPaymentPlan',
					query:{
						applyId: this.applyId,
						productId: this.productId,
					}
				});
			},
			showModePicker() {
				this.regionVisible = true;
			},
			closeModePicker() {
				this.regionVisible = false;
			},
			okModePicker(type) {
				this.submitData.direction = this.min;
				this.closeModePicker();
			},
			onModeChange(picker, values) {
				if(this.modeInit) {
					this.min = values[3]["name"];
					picker.setSlotValues(1, this.getCityArr(values[0]["code"]));
					picker.setSlotValues(2, this.getCountyArr(values[1]["code"]));
					picker.setSlotValues(3, this.getMinArr(values[2]["code"]));
				} else {
					this.modeInit = true;
				}

			},
		},
	}
</script>

<style scoped>
	.bank_loan {
		padding: 0 0.375rem;
		margin-bottom: 0.15rem;
		background: #fff;
		font-size: 0.25rem;
		padding-top: 0.1rem;
	}
	
	.bank_loan b {
		color: #000;
		font-size: 0.25rem;
	}
	
	.bank_name {
		padding-top: 0.1rem;
		font-size: 0.21rem;
	}
	
	.bank_title {
		padding-right: 0.15rem;
		color: #484b50;
		float: left;
		display: -webkit-box;
		-webkit-box-align: center;
	}
	
	.bank_title img {
		display: block;
		padding-right: 0.15rem;
		height: 0.35rem;
	}
	
	.bank_credit {
		display: -webkit-box;
		float: left;
		margin-top: 0.05rem;
	}
	
	.bank_credit span.blue {
		display: block;
		background: #e4f5ff;
		color: #64a2df;
		margin-right: 0.15rem;
	}
	
	.bank_credit span.green {
		display: block;
		background: #e2f3eb;
		color: #55af8c;
	}
	
	.bank_credit span {
		font-size: 0.135rem;
		text-align: center;
		padding: 0.02rem 0.06rem;
		border-radius: 0.02rem;
	}
	
	.bank_meg {
		padding: 0.1rem 0;
		display: -webkit-box;
		-webkit-box-pack: justify;
	}
	
	.bank_meg div {
		width: 20%;
	}
	
	.bank_meg div b {
		display: block;
		color: #ff5560;
		line-height: 0.45rem;
		font-size: 0.255rem;
	}
	
	.bank_meg div span {
		display: block;
		color: #b2b2b2;
		font-size: 0.15rem;
	}
	
	.list {
		width: 100%;
	}
	
	.list {
		margin-top: 0.15rem;
	}
	
	.list_conts {
		border-bottom: #f2f3f4 solid 0.015rem;
	}
	
	.list h3 {
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0 0.47rem;
		position: relative;
		font-weight: bold;
		font-size: 0.21rem;
		background: #fff;
	}
	
	.list h3:before {
		content: "";
		width: 0.06rem;
		height: 0.24rem;
		background: #5489f1;
		border-radius: 0.03rem;
		position: absolute;
		left: 0.28rem;
		top: 0.18rem;
	}
	
	.list_cont {
		margin-bottom: 0.2rem;
		background: #fff;
	}
	
	.list_cont ul {
		padding: 0 0.15rem;
		border-bottom: #f2f3f5 solid 0.015rem;
		font-size: 0.16rem;
	}
	
	.list_cont ul li {
		border-bottom: #f2f3f5 solid 0.015rem;
		width: 100%;
		padding: 0.2rem 0;
	}
	
	.list_cont ul li:last-child {
		border-bottom: none;
	}
	
	.list_cont ul li i {
		display: inline-block;
		font-style: normal;
		display: inline-block;
		width: 55%;
		vertical-align: top;
		color: #494c51;
	}
	
	.list_cont ul li p {
		font-size: 0.12rem;
	}
	
	.list_cont ul li span {
		display: inline-block;
		color: #92979d;
		width: 30%;
	}
	
	.process {
		padding: 0.15rem 0;
		width: 100%;
		overflow: auto;
		display: -webkit-box;
		-webkit-box-pack: center;
		background: #fff;
	}
	
	.process dl {
		padding: 0.15rem 0;
		width: 14%;
		font-size: 0.15rem;
		color: #b2b2b2;
	}
	
	.process dl dt {
		height: 0.15rem;
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: end;
	}
	
	.process dl dd {
		text-align: center;
		padding-top: 0.15rem;
	}
	
	.process dl:last-child dt {
		-webkit-box-pack: start;
	}
	
	.process dl dt .circular {
		display: block;
		margin: 0 0.05rem;
		width: 0.09rem;
		height: 0.09rem;
		border: #b2b2b2 solid 0.03rem;
		border-radius: 0.09rem;
	}
	
	.process dl dt .line {
		display: block;
		width: 0.26rem;
		height: 0.03rem;
		background: #b2b2b2;
	}
	
	.process dl dt .circular.step {
		border-color: #5489f1;
	}
	
	.process dl dt .line.step {
		background-color: #5489f1;
	}
	
	.btn {
		display: -webkit-box;
		-webkit-box-pack: center;
		padding: 0.3rem;
	}
	
	.apply {
		font-size: 0.24rem;
		width: 100%;
		display: block;
		height: 0.75rem;
		text-align: center;
		line-height: 0.75rem;
		color: #ffffff;
		background-color: #5489f1;
		border-radius: 0.03rem;
	}
	.applyMin {
		font-size: 0.18rem;
		width: 90%;
		display: block;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #ffffff;
		background-color: #5489f1;
		border-radius: 0.03rem;
		margin:0 0.2rem;
	}
	
	.apply_loan {
		width: 48%;
		margin: 0 0.1rem;
	}
	
	.form p {
		padding: 0.2rem 0;
		vertical-align: top;
		border-bottom: #f2f3f5 solid 0.015rem;
		display: -webkit-box;
		-webkit-box-align: center;
	}
	
	.form .info {
		font-size: 0.15rem;
		color: #FF5661;
		padding: 0.1rem 0.45rem;
	}
	
	.form .btn {
		font-size: 0.18rem;
		color: #5489F1;
		padding: 0 0.1rem;
	}
	
	.form .closeBtn {
		font-size: 0.18rem;
		color: grey;
		padding: 0 0.1rem;
		display: -webkit-box;
	}
	
	.form p .right {
		display: block;
		color: #dddddd;
		font-size: 0.18rem;
		padding-left: 0.45rem;
		background: url(../../static/right.png) right center no-repeat;
		background-size: 0.12rem;
	}
	
	.form p .cancel {
		display: block;
		color: #dddddd;
		font-size: 0.18rem;
		padding-left: 0.25rem;
		background: url(../../static/cancel.png) right center no-repeat;
		background-size: 0.17rem;
	}
	
	.form p>label {
		display: block;
		color: #484B50;
		width: 35%;
		font-size: 0.21rem;
		padding-left: 0.3rem;
	}
	
	.form p>label span {
		color: #fc0000;
		padding-right: 0.06rem;
	}
	
	.form .other_lab {
		width: 10%;
	}
	
	.form p>input {
		width: 58%;
		display: block;
		border: none;
		height: 0.4rem;
		font-size: 0.21rem;
		color: #92979d;
	}
	
	.form p.other>input {
		width: 45%;
	}
	
	.agree {
		padding: 0.2rem 0.3rem;
		height: 0.2rem;
		position: relative;
	}
	
	.agree input[type="checkbox"] {
		width: 0.18rem;
		height: 0.18rem;
		margin-left: 0.15rem;
		margin-top: 0.03rem;
		float: left;
	}
	
	.agree span {
		display: inline-block;
		font-size: 0.18rem;
		position: absolute;
		left: 0.7rem;
	}
	
	.agree .angents {
		color: #5489f1;
	}
	
	.list_tip {
		margin-top: 0.15rem;
		height: 0.45rem;
		background: #FFF7EA;
		display: flex;
		align-items: center;
	}
	
	.list_tip img {
		padding: 0 0.15rem 0 0.3rem;
		width: 0.225rem;
	}
	
	.list_tip span {
		font-size: 0.15rem;
		color: #FEB542;
	}
	
	.form p>input[type=radio] {
		width: 0.18rem;
		margin: 0 0.1rem;
	}
	
	.radio-tet {
		font-size: 0.2rem;
		display: block;
	}
	
	input:disabled {
		background-color: #FFF;
	}
	
	.bank_tip {
		color: #92969C;
		font-size: 0.18rem;
		background-color: #FFF;
		padding: 0 0 0.15rem 0.47rem;
	}
	
	.form p>input[type=file] {
		visibility: hidden;
		/* 隐藏 */
		padding: 0;
		width: 0;
		height: 0;
		display: inline-block;
	}
	
	.img_box {
		-webkit-box-orient: horizontal;
	}
	
	.form p>img.apply_btn {
		width: 2.25rem;
		height: 1.5rem;
		-webkit-box-flex: 1;
	}
	
	.form p>img.sf_1 {
		margin-left: 0.3rem;
	}
	
	.form p.bot_none {
		border-bottom: none;
		padding-bottom: 0;
	}
	
	.form p .img {
		margin: 0 auto;
		display: block;
	}
	
	.form p.het_none {
		height: 0;
		padding: 0;
	}
	
	.content {
		width: 100%;
		text-align: center;
		background-color: #fff;
	}
	
	.content img {
		width: 0.75rem;
		padding-top: 0.3rem;
	}
	
	.content p {
		font-size: 0.18rem;
		color: #92969C;
		line-height: 0.3rem;
	}
	
	.content .info {
		font-size: 0.25rem;
	}
	
	.content span {
		padding: 0.04rem 0.08rem;
		background: #5489f1;
		color: #fff;
		font-size: 0.16rem;
		border-radius: 0.03rem;
		margin-left: 0.1rem;
	}
	
	.region-popup {
		width: 100%;
	}
	
	.picker-toolbar {
		height: 0.6rem;
		background-color: #F2F3F4;
	}
	
	.mint-datetime-action {
		line-height: 0.6rem;
		color: #484B50;
		font-size: 0.21rem;
	}
</style>