<template>
	<div>
		<headTop showBack="1" title="开立二类账户"></headTop>
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
		<div class="list" v-show="isShow == 1">
			<h3>填写开户信息</h3>		
			<form enctype="multipart/form-data">
				<div class="list_cont">
					<div class="form">
						<p>
							<label><span>&nbsp;</span>申请人姓名:</label>
							<input type="text" placeholder="请输入申请人姓名" required='不能为空' :disabled="userRealName?true:false" v-model="userRealName">
						</p>
						<p>
							<label><span>&nbsp;</span>申请人身份证号:</label>
							<input type="text" placeholder="请输入申请人身份证号" required='不能为空' :disabled="userIdno?true:false" v-model="userIdno">
						</p>
						<p>
							<label><span>*</span>经常居住地:</label>
							<input type="text" placeholder="请输入经常居住地" required='不能为空' v-model="apply.address">
						</p>
						<p>
							<label><span>*</span>身份证有效期至:</label>
							<input type="text" placeholder="请选择身份证有效期至" required='不能为空'  v-model="apply.expiry_date" @click="openPicker" readonly="readonly">
							<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" :visibleItemCount=5 month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>	
						</p>
						<p>
							<label><span>*</span>一类账户银行:</label>
							<input type="text" placeholder="请输入所属开户行" required='不能为空' :disabled="cardBankName?true:false" v-model="cardBankName">
						</p>
						<p>
							<label><span>*</span>一类账户卡号:</label>
							<input type="text" placeholder="请输入所属开户行" required='不能为空' :disabled="cardNo?true:false" v-model="cardNo">
						</p>
						<p>
							<label><span>*</span>您预留手机号:</label>
							<input type="text" placeholder="请输入手机号码" maxlength="11" style="width:35%;" :disabled="apply.cardMobile?true:false" v-model="apply.cardMobile">
							<a href="javascript:void(0);" class="btn" v-show="isCodeSend" @click="sendMobileCodeData">获取验证码</a>
							<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
						</p>
						<p>
							<label><span>*</span>短信验证码:</label>
							<input type="text" placeholder="请输入短信验证码" style="width:35%;" v-model="apply.bank_auth_code">
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
		<!-- <div class="list" v-show="isShow == 2">
			<div class="content">
				<img src="../../static/success.png" />
				<div class="info">开户成功</div>
				<p style="margin-top: 0.2rem;">您的华夏银行二类账户已经开立成功，账号为:</p>
				<p v-if="isHidden">{{bankCode}}<span @click="isHidden=false">隐藏</span></p>
				<p v-if="!isHidden">{{bankCodeYz}}<span @click="isHidden=true">明文显示</span></p>
				<p>您现在可以去借款了</p>
				<div class="btn">
					<a href="javascript:void(0);" class="apply apply_loan" @click="toContract">立即借款</a>
					<a href="javascript:void(0);" class="apply apply_loan" @click="toMyLoan">返回我的贷款</a>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { findCreditByApplyId, sendMobileCode, checkMobileCode, openAccount } from "@/api/getData"
	import { Toast, Indicator, DatetimePicker, Picker, Popup } from 'mint-ui';
	import { getStore, isPhoneVailable } from "@/config/mUtils"
	import { IdentityCodeValid } from "@/api/checkCard"
	import { moment } from '@/api/moment'// 格式化时间
	import { luhmCheck } from "@/api/luhn"
	export default {
		data() {
			return {
				apply: {
					creditId : "",
                	applyId : "",
                	address : "",
                	expiry_date : "",
                	cardMobile : "",
                	verify_no : "",
                	bank_auth_code : "",
				},
				userRealName:"",
				userIdno:"",
				cardBankName:"",
				cardNo:"",
				code: "", //短信验证码
				smsCodeId :"",
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true, 
				isShow:1,
				isHidden:false,
				bankCode :"",
				bankCodeYz :"",
      			startDate: new Date(),
      			endDate: new Date('2100-1-1'),

			}
		},
		created() {
			this.apply.applyId = this.$route.query.applyId;
			this.findCreditByApplyId();	
		},
		components: {
			headTop,
		},
		methods: {
			//获取申请信息
			async findCreditByApplyId() {
				try {
					const res = await findCreditByApplyId({							
						applyId: this.apply.applyId
					});
					if(res.errorCode == "0") {
						let apply = res.dataBody.credit;
						this.apply.creditId = apply.id;
	                	this.apply.cardMobile = apply.cardMobile;
	                	this.userRealName = apply.userRealName;
	                	this.userIdno = apply.userIdno;
						this.cardBankName = apply.cardBankName;
						this.cardNo = apply.cardNo;
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
			async sendMobileCodeData() {
				let mobile = this.apply.cardMobile;
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
			//检验短信验证码
			async checkMobileCodeData() {
				Indicator.open({
				  text: '提交中...',
				  spinnerType: 'fading-circle'
				});
				try {
					const res = await checkMobileCode({
						mobile: this.apply.cardMobile,
						code: this.apply.bank_auth_code
					});
					if(res.errorCode == "0") {
						this.Account();
					} else if(res.errorCode == "3006") {
						Indicator.close();
						Toast({
							message: '验证码不正确，请输入正确的验证码！',
						});
					} else {
						Indicator.close();
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
			async Account() {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				try {
					const res = await openAccount(this.apply);
					if(res.errorCode == "0") {
						Indicator.open({
						  text: '提交成功，即将前往借款页面',
						  spinnerType: 'fading-circle'
						});
						let _this = this;
						setTimeout(function(){
							_this.toContract()
						},3000)
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
				if(this.apply.address == "") {
					Toast({
						message: '请输入经常居住地',
					});
					return false;
				} else if(!/^(?!\d+$)([\u4e00-\u9fa5]|[\w]){1,150}$/.test(this.apply.address)) {
					Toast({
						message: '请输入经常居住地不允许输入纯数字或标点符号,长度最多150',
					});
					return false;
				}else if(this.apply.expiry_date == "") {
					Toast({
						message: '请选择身份证有效期至',
					});
					return false;
				}else if(this.apply.bank_auth_code == "") {
					Toast({
						message: '请输入短信验证码',
					});
					return false;
				}
				return true;
			},
			//提交申请按钮
			submitApply() {
				if(this.checkData()) {
					this.checkMobileCodeData();
				}
			},	
			openPicker () {
				this.$refs.picker.open()
		    },
		    handleConfirm (data) {		    	
		      	let date = moment(data).format('YYYYMMDD');
		      	this.apply.expiry_date = date;
		    },		
			cancel (){
				this.code = "";
			},
			//借款
			toContract(){
				this.$router.push({
					path: 'zgc_contract',
					query: {
						applyId: this.$route.query.applyId,
					}
				});
			},
			toMyLoan(){
				this.$router.push({
					path: 'myLoan'
				});
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
</style>