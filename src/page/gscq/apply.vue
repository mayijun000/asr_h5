<template>
	<div>
		<headTop showBack="1" title="贷款申请"></headTop>
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
							<span class="line"></span>
								<span class="circular"></span>
								<span class="line"></span>
							</dt>
					<dd>平台初审</dd>
				</dl>
				<dl>
					<dt>
							<span class="line"></span>
								<span class="circular"></span>
								<span class="line"></span>
							</dt>
					<dd>银行授信</dd>
				</dl>
				<dl>
					<dt>
						<span class="line"></span>
						<span class="circular"></span>
					</dt>
					<dd>贷款完成</dd>
				</dl>
			</div>
		</div>
		<div class="list">
			<h3>产品信息</h3>
			<div class="bank_loan">
				<b>{{product.productName}}</b>
				<div class="bank_name">
					<div class="bank_title">
						<template v-for="bank in bankList">
							<img v-if="bank.bankName == product.bankName" :src="'http://'+ bank.bankLogo" alt="">
						</template>

						<span>{{product.bankName}}</span>
					</div>
					<div class="bank_credit">
						<span class="blue">{{product.guaranteeTypeName}}</span>
						<span class="green">最快今日到账</span>
					</div>
				</div>
				<div style="clear:both;"></div>
				<div class="bank_meg">
					<div><b>{{product.maxLoanAmount}}万</b><span>最高额度</span></div>
					<div><b>{{product.rate}}</b><span>利率</span></div>
					<div><b>{{product.repaymentTerm}}个月</b><span>授信期限</span></div>
				</div>
			</div>
		</div>
		<div class="list">
			<h3>申请信息</h3>
			<div class="list_cont">
				<div class="form">
					<p>
						<label><span>*</span>公司名称:</label>
						<input type="text" v-model="applyFrom.etrName" placeholder="请输入公司名称" readonly="readonly">
					</p>
					<p>
						<label><span>*</span>纳税人识别号:</label>
						<input type="text" placeholder="请输入纳税人识别号" readonly="readonly" v-model="applyFrom.nsrsbh">
					</p>
					<p class="other">
						<label><span>*</span>申请人类型:</label>
						<input type="text" placeholder="请输入联系人" v-model="applyPersonType.name">
						<i class="right">&nbsp;</i>
					</p>
					<p>
						<label><span>*</span>申请人姓名:</label>
						<input type="text" placeholder="请输入申请人姓名" required='不能为空' v-model="applyFrom.contactPerson">
					</p>
					<p>
						<label><span>*</span>申请人身份证号:</label>
						<input type="text" placeholder="请输入申请人身份证号" required='不能为空' v-model="applyFrom.idtfno">
					</p>
					<p class="other">
						<label for=""><span>*</span>申请贷款额度:</label>
						<input type="number" placeholder="请输入贷款额度" required='不能为空' v-model="applyFrom.loanAmount">
						<label for="" class="other_lab">万元</label>
					</p>
					<p class="other">
						<label for=""><span>*</span>申请贷款期限:</label>
						<input type="number" placeholder="请输入贷款期限" required='不能为空' v-model="applyFrom.loanTerm">
						<label for="" class="other_lab">月</label>
					</p>
					<p class="other">
						<label><span>*</span>办理支行:</label>
						<input type="text" placeholder="请选择办理支行" v-model="bankZH" @click="showBankPicker">
						<i class="right">&nbsp;</i>
						<mt-popup v-model="bank" position="bottom" class="region-popup">  
							<div class="picker-toolbar">
								<span class="mint-datetime-action mint-datetime-cancel" @click="closeBankPicker">取消</span> 
								<span class="mint-datetime-action mint-datetime-confirm" @click="okBankPicker">确定</span>
							</div>
        					<mt-picker :slots="bankListSlots" valueKey="value" :visibleItemCount ="3" @change="onBankChange" :itemHeight="50"></mt-picker>  
	      				</mt-popup>
					</p>
					<p>
						<label><span>*</span>营销推荐代码:</label>
						<input type="text" placeholder="请输入营销推荐代码" required='不能为空' v-model="applyFrom.mcode">
					</p>
				</div>
			</div>
			<h3>申请人实名认证</h3>
			<div class="list_cont">
				<div class="form">
					<p>
						<label><span>*</span>申请人银行卡号:</label>
						<input type="text" v-model="applyFrom.openBankNo" placeholder="请输入申请人银行卡号">
					</p>
					<p class="info">提示：建议优先绑定工、农、中、建等大型银行银行卡</p>
					<p>
						<label><span>*</span>所属开户行:</label>
						<input type="text" placeholder="请输入所属开户行" required='不能为空' v-model="applyFrom.openBankName">
					</p>
					<p>
						<label><span>*</span>申请人手机号码:</label>
						<input type="text" placeholder="请输入手机号码" maxlength="11" style="width:35%;" v-model="applyFrom.contactMobile">
						<a href="javascript:void(0);" class="btn" v-show="isCodeSend" @click="sendMobileCodeData">获取验证码</a>
						<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
					</p>
					<p class="info">提示：手机号需与银行卡预留手机号一致</p>
					<p>
						<label><span>*</span>短信验证码:</label>
						<input type="text" placeholder="请输入短信验证码" style="width:35%;" v-model="code">
						<i class="cancel">&nbsp;</i>
					</p>
				</div>
			</div>
			<div class="agree" id="agreeBox">
				<input type="checkbox" v-model="checkBox" class="agree"></b>
				<span>我阅读并同意<a href="javascript:;" @click="toAgree" class="angents">《企业信用承诺联盟数据授权协议》</a></span>
			</div>
		</div>
		<div class="btn">
			<a href="javascript:void(0);" class="apply" @click="submitApply">提交</a>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { sendMobileCode, checkMobileCode, checkRealName, submitApplyStepone, getAllZH} from "@/api/getData"
	import { Toast, Indicator } from 'mint-ui';
	import { getStore, isPhoneVailable } from "@/config/mUtils"
	import { IdentityCodeValid } from "@/api/checkCard"
	import { luhmCheck } from "@/api/luhn"
	export default {
		data() {
			return {
				bankList: [],
				product: {},
				selectedEtrMap: {},
				applyPersonType: {
					id: "fddbr",
					name: "法定代表人"
				},
				bankZH: "",
				applyFrom: {
					contactPerson: "",
					idtfno: "",
					loanAmount: "",
					loanTerm: "",
					mcode: 111111,
					openBankNo: "",
					openBankName: "",
					contactMobile: "",
					loanType: "",
					etrName: "",
					nsrsbh: "",
					cqzh:"",
				},
				code: "", //短信验证码
				checkBox: false, //是否同意协议
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true,
				location_code: "",
				bankInit: false,
	      		bank: false,
	      		bankListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
			}
		},
		created() {
			this.bankList = JSON.parse(getStore("bankList"));
			this.product = JSON.parse(getStore("product"));
			this.location_code = getStore("location_code");
			this.selectedEtrMap = JSON.parse(getStore("selectedEtrMap"));
			this.applyFrom.etrName = this.selectedEtrMap.corp_name;
			this.applyFrom.nsrsbh = this.selectedEtrMap.tax_code;
			this.applyFrom.loanType = this.applyPersonType.id;
			this.getAllZH();
		},
		components: {
			headTop,
		},
		methods: {
			//发送手机验证码
			async sendMobileCodeData() {
				let mobile = this.applyFrom.contactMobile;
				if(mobile == "") {
					Toast({
						message: '请填写手机号码',
					});
				} else if(isPhoneVailable(mobile)) {
					Toast({
						message: '请填写正确的手机号码',
					});
				} else {
					try {
						const res = await sendMobileCode({
							mobile: mobile
						});
						if(res.errorCode == "0") {
							Toast({
								message: '短信已发送，请查收！',
							});
							this.countNum(mobile);
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
				}

			},
			async getAllZH() {
				try {
					const res = await getAllZH();
					if(res.errorCode == "0") {
						let allZH = res.dataBody.allZH;
						this.bankListSlots[0].values = allZH;
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
			//检验短信验证码
			async checkMobileCodeData() {
				try {
					const res = await checkMobileCode({
						mobile: this.applyFrom.contactMobile,
						code: this.code
					});
					if(res.errorCode == "0") {
						this.checkRealNameData();
					} else if(res.errorCode == "3006") {
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
			//验证四要素
			async checkRealNameData() {
				try {
					const res = await checkRealName({
						name: this.applyFrom.contactPerson,
						idtno: this.applyFrom.idtfno,
						nsrsbh: this.applyFrom.nsrsbh,
						etrName: this.applyFrom.etrName,
						phoneNum: this.applyFrom.contactMobile,
						accNo: this.applyFrom.openBankNo
					});
					if(res.errorCode == "0") {
						var qyfrCheck = res.dataBody.qyfrCheck;
						if(qyfrCheck.checkStatus == "true") {
							this.submitApplySteponeData();
						} else if(qyfrCheck.checkStatus == "false") {
							Toast({
								message: '银行卡号、手机号、身份证号验证错误',
							});
						} else {
							Toast({
								message: qyfrCheck.checkMsg,
							});
						}
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
			//提交申请
			async submitApplySteponeData() {
				let data = {};
				let dataNx = {};
				dataNx.loanType = this.applyFrom.loanType;
				dataNx.idtfno = this.applyFrom.idtfno;
				dataNx.cqzh = this.applyFrom.cqzh;
				dataNx.openBankNo = this.applyFrom.openBankNo;
				dataNx.openBankName = this.applyFrom.openBankName;
				data.productId = this.product.id;
				data.accessTemplateId = this.product.accessTemplateId;
				data.etrName = this.applyFrom.etrName;
				data.nsrsbh = this.applyFrom.nsrsbh;
				data.contactPerson = this.applyFrom.contactPerson;
				data.contactMobile = this.applyFrom.contactMobile;
				data.loanAmount = this.applyFrom.loanAmount;
				data.loanTerm = this.applyFrom.loanTerm;
				data.bankName = this.product.bankName;
				data.bankCode = this.product.bankCode;
				data.areaCode = this.location_code,
				data.areaName = this.selectedEtrMap.corp_location_name,
				data.mcode = this.applyFrom.mcode,
				data.inputPageOne = JSON.stringify(dataNx);
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				try {
					const res = await submitApplyStepone(data);
					if(res.errorCode == "0") {
						Indicator.close();
						var applyNo = res.dataBody.applyNo;
						this.toApplySuccess(this.product.id,applyNo);
					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Indicator.close();
					Toast({
						message: err.toString(),
					});
				}
			},
			//跳转授权协议
			toAgree() {
				this.$router.push({
					path: 'agreement'
				});
			},
			//跳转成功
			toApplySuccess(productId,applyNo) {
				this.$router.push({
					path: 'applySuccess',
					query:{
						productId:productId,
						applyNo:applyNo
					},
				});
			},
			//验证码倒计时
			countNum(mobile) {
				clearTimeout(this.timeoutCount);
				let _this = this;
				if(this.countDown > 0) {
					this.isCodeSend = false;
					this.timeoutCount = setTimeout(function() {
						_this.countNum(mobile);
					}, 1000);
					this.countDown = this.countDown - 1;
				} else {
					this.isCodeSend = true;
					this.countDown = 60;
				}
			},
			//验证数据
			checkData() {
				let applyFrom = this.applyFrom;
				if(applyFrom.etrName == "") {
					Toast({
						message: '请输入企业名称',
					});
					return false;
				} else if(applyFrom.nsrsbh == "") {
					Toast({
						message: '请输入纳税人识别号',
					});
					return false;
				} else if(applyFrom.loanType == "") {
					Toast({
						message: '请选择申请人类型',
					});
					return false;
				} else if(applyFrom.contactPerson == "") {
					Toast({
						message: '请选择申请人姓名',
					});
					return false;
				} else if(applyFrom.idtfno == "") {
					Toast({
						message: '请选择申请人身份证号',
					});
					return false;
				} else if(!IdentityCodeValid(applyFrom.idtfno)) {
					Toast({
						message: '请输入正确的身份证号',
					});
					return false;
				} else if(applyFrom.loanAmount == "") {
					Toast({
						message: '请输入贷款额度',
					});
					return false;
				} else if(applyFrom.loanTerm == "") {
					Toast({
						message: '请输入贷款期限',
					});
					return false;
				} else if(applyFrom.cqzh == "") {
					Toast({
						message: '请选择办理支行',
					});
					return false;
				} else if(applyFrom.mcode == "") {
					Toast({
						message: '请输入营销推荐代码',
					});
					return false;
				} else if(applyFrom.openBankNo == "") {
					Toast({
						message: '请输入银行卡号',
					});
					return false;
				} else if(!luhmCheck(applyFrom.openBankNo)) {
					Toast({
						message: '请输入正确的银行卡号',
					});
					return false;
				} else if(applyFrom.openBankName == "") {
					Toast({
						message: '请输入所属开户行',
					});
					return false;
				} else if(applyFrom.contactMobile == "") {
					Toast({
						message: '请输入申请人手机号',
					});
					return false;
				} else if(this.code == "") {
					Toast({
						message: '请输入短信验证码',
					});
					return false;
				}
				return true;
			},
			//提交申请按钮
			submitApply() {
				if(this.checkBox) {
					if(this.checkData()) {
						this.checkMobileCodeData();
					}
				} else {
					Toast({
						message: '请确认并同意《企业信用承诺联盟数据授权协议》',
					});
				}
			},
			showBankPicker(){
				this.bank = true;  
			},
			closeBankPicker(){  
		        this.bank = false;  
		    }, 
		    okBankPicker(type){
		    	this.closeBankPicker();
		    },
		    onBankChange(picker, values){
		    	if(this.bankInit){
		    		this.bankZH = values[0];
		    		this.applyFrom.cqzh = values[0];
		    	}else{
		    		this.bankInit = true;
		    	}
		    	
		    },
		}
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
	
	.list h3 {
		background: #fff;
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0 0.47rem;
		position: relative;
		border-bottom: #f2f3f4 solid 0.015rem;
		font-weight: bold;
		font-size: 0.21rem;
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
	.list_cont{
		margin-bottom: 0.2rem;
		background: #fff;
	}
	.list_cont ul {
		padding: 0 0.15rem;
		border-bottom: #f2f3f5 solid 0.015rem;
		font-size: 0.21rem;
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
		padding-left: 0.3rem;
		display: inline-block;
		width: 25%;
		color: #494c51;
	}
	
	.list_cont ul li span {
		display: inline-block;
		color: #92979d;
		width: 65%;
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
	
	.content {
		width: 100%;
		font-size: 0.15rem;
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
	
	.form p {
		padding: 0.2rem 0;
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
		padding-left: 0.65rem;
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
		width: 35%;
	}
	
	.agree {
		padding: 0.2rem 0.3rem;
		height: 0.2rem;
		position: relative;
		background: #fff;
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
	
	.region-popup{  
    	width: 100%;  
  	} 
  	.picker-toolbar{
	    height:0.6rem;
	    background-color: #F2F3F4;
	}
	.mint-datetime-action{
		line-height: 0.6rem;
		color:#484B50;
		font-size: 0.21rem;
	}
</style>