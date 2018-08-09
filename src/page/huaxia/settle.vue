<template>
	<div style="padding-bottom: 0.55rem; background-color: #fff;">
		<headTop title="提前结清" showBack="1"></headTop>
		<div class="list">
			<h3>提前结清式算</h3>
			<div class="settle-size">
				<ul>
					<li class="settle-rt">本金（元）：</li>
					<li class="settle-cent">{{details.prcpAmt}}</li>
				</ul>
				<ul>
					<li class="settle-rt">利息（元）：</li>
					<li class="settle-cent">{{details.intAmt}}</li>
				</ul>
				<ul>
					<li class="settle-rt">手续费（元）：</li>
					<li class="settle-cent">{{details.serviceFee}}</li>
				</ul>
			</div>
			<div class="total">
				<ul>
					<li class="settle-rt">合计（元）：</li>
					<li class="settle-cent">{{details.totalAmt}}</li>
				</ul>
			</div>
			<div class="account settle-div">
				<ul>
					<li class="settle-rt account-sz">华夏二类账户：</li>
					<li class="settle-cent account-sz" v-if="!showBankNo">{{details.openBankNo}}</li>
					<li class="settle-cent account-sz" v-if="showBankNo">{{details.secondeBankCardNo}}</li>
					<li class="account-show" v-if="!showBankNo" @click="openBankNo">明文显示</li>
					<li class="account-show" v-if="showBankNo" @click="closeBankNo">隐藏</li>
				</ul>
			</div>
			<div class="settle-sz">请确保您的华夏银行二类账户余额超过{{details.totalAmt}}元</div>
		</div>
		<div class="btn btn-but">
			<a  href="javascript:void(0);" class="apply" @click="jqLoan">结清</a>
		</div>
	</div>
	

</template>

<script>
	import headTop from "@/components/headTop"
	import { getCalPayoffAmt,payoff } from "@/api/getData"
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				applyNo: "",
				dueNo:"",
				details:{},
				showBankNo:false,
			}
		},
		created() {
			this.applyNo = this.$route.query.applyNo;
			this.dueNo = this.$route.query.dueNo;
			this.getCalPayoffAmt();
		},
		components: {
			headTop,
		},
		methods: {
			//查询结清试算
			async getCalPayoffAmt() {
				try {
					const res = await getCalPayoffAmt({
						dueNo: this.dueNo,
						applyNo:this.applyNo
					});
					if(res.errorCode == 0) {
						let details = res.dataBody;
						let openBankNo = details.secondeBankCardNo.substring(0,6)
						+" **** **** "
						+details.secondeBankCardNo.substring(details.secondeBankCardNo.length-4,details.secondeBankCardNo.length);
						details.openBankNo = openBankNo;
						this.details = details;
						if(details.isEnough != "Y"){
							Toast({
								message: '您的账户余额不足！',
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
			//银行账号
			openBankNo(){
				this.showBankNo = true;
			},
			closeBankNo(){
				this.showBankNo = false;
			},
			//结清贷款
			async jqLoan(){
				try {
					const res = await payoff({
						dueNo: this.dueNo,
						applyNo:this.applyNo,
						payAmt:this.details.totalAmt
					});
					if(res.errorCode == 0) {
						if(res.dataBody.dueStatus == "可以还清"){
							Toast({
								message: '还款成功',
							});
						}
					} else {
						Toast({
							message: '还款失败',
						});
					}

				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
		}
	}
</script>

<style scoped>
	.list {
		background: #fff;
	}
	
	.greyClass {
		height: 0.15rem;
		background-color: #f5f5f5;
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
	
	.btn {
		display: -webkit-box;
		-webkit-box-pack: center;
		padding-top: 0.875rem;
	}
	.btn-but{
		padding: 0.45rem;
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
	
	.timesbtn {
		font-size: 0.18rem;
		width: 40%;
		display: block;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #ffffff;
		background-color: #5489f1;
		border-radius: 0.03rem;
		margin: 0 0.15rem;
	}
	
	.list h3 {
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0 0.47rem;
		position: relative;
		border-bottom: #f2f3f4 solid 0.015rem;
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
	.settle-size{
		width:4.96rem ;
		height: 2.25rem;
		border-bottom: #f2f3f4 solid 0.015rem;
		margin: 0 auto;
	}
	.settle-size ul{
		list-style: none;
	}
	.settle-size ul li{
		display: block;
		float: left;
		font-size: 0.21rem;
		width: 2.18rem;
		height: 0.39rem;
		line-height: 0.39rem;
		margin: 0 auto;
		padding-top: 0.26rem;
	}
	.settle-cent{
		text-align: center;
	}
	.settle-rt{
		text-align:right;
	}
	.total{
		width:4.96rem ;
		height: 0.36rem;
		margin: 0 auto;
		padding-bottom: 0.65rem;
	}
	.total ul{
		list-style: none;
	}
	.total ul li{
		display: block;
		float: left;
		font-size: 0.21rem;
		width: 2.18rem;
		height: 0.39rem;
		line-height: 0.39rem;
		margin: 0 auto;
		padding-top: 0.26rem;
	}
	.account{
		width:4.96rem ;
	}
	.account ul{
		list-style: none;
	}
	.account ul li{
		display: block;
		float: left;
		font-size: 0.21rem;
	}
	.account-show{
		background: #5489F1;
		color: #fff;
		width: 0.75rem;
		height: 0.3rem;
		line-height: 0.3rem;
		text-align: center;
		font-size: 0.15rem !important;
		margin-left: 0.15rem;
		border-radius: 0.03rem;
	}
	.account-sz{
		padding-left: 0.32rem;
		font-size: 0.18rem !important;
		height: 0.3rem;
		line-height: 0.3rem;
		text-align: center;
	}
	.settle-div{
		width:4.96rem ;
		height: 0.45rem;
		margin-top: 0.55rem;
		margin: 0 auto;
	}
	.settle-sz{
		width: 4.96rem;
		height: 0.45rem;
		margin: 0 auto;
		text-align: center;
		font-size: 0.17rem;
		line-height: 0.45rem;
		color: #FF5661;
	}
</style>