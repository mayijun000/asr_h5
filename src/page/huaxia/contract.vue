<template>
	<div>
		<headTop showBack="1" title="借款"></headTop>
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
					<dd>开户借款</dd>
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
		<div class="list" v-show="isShow == 1">
			<h3>填写借款信息</h3>		
			<form enctype="multipart/form-data">
				<div class="list_cont">
					<div class="form">
						<p>
							<label><span>*</span>申请人姓名:</label>
							<input type="text" placeholder="请输入申请人姓名" required='不能为空' :disabled="apply.contactPerson?true:false" v-model="apply.contactPerson">
						</p>
						<p>
							<label><span>*</span>申请人身份证号:</label>
							<input type="text" placeholder="请输入申请人身份证号" required='不能为空' :disabled="inputPageOne.idtfno?true:false" v-model="inputPageOne.idtfno">
						</p>
						<p>
							<label><span>*</span>申请人华夏二类户:</label>
							<input type="text" placeholder="请输入申请人华夏二类户" required='不能为空' v-model="secondeBankCardNo">
						</p>
						<p>
							<label><span>*</span>借款金额(万元）:</label>
							<input type="text" placeholder="请输入借款金额" required='不能为空' v-model="applyFrom.dueAmount">
						</p>
						<p class="other">
							<label><span>*</span>还款方式:</label>
							<input type="text" placeholder="请选择还款方式" required='不能为空' v-model="repayMode" @click="showModePicker" readonly="readonly">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="hxRepayMode" position="bottom" class="region-popup">  
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeModePicker">取消</span> 
									<span class="mint-datetime-action mint-datetime-confirm" @click="okModePicker">确定</span>
								</div>
	        					<mt-picker :slots="modeListSlots" valueKey="optionText" :visibleItemCount ="3" @change="onModeChange" :itemHeight="50"></mt-picker>  
	      					</mt-popup>
						</p>
						<p class="other">
							<label><span>*</span>还款期限:</label>
							<input type="text" placeholder="请选择还款期限" required='不能为空' v-model="loanTerm" @click="showTermPicker"  readonly="readonly">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="hxLoanTerm" position="bottom" class="region-popup">  
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeTermPicker">取消</span> 
									<span class="mint-datetime-action mint-datetime-confirm" @click="okTermPicker">确定</span>
								</div>
	        					<mt-picker :slots="termListSlots" valueKey="optionText" :visibleItemCount ="5" @change="onTermChange" :itemHeight="40"></mt-picker>  
	      					</mt-popup>
						</p>
						<p class="agree" id="agreeBox">
							<input type="checkbox" v-model="checkBox1" class="agree"></b>
							<span>我已阅读并同意<a href="javascript:;" @click="toAgreeHX" class="angents">《华夏银行借款合同》</a></span>
						</p>
						<p class="agree" id="agreeBox">
							<input type="checkbox" v-model="checkBox2" class="agree"></b>
							<span>我已阅读并同意<a href="javascript:;" @click="toAgreeAD" class="angents">《华夏银行送达地址确认书》</a></span>
						</p>
						<p>
							<label><span>*</span>您预留手机号:</label>
							<input type="text" placeholder="请输入手机号码" maxlength="11" style="width:35%;" :disabled="apply.contactMobile?true:false" v-model="apply.contactMobile">
							<a href="javascript:void(0);" class="btn" v-show="isCodeSend" @click="sendHxhzMobileVerifyCode">获取验证码</a>
							<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
						</p>
						<p>
							<label><span>*</span>短信验证码:</label>
							<input type="number" placeholder="请输入短信验证码" style="width:35%;" v-model="applyFrom.smsCode">
							<i class="cancel" @click="cancel">&nbsp;</i>
						</p>
					</div>
				</div>	
				<div class="btn">
					<a href="javascript:void(0);" class="apply" @click="submitApply">提交</a>
					<!--<input class="apply" type="submit" value="提交">-->
				</div>
			</form>
		</div>
		<div class="list" v-show="isShow == 2">
			<div class="content">
				<img src="../../static/success.png" />
				<div class="info">借款成功</div>
				<p>即将返回贷款详情页面</p>
				<div class="btn">
					<a href="javascript:void(0);" class="apply" @click="toMyLoan">返回贷款详情</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { getAllApplyByApply, sendHxhzMobileVerifyCode, applyLoan, getSecondAccount, getDictionaryByType } from "@/api/getData"
	import { Toast, Indicator, Picker, Popup  } from 'mint-ui';
	import { getStore, isPhoneVailable } from "@/config/mUtils"
	import { IdentityCodeValid } from "@/api/checkCard"
	import { luhmCheck } from "@/api/luhn"
	import { moment } from '@/api/moment'// 格式化时间 
	export default {
		data() {
			return {
				apply:{},
				applyFrom: {
					applyNo: "",
					dueAmount:"",
					loanTerm:"",
					repayMode:"",
					smsCode: "", //短信验证码
					smsCodeId :"",
				},
				repayMode:"",
				loanTerm:"",
				secondeBankCardNo:"",
				inputPageOne: {},
				checkBox1: false, //是否同意协议
				checkBox2: false, //是否同意协议
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true, 
	      		isShow: 1,
	      		hxRepayMode: false,
	      		modeInit: false,
	      		hxLoanTerm: false,
	      		termInit: false,
	      		modeListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        termListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
			}
		},
		created() {
			this.getAllApplyByApply();	
			this.getSecondAccount();
			this.getDictionaryByType('hxRepayMode');
			this.getDictionaryByType('hxLoanTerm');
		},
		components: {
			headTop,
			Picker,
			Popup 
		},
		methods: {
			//获取申请信息
			async getAllApplyByApply() {
				try {
					const res = await getAllApplyByApply({							
						applyNo: this.$route.query.applyNo
					});
					if(res.errorCode == "0") {
						let apply = res.dataBody.apply,
							inputPageOne = JSON.parse(apply.inputPageOne);
						this.apply = apply;
						this.inputPageOne = inputPageOne;
						this.applyFrom.applyNo = this.$route.query.applyNo;
						this.applyFrom.dueAmount = apply.primitLoanAmount;
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
			async getSecondAccount() {
				try {
					const res = await getSecondAccount({							
						applyNo: this.$route.query.applyNo
					});
					if(res.errorCode == "0") {
						let secondeBankCardNo = res.dataBody.secondeBankCardNo;
						this.secondeBankCardNo = secondeBankCardNo;
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
			async sendHxhzMobileVerifyCode() {
				let mobile = this.apply.contactMobile;
				let data = {
					applyNo: this.$route.query.applyNo,
					codeFor : "000001"
				}
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
						const res = await sendHxhzMobileVerifyCode(data);
						if(res.errorCode == "0") {
							let smsCodeid = data.dataBody.smsCodeId;
							this.applyFrom.smsCodeId = smsCodeid;
							Toast({
								message: '短信已发送，请查收！',
							});							
							this.countNum(data);
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
			//提交申请
			async applyLoan() {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				try {
					const res = await applyLoan(this.applyFrom);
					if(res.errorCode == "0") {
						let _this = this;
						this.isShow = 2;
						setTimeout(function() {
							_this.toMyLoan();
						}, 1000);
					} else {
						Indicator.close();
						Toast({
							message: res.errorString,
						});
					}
				} catch(err) {
					console.log('错误', err);
					Indicator.close();
					Toast({
						message: err.toString(),
					});
				}
			},
			//还款方式及期限
			async getDictionaryByType(type) {
				try {
					const res = await getDictionaryByType({
						dictionaryType : type
					});
					if(res.errorCode == "0") {
						let dictList = res.dataBody.dictList;
						if(type == 'hxRepayMode'){							
							this.modeListSlots[0].values = dictList;							
						}else if(type == 'hxLoanTerm'){
							this.termListSlots[0].values = dictList;	
						}
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
			//验证码倒计时
			countNum(data) {
				clearTimeout(this.timeoutCount);
				let _this = this;
				if(this.countDown > 0) {
					this.isCodeSend = false;
					this.timeoutCount = setTimeout(function() {
						_this.countNum(data);
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
				if(this.applyFrom.dueAmount == ""){
					Toast({
						message: '请输入借款金额',
					});
					return false;
				}else if(this.applyFrom.dueAmount>this.apply.primitLoanAmount){
					Toast({
						message: '借款金额不能大于授信额度',
					});
					return false;
				}else if(!/^(0\.[1-9]{0,2})$|^([1-9]+\d*\.*\d{0,2})$/.test(this.applyFrom.dueAmount)){					
					Toast({
						message: '借款金额请保留两位小数',
					});
					return false;
				}else if(this.applyFrom.loanTerm == ""){
					Toast({
						message: '请输入选择还款期限',
					});
					return false;
				}else if(this.applyFrom.repayMode == ""){
					Toast({
						message: '请输入选择还款方式',
					});
					return false;
				}else if(this.applyFrom.smsCode == ""){
					Toast({
						message: '请输入短信验证码',
					});
					return false;
				}
				return true;
			},
			//提交申请按钮
			submitApply() {
				if(this.checkBox1 && this.checkBox2) {
					if(this.checkData()) {
						this.applyLoan();
					}
				} else {
					Toast({
						message: '请确认并同意《华夏银行个人征信授权书》与《华夏银行送达地址确认书》',
					});
				}
			},			
			cancel (){
				this.code = "";
			},
		    //跳转授权协议
			toAgreeHX() {
				this.$router.push({
					path: 'hx_agreeContract',
					query: {
						applyNo: this.$route.query.applyNo,
					}
				});
			},
		    //跳转授权协议
			toAgreeAD() {
				this.$router.push({
					path: 'hx_agreeAddress',
					query: {
						applyNo: this.$route.query.applyNo,
					}
				});
			},
		    //返回我的贷款
			toMyLoan(){
				this.$router.push({
					path: 'myLoan'
				});
			},
			showModePicker(){
				this.hxRepayMode = true;  
			},
			closeModePicker(){  
		        this.hxRepayMode = false;  
		    }, 
		    okModePicker(type){
		    	this.closeModePicker();
		    },
		    onModeChange(picker, values){
		    	if(this.modeInit){
		    		this.repayMode = values[0].optionText
		    		this.applyFrom.repayMode = values[0].value;
		    	}else{
		    		this.modeInit = true;
		    	}
		    	
		    },
		    showTermPicker(){
				this.hxLoanTerm = true;  
			},
			closeTermPicker(){  
		        this.hxLoanTerm = false;  
		    }, 
		    okTermPicker(type){
		    	this.closeTermPicker();
		    },
		    onTermChange(picker, values){
		    	if(this.termInit){
		    		this.loanTerm = values[0].optionText
		    		this.applyFrom.loanTerm = values[0].value;
		    	}else{
		    		this.termInit = true;
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
	.list_conts{		
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
		vertical-align: top;
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
	.apply_loan{
		width: 48%;
		margin:0 0.1rem;
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
	.list_tip{
      	margin-top: 0.15rem;
		height: 0.45rem;
		background: #FFF7EA;
		display: flex;
		align-items: center;
	}
	.list_tip img{
      	padding: 0 0.15rem 0 0.3rem;
		width: 0.225rem;
	}
	.list_tip span{
		font-size:0.15rem;
		color: #FEB542;
	}
	.form p>input[type=radio]{
		width: 0.18rem;
		margin: 0 0.1rem;
	}
	.radio-tet{
		font-size: 0.2rem;
		display: block;
	}
	input:disabled{
		background-color:#FFF;
	}
	.bank_tip{
		color: #92969C;
		font-size: 0.18rem;		
		background-color:#FFF;
		padding:0 0 0.15rem 0.47rem;
	}
	.form p>input[type=file]{
		visibility: hidden;    /* 隐藏 */
   	 	padding:0;
    	width:0;
    	height: 0;
    	display:inline-block;
	}
	.img_box{
		 -webkit-box-orient: horizontal;
	}
	.form p>img.apply_btn{
		width: 2.25rem;
		height: 1.5rem;
		-webkit-box-flex: 1;
	}
	.form p>img.sf_1{
		margin-left: 0.3rem;	
	}
	.form p.bot_none{
		border-bottom: none;
		padding-bottom: 0;
	}
	.form p .img{
		margin: 0 auto;
		display: block;
	}
	.form p.het_none{
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
	.content  span{
		padding: 0.04rem 0.08rem;
		background: #5489f1;
		color: #fff;
		font-size: 0.16rem;
		border-radius: 0.03rem;
		margin-left: 0.1rem;
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