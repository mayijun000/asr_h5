<template>
	<div>
		<headTop showBack="1" title="贷款详情"></headTop>
		<div class="list">
			<h3>申请详细信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>产品名称:</i><span>{{apply.productName}}</span></li>
					<li><i>所属银行:</i><span>{{apply.bankName}}</span></li>
					<li><i>申请状态:</i>
						<span>{{apply.statusName}}</span>
						<span v-if="apply.statusCode == 'YSX'" class="colorSpan">授信额度:{{apply.primitLoanAmount}}元</span>
						<span v-if="apply.statusCode == 'YSX'" class="colorSpan">授信有效期:{{limitDueDate}}</span>
					</li>
					<li v-if="apply.statusCode == 'YSX'"><span class="info">您尚未在华夏银行开立二类账户，银行放款和您还款，均需要在华夏银行二类账户中完成。</span></li>
				</ul>
			</div>
		</div>
		<div class="list" v-if="apply.statusCode == 'YHSQ' || apply.statusCode == 'CSZ' || (apply.statusCode == 'CSTG' && apply.inputPageTwo)">
			<h3>产品详细信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>年利率:</i><span>{{product.rate }}</span></li>
					<li><i>最高金额:</i><span>{{product.maxLoanAmount }}万</span></li>
					<li><i>最长期限:</i><span>{{product.repaymentTerm }}个月</span></li>
					<li><i>还款方式:</i><span>{{product.repaymentName }}</span></li>
					<li><i>担保方式:</i><span>{{product.guaranteeTypeName }}</span></li>
					<li><i>开通地区:</i><span>{{product.remark }}</span></li>
					<li><i>发布时间:</i><span>{{product.time }}</span></li>
				</ul>
			</div>
		</div>
		<div class="list" v-if="apply.statusCode == 'YHSQ' || apply.statusCode == 'CSZ' || (apply.statusCode == 'CSTG' && apply.inputPageTwo)">
			<h3>申请信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>业务序列号:</i><span>{{apply.applyNo }}</span></li>
					<li><i>贷款金额:</i><span>{{apply.loanAmount }}万</span></li>
					<li><i>贷款期限:</i><span>{{apply.loanTerm}}个月</span></li>
					<li><i>企业名称:</i><span>{{apply.etrName }}</span></li>
					<li><i>税号:</i><span>{{apply.nsrsbh }}</span></li>
					<li><i>受理银行:</i><span>{{apply.bankName }}</span></li>
					<li><i>提交时间:</i><span>{{apply.time }}</span></li>
				</ul>
			</div>
		</div>
		<div class="list" v-if="apply.statusCode == 'YHSQ' || apply.statusCode == 'CSZ' || (apply.statusCode == 'CSTG' && apply.inputPageTwo)">
			<h3>申请人资料</h3>
			<div class="list_cont">
				<ul>
					<li><i>申请人:</i><span>{{apply.contactPerson }}</span></li>
					<li><i>手机号:</i><span>{{apply.contactMobile }}</span></li>
					<li><i>身份证:</i><span>{{inputPageOne.idtfno }}</span></li>
					<template v-for="item in applyPerson">
						<li v-if="item.value == inputPageOne.loanType"><i>申请人类型:</i><span>{{item.optionText}}</span></li>
					</template>
					<li><i>借款人账号:</i><span>{{inputPageOne.openBankNo }}</span></li>
					<li><i>账户银行:</i><span>{{inputPageOne.openBankName }}</span></li>
				</ul>
			</div>
		</div>
		<div class="list" v-if="secondeBankCardNo != ''">
			<h3>账户信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>华夏二类户:</i><span>{{secondeBankCardNo }}</span></li>
					<li><i>一类卡卡号:</i><span>{{inputPageOne.openBankNo }}</span></li>
				</ul>
			</div>
		</div>
		<template v-if="finalDueResultList.length > 0 && secondeBankCardNo != ''">
			<div class="list" v-for="item in finalDueResultList">
				<h3>还款记录</h3>
				<div class="list_cont">
					<ul>
						<li class="pay"><i>借款时间:</i><span>{{item.money}}</span>
							<i class="status" v-if="item.dueStatus == 123">使用中</i>
							<i class="status1" v-if="item.dueStatus != 123">已结清</i>
						</li>
						<li class="pay"><i>借款金额:</i><span>{{item.dueStartDate}}</span></li>
						<li class="pay"><i>还款期限:</i><span>{{item.loanTerm}}个月</span></li>
						<li class="pay"><i>还款方式:</i><span>{{item.repayMode}}</span></li>
					</ul>
				</div>
				<div class="bank_btn">
					<a href="javascript:void(0);" @click="payPlan(item.dueNo)" v-if="item.dueStatus == 123">查看还款计划</a>
					<a href="javascript:void(0);" @click="payRecord(item.dueNo)">查看还款记录</a>
					<a href="javascript:void(0);" @click="">查看借款合同</a>
					<a href="javascript:void(0);" style="color:#5489F1;border: 0.01rem solid #5489F1;" @click="tqjpbtn(item.dueNo)" v-if="item.dueStatus == 123">提前结清</a>
				</div>
			</div>
		</template>
		<div class="list" v-if="finalDueResultList.length == 0 && secondeBankCardNo != ''">
			<h3>还款记录</h3>
			<div class="list_cont">
				<ul>
					<li><i></i><span>无借款记录</span></li>
				</ul>
			</div>
		</div>
		<div class="btn">
			<a href="javascript:void(0);" class="apply" v-if="apply.statusCode == 'CSTG' && !apply.inputPageTwo" @click="toPerfectInfo">立即完善资料</a>
			<a href="javascript:void(0);" class="apply" v-if="isSecondeBankCardNo" @click="toOpenAccount">立即开立华夏银行二类账户</a>
			<a href="javascript:void(0);" class="apply" v-if="secondeBankCardNo != ''" @click="toContract">我要借款</a>
		</div>
		
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { showProductById,getAllApplyByApply,applyPerson ,getSecondAccount,getLimitDueDate,getLoanList, hxbsxQrCode, hxQrCodeVerify } from "@/api/getData"
	import { Toast,MessageBox } from 'mint-ui';
	import { getLocalTime,formatMoney } from "@/config/mUtils"
	export default {
		data() {
			return {
				applyNo:"",
				productId:"",
				apply:{},
				product:{},
				inputPageOne:{},
				applyPerson:[],
				status:"",
				limitDueDate:"",//授信期限
				secondeBankCardNo:"",//二类账户
				isSecondeBankCardNo:false,
				finalDueResultList:[],//还款记录
				countNum: 0,
				timeCode: null,
			}
		},
		activated() {
			this.applyNo = this.$route.query.applyNo;
			this.productId = this.$route.query.productId;
			this.applyPersonData();
			this.getAllApplyByApplyData();
			this.showProductByIdData(this.productId);
		},
		components: {
			headTop,
		},
		methods: {
			//贷款详情
			async getAllApplyByApplyData(){
				try {
					const res = await getAllApplyByApply({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						this.apply = res.dataBody.apply;
						this.apply.time = getLocalTime(this.apply.gmtCreate);
						if(this.apply.statusCode == "YHSQ" || this.apply.statusCode == "CSZ"){
							this.apply.statusName = "爱税融融资平台审核中，授信结果会通过短信通知您。";
						}else if(this.apply.statusCode == "CSWTG"){
							this.apply.statusName = "爱税融融资平台初审未通过。";
						}else if(this.apply.statusCode == "CSTG" && !this.apply.inputPageTwo){
							this.apply.statusName = "爱税融融资平台初审通过，请补充资料，提交到华夏银行，完成授信。";
						}else if(this.apply.statusCode == "CSTG" && this.apply.inputPageTwo){
							this.apply.statusName = "华夏银行正在审核您的贷款申请，授信结果会通过短信通知您。";
						}else if(this.apply.statusCode == "WSX"){							
							this.apply.statusName = "华夏银行未授信。";
						}else if(this.apply.statusCode == "YSX"){
							if(!this.apply.primitLoanAmount){
								this.apply.primitLoanAmount = "--";
							}
							if(!this.apply.permitLoanTerm){
								this.apply.permitLoanTerm = "--";
							}
							this.getSecondAccountData();//二类账户
							this.getLimitDueDateData();//授信期限						
						}
						this.inputPageOne = JSON.parse(this.apply.inputPageOne);
						console.log(this.inputPageOne )
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
			//查询产品详情
			async showProductByIdData(id) {
				try {
					const res = await showProductById({
						id: id
					});
					if(res.errorCode == 0) {
						this.product = res.dataBody.product;
						this.product.time = getLocalTime(this.product.gmtCreate);
						if(this.product.productRemark && JSON.parse(this.product.productRemark)) {
							let productRemark = JSON.parse(this.product.productRemark);
							this.product.remark = productRemark.Remark;
						} else {
							this.product.remark = "--";
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
			//查询申请人类型选项
			async applyPersonData() {
				try {
					const res = await applyPerson();
					if(res.errorCode == 0) {
						this.applyPerson = res.dataBody.applyPerson;
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
			//查询获取二类账户
			async getSecondAccountData() {
				try {
					const res = await getSecondAccount({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						this.secondeBankCardNo = res.dataBody.secondeBankCardNo;
						this.getLoanListData();//查询借款记录
					} else if(res.errorString == "没有对应的二类卡号"){
						this.isSecondeBankCardNo = true;
					}else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//查询授信期限
			async getLimitDueDateData() {
				try {
					const res = await getLimitDueDate({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						this.limitDueDate = res.dataBody.limitDueDate;
						this.apply.statusName = "华夏银行已授信";
					} else {
						this.apply.statusName = "--";
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//查询借款记录
			async getLoanListData() {
				try {
					const res = await getLoanList({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						this.finalDueResultList = res.dataBody.finalDueResultList;
						this.finalDueResultList.forEach(function(item){
							item.money = formatMoney(item.dueAmount);
						});
					}else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//返回我的贷款
			toMyLoan() {
				this.$router.push({
					path: 'myLoan'
				});
			},
			//获取token打开人脸识别
			async hxbsxQrCode() {
				let _this = this;
				try {
					const res = await hxbsxQrCode({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						let retData = res.dataBody.retData;
						retData = JSON.parse(retData);
						NativeBridge.faceRecognition(retData.token);
						this.timeCode = setInterval(function() {
							_this.hxQrCodeVerifyData();
						}, 5000);
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//识别状态
			async hxQrCodeVerifyData() {
				let _this = this;
				if(this.countNum > 12) {
					clearInterval(this.timeCode);
					MessageBox.confirm('认证超时，是否重新认证！').then(action => {
						_this.hxbsxQrCodeData();
					}, action => {
						_this.toMyLoan();
					});
				} else {
					try {
						const res = await hxQrCodeVerify({
							applyNo: this.applyNo
						});
						if(res.errorCode == 0) {
							var retry = res.dataBody.retry;
							if(retry == "0") {
								this.$router.push({
									path: 'hx_perfectInfo',
									query: {
										productId: _this.productId,
										applyNo: _this.applyNo,
									}
								});
							} else {
								this.countNum = this.countNum + 1;
							}
						} else {
							Toast({
								message: res.msg,
							});
						}
					} catch(err) {
						console.log('错误', err);
						Toast({
							message: err.toString(),
						});
					}
				}
			},
			//资料补充页面
			toPerfectInfo() {
				this.hxbsxQrCode();
			},
			//跳转到提前结清试算页面
			tqjpbtn(dueNo){
				this.$router.push({
					path: 'myLhx_settleoan',
					query:{
						dueNo:dueNo,
						applyNo:this.applyNo
					},
				});
			},
			//跳转到还款计划
			payPlan(dueNo){
				this.$router.push({
					path: 'hx_project',
					query:{
						dueNo:dueNo,
						applyNo:this.applyNo
					},
				});
			},
			//跳转还款记录
			payRecord(dueNo){
				this.$router.push({
					path: 'hx_record',
					query:{
						dueNo:dueNo,
						applyNo:this.applyNo
					},
				});
			},
			//跳转二类账户
			toOpenAccount(){
				this.$router.push({
					path: 'hx_openAccount',
					query: {
						productId: this.productId,
						applyNo: this.applyNo,
					}
				});
			},
			//借款
			toContract(){
				this.$router.push({
					path: 'hx_Contract',
					query: {
						applyNo: this.applyNo,
					}
				});
			},
		}
	}
</script>

<style scoped>
	.list {
		width: 100%;
		margin-top: 0.15rem;
		background: #fff;
	}
	
	.list h3 {
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
	
	.list_cont ul {
		padding: 0 0.15rem;
		border-bottom: #f2f3f5 solid 0.015rem;
		font-size: 0.21rem;
	}
	.list_cont .info{
		font-size: 0.18rem;
		color:#4A4A4A;
		width: auto;
		padding: 0 0.3rem;
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
		vertical-align: top;
	}
	
	.list_cont ul li span {
		display: inline-block;
		color: #92979d;
		width: 65%;
	}
	.list_cont ul li .colorSpan{
		color:#70C8CE;
		padding-left:1.63rem;
		padding-top:0.2rem;
	}
	.list_cont ul .pay{
		padding: 0.1rem 0;
		border-bottom:0;
		font-size: 0.18rem;
	}
	.list_cont ul .pay i{
		width:20%;
	}
	.list_cont ul .pay span{
		font-size: 0.18rem;
		color: #484B50;
		width:50%;
	}
	.list_cont ul .status{
		font-size: 0.135rem;
		color: #64A2DF;
		background-color: #E3F4FF;
		text-align: center;
		padding:0.05rem 0;
		padding-left: 0;
	}
	.list_cont ul .status1{
		font-size: 0.135rem;
		color: #fff;
		background-color: #DDDDDD;
		text-align: center;
		padding:0.05rem 0;
		padding-left: 0;
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
	.bank_btn{
		background-color: #fff;
		padding-right: 0.1rem;
		line-height: 0.375rem;
		display: -webkit-box;
		-webkit-box-pack: end;
	}
	.bank_btn a{
		font-size: 0.15rem;
		color: #484B50;
		border: 0.01rem solid #92969C;
		border-radius: 0.5rem;
		margin: 0.2rem 0.05rem;
		display: block;
		padding: 0 0.1rem;
		text-align: center;
	}
	.bank_btn a:active {
	    background-color: #484B50;
	    opacity: 0.5;
	    color:#fff;
	}
</style>