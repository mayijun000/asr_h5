<template>
	<div>
		<headTop showBack="1" title="还款计划"></headTop>
		<div class="list">
			<h3>贷款申请概况</h3>
			<div class="list_cont">
				<ul>
					<li>
						<template v-for="bank in bankList">
							<img class="bankImg" v-if="bank.bankName == product.bankName" :src="'http://'+ bank.bankLogo" alt="">
						</template>
						<span class="productName">{{product.productName}}</span>
					</li>
					<li><i>银行授信额度:</i><span>{{credit.creditAmount}}元</span></li>
					<li><i>还款方式:</i><span>一次性还本付息</span></li>
					<li><i>利率:</i><span>{{loan.loanRateYear}}</span></li>
					<li><i>借款合同总额:</i><span>{{Number(loan.loanAmount).toFixed(2)}}元</span></li>
					<li><i>还款期限:</i><span>{{loan.loanTerm}}个月</span></li>
					<li>
						<i>剩余额度:</i>
						<span>
							<mt-progress class="progress" :value="loan.loanBalance/loan.loanAmount*100">
								<div slot="end" class="end">{{Number(loan.loanBalance/loan.loanAmount*100).toFixed(2)}}%</div>
							</mt-progress>
						</span>
					</li>
					<li>
						<p><i>关联卡账户:</i><span>{{loan.cardNo}}<img src="../../static/one.png"></span></p>
						<p><i>中关村银行二类账户:</i><span>{{loan.zgcbAccountNo}}<img src="../../static/zgcUser.png"></span></p>
					</li>
					<li><i style="width:25%;">借款合同:</i><span style="width:65%;">{{loan.loanContractNo}}<mt-button type="primary" @click.native="zgcbFileDownloadData">下载</mt-button></span></li>
				</ul>
			</div>
		</div>
		<div class="btn">
			<a href="javascript:void(0);" class="apply"  @click="openLoanPopup">申请借款</a>
		</div>
		<div class="list">
			<h3 @click="toPaymentBill">还款账单</h3>
		</div>
		<form id="hiddenForm" ref="hiddenForm" action="/api/open/zgcbFile/download">
			<input type="hidden" name="fileId" v-model="file.id">
		</form>
		<mt-popup v-model="loanPopup" style="width:80%;z-index: 999;">
			<div class="titlePopup"><span>立即提款</span><img @click="closeLoanPopup" src="../../static/cancel.png"></div>
			<div class="content">
				<div>提款金额(元):<input type="text" v-model="form.dueAmount"></div>
				<div>银行卡预留手机号:&nbsp;{{form.mobile}}</div>
				<div>手机验证码:&nbsp;&nbsp;<input type="text" v-model="form.code">
				<a href="javascript:void(0);" class="bank_btn" v-show="isCodeSend" @click="sendMobileCode">获取验证码</a>
				<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
				</div>
			</div>
			<div class="bottomPopup"><a href="javascript:void(0);" class="applyMin" @click="saveMore">立即提款</a></div>
		</mt-popup>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { findCreditByApplyId ,listDue,zgcbFileDownload,sendMobileCode,checkMobileCode,addDue} from "@/api/getData"
	import { Toast ,Popup} from 'mint-ui';
	import { getStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				bankList:[],
				product:{},
				applyId:"",
				productId:"",
				credit:{},
				loan:{},
				file:{
					id:null
				},
				loanPopup:false,//是否显示放款弹出框
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true,
				form:{
					dueAmount:"",
					code:"",
					id:"",
					mobile:"",
				}
			}
		},
		created() {
			this.bankList = JSON.parse(getStore("bankList"));
			this.product = JSON.parse(getStore("product"));
			this.applyId = this.$route.query.applyId;
			this.productId = this.$route.query.productId;
			this.findCreditByApplyId();
		},
		components: {
			headTop,
			Popup
		},
		methods: {
			//获取用户信息
			async findCreditByApplyId() {
				try {
					const res = await findCreditByApplyId({
						applyId: this.applyId
					});
					if(res.errorCode == "0") {
						this.credit = res.dataBody.credit;
						this.form.mobile = this.credit.cardMobile;
						let loan = res.dataBody.loan;
						this.form.id = loan.id;
						this.listDueData(loan.id);
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
			//获取还款计划
			async listDueData(loanId) {
				try {
					const res = await listDue({
						id: loanId
					});
					if(res.errorCode == "0") {
						this.loan = res.dataBody.loan;//合同详情
						if(res.dataBody.file != null){
							this.file.id = res.dataBody.file.id;//合同附件
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
			//下载合同
			async zgcbFileDownloadData(){
				if(this.file.id == null){
					Toast({
						message: "合同暂未生成,请稍后下载",
					});
				}else{
					this.$refs.hiddenForm.submit();
				}
			},
			openLoanPopup(){
				this.loanPopup = true;
			},
			closeLoanPopup(){
				this.loanPopup = false;
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
			//发送手机验证码
			async sendMobileCode() {
				try {
					const res = await sendMobileCode({
						mobile : this.form.mobile
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
						mobile : this.form.mobile,
						code:this.form.code,
					});
					if (res.errorCode == "0") {
                        this.addDueData();
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
			saveMore(){
				if(this.form.dueAmount == ""){
					Toast({
						message: '请输入放款金额',
					});
				}
				else if(!/^\d+$/.test(this.form.dueAmount)){
					Toast({
						message: '必须输入整数',
					});
				}else if(this.form.code == ""){
					Toast({
						message: '请输入手机验证码',
					});
				}else{
					this.checkMobileCodeData();
				}
			},
			//添加借据
			async addDueData(){
				try {
					const res = await addDue(this.form);
					if (res.errorCode == "0") {
                        Toast({
							message: '放款成功！请进入还款账单查看',
						});
                    }  else {
                    	Toast({
							message: res.errorString,
						});
						//throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//跳转到还款账单
			toPaymentBill(){
				this.$router.push({
					path: 'zgcPaymentBill',
					query:{
						loanId: this.loan.id,
					}
				});
			}
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
		width: 35%;
		color: #494c51;
		vertical-align: top;
	}
	.list_cont ul li p {
		font-size: 0.18rem;
		line-height: 0.4rem;
	}
	.list_cont ul li p img{
		height:0.15rem;
		width:0.15rem;
		padding-left: 0.1rem;
	}
	.list_cont ul li p i{
		vertical-align: middle;
	}
	.list_cont ul li p span{
		vertical-align: middle;
	}
	.list_cont ul li span {
		display: inline-block;
		color: #92979d;
		width: 55%;
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
	}
	.apply {
	    font-size: 0.24rem;
	    width: 90%;
	    display: block;
	    height: 0.6rem;
	    text-align: center;
	    line-height: 0.6rem;
	    color: #ffffff;
	    background-color: #5489f1;
	    border-radius: 0.03rem;
	    margin-top: 0.15rem;
	}
	.bank_btn{
		font-size: 0.18rem;
		color: #5489F1;
		padding: 0 0.1rem;
	}
	.closeBtn{
		font-size: 0.18rem;
		color: grey;
		padding: 0 0.1rem;
		display: -webkit-box;
	}
	.bankImg{
		width:0.3rem;
		height:0.3rem;
		vertical-align: middle;
		padding-left: 0.35rem;
	}
	.list_cont ul li .productName{
		font-size: 0.25rem;
		color: #000000;
	}
	.mint-button{
		font-size: 0.15rem;
		width:0.75rem;
		height:0.33rem;
		margin-left: 0.1rem;
	}
	.mint-button--primary {
	    color: #5489F1;
	    background-color: #fff;
	    border: 0.01rem solid #5489F1;
	}
	.titlePopup{
		height: 0.6rem;
	}
	.titlePopup span{
		font-size: 0.21rem;
		color: #000000;
		float: left;
		padding-left: 0.25rem;
		padding-top: 0.15rem;
	}
	.titlePopup img{
		height:0.225rem;
		width:0.225rem;
		float: right;
		padding-right: 0.25rem;
		padding-top: 0.2rem;
	}
	.content{
		border-top: 0.01rem solid #F2F3F4;
		border-bottom: 0.01rem solid #F2F3F4;
		font-size: 0.18rem;
		padding: 0.2rem 0;
	}
	.content div{
		line-height: 0.6rem;
		padding-left: 0.25rem;
	}
	.content input{
		border: 0.01rem solid #D8D8D8;
		border-radius: 0.03rem;
		height:0.3rem;
		margin-left: 0.1rem;
	}
	.bottomPopup{
		text-align: center;
		line-height:0.8rem;
	}
	.applyMin{
		background: #5489F1;
		border-radius: 0.03rem;
		font-size:0.18rem;
		color: #FFFFFF;
		padding:0.2rem 0.9rem;
		padding: 0.1rem 0.6rem;
    	position: relative;
    	top: -0.15rem;
	}
	.mint-popup{
		z-index: 999 !important;
	}
</style>