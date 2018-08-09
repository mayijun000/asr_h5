<template>
	<div>
		<headTop showBack="1" title="还款账单"></headTop>
		<div class="loanAll">
			<div class="title">全部待还(元)</div>
			<div class="money">{{dueAll}}</div>
		</div>
		<div class="due" v-for="item in listDue">
			<ul class="title">
				<li><span v-if="item.listDueRepay[0].repayOverFlag == 'OF01' &&　item.listDueRepay[0].repayStatus == 'PS00'" class="reduis"></span></li>
				<li class="dueNo">借款金额(元):{{Number(item.dueAmount).toFixed(2)}}</li>
				<li class="dueNo">借款时间:{{item.dueProvideDate}}</li>
				<li class="dueNo">借据号:{{item.dueNo}}</li>
			</ul>
			<ul class="content">
				<li>序号</li>
				<li class="dueNo">应还金额</li>
				<li class="dueNo">到期日</li>
				<li class="dueNo">是否逾期</li>
				<li class="dueNo"></li>
			</ul>
			<ul class="content">
				<li>1期</li>
				<li>{{Number(item.listDueRepay[0].repayShouldPrcp).toFixed(2)}}</li>
				<li>{{item.listDueRepay[0].repayEndDate}}</li>
				<li v-if="item.listDueRepay[0].repayOverFlag == 'OF00'">正常</li>
				<li v-if="item.listDueRepay[0].repayOverFlag == 'OF01'" class="overdue">逾期
					<span v-if="item.listDueRepay[0].repayStatus == 'PS00'" @click="datePayment(item.dueNo)" class="repay">立即还款</span>
				</li>
				<li class="detail-rt" @click="toDueDetail(item.dueNo)">></li>
			</ul>
			<div class="btn" v-if="item.dueStatus != 3" ><mt-button type="primary" @click.native="allPayment(item.dueNo)">提前还款</mt-button></div>
		</div>
		<mt-popup v-model="overPopup" style="width:80%;">
			<div class="list">
				<h3 style="font-size: 0.18rem;">逾期还款金额计算</h3>
				<div class="list_cont">
					<ul>
						<li><i>本金金额（元）:</i><span>{{prepaymentTrial.loan_pri}}</span></li>
						<li><i>利息金额（元）:</i><span>{{prepaymentTrial.loan_bal}}</span></li>
						<li><i>罚息金额（元）:</i><span>{{prepaymentTrial.pri_amt}}</span></li>
						<li><i>复利金额（元）:</i><span>{{prepaymentTrial.int_amt}}</span></li>
						<li><i>罚息的复利金额（元）:</i><span>{{prepaymentTrial.fee_amt}}</span></li>
						<li><i>复利的复利金额（元）:</i><span>{{prepaymentTrial.total_amt}}</span></li>
						<li><i>合计（元）:</i><span>{{prepaymentTrial.total_amt}}</span></li>
						<li style="font-size: 0.14rem;color:#eca53f;">请确保您的中关村银行账户：{{zgcbAccountNo}}中， 余额不少于{{prepaymentTrial.total_amt}}元 </li>
					</ul>
				</div>
			</div>
			<div class="bottomPopup">
				<a href="javascript:void(0);" class="applyMin" @click="prepaymentData">立即还款</a>
				<a href="javascript:void(0);" class="applyMin" @click="closeOverPopup">我再考虑一下</a>
			</div>
		</mt-popup>
		<mt-popup v-model="successPopup" style="width:80%;">
			<div class="list">
				<h3 style="font-size: 0.18rem;">提前全额还款金额计算</h3>
				<div class="list_cont">
					<ul>
						<li><i>贷款本金金额（元）:</i><span></span></li>
						<li><i>贷款余额（元）:</i><span></span></li>
						<li><i>提前还款本金金额（元）:</i><span></span></li>
						<li><i>提前还款利息金额（元）:</i><span></span></li>
						<li><i>提前还款罚息金额（元）:</i><span></span></li>
						<li><i>提前还款总金额（元）:</i><span></span></li>
						<li style="font-size: 0.14rem;color:#eca53f;">请确保您的中关村银行账户：{{zgcbAccountNo}}中， 余额不少于元 </li>
					</ul>
				</div>
			</div>
			<div class="bottomPopup">
				<a href="javascript:void(0);" class="applyMin" @click="loanRepayData">立即还款</a>
				<a href="javascript:void(0);" class="applyMin" @click="closeSuccessPopup">我再考虑一下</a>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { listDue ,debt,prepaymentTrial,prepayment,loanRepay} from "@/api/getData"
	import { Toast,Popup} from 'mint-ui';
	import { moment } from '@/api/moment'// 格式化时间
	import { setStore } from "@/config/mUtils"
	
	export default {
		data() {
			return {
				loanId:"",
				listDue:[],
				dueAll:0,
				prepaymentTrial:{},//提前还款试算
				successPopup:false,
				zgcbAccountNo:"",
				overPopup:false,
			}
		},
		created() {
			this.loanId = this.$route.query.loanId;
			this.listDueData();
		},
		components: {
			headTop,
			Popup
		},
		methods: {
			//获取还款计划
			async listDueData() {
				try {
					const res = await listDue({
						id: this.loanId
					});
					if(res.errorCode == "0") {
						this.zgcbAccountNo = res.dataBody.loan.zgcbAccountNo;
						this.listDue = res.dataBody.listDue;//借据列表
						let dueAll = 0;
						this.listDue.forEach(function(item){
							item.dueProvideDate = moment(item.dueProvideDate).format('YYYY-MM-DD');
							item.listDueRepay[0].repayEndDate = moment(item.listDueRepay[0].repayEndDate).format('YYYY-MM-DD');
							dueAll += item.dueAmount;//借款金额相加等于全部待还
							setStore(item.dueNo,item.listDueRepay[0]);//把期数信息放入缓存，提供后面详情查询
							setStore(item.dueNo+"item",item);//放入缓存，提供后面详情查询
						});
						this.dueAll = Number(dueAll).toFixed(2);
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
			//立即还款
			async datePayment(dueNo){
				try {
					const res = await debt({
						dueNo : dueNo
					});
					if(res.errorCode == "0") {
						let bizContent = JSON.parse(res.bizContent);
						if(bizContent.result_code == "00000"){
							
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
			//提前还款试算
			async allPayment(dueNo){
				try {
					const res = await prepaymentTrial({
						dueNo : dueNo
					});
					if(res.errorCode == "0") {
						this.prepaymentTrial = data.dataBody.prepaymentTrial;
						this.prepaymentTrial.dueNo = dueNo;
						this.successPopup = true;
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
			//提前还款
			async prepaymentData(){
				try {
					const res = await prepayment(this.prepaymentTrial);
					if(res.errorCode == "0") {
						this.closeSuccessPopup();
						Toast({
							message: "提前还款成功",
						});
						this.listDueData();
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
			closeSuccessPopup(){
				this.successPopup = false;
			},
			closeOverPopup(){
				this.overPopup = false;
			},
			//跳转到还款详情
			toDueDetail(dueNo){
				this.$router.push({
					path: 'zgc_dueDetail',
					query:{
						dueNo: dueNo,
					}
				});
			},
			//贷款还款
			async loanRepayData(){
				try {
					const res = await loanRepay();
					if(res.errorCode == "0") {
						this.closeOverPopup();
						Toast({
							message: "贷款还款成功",
						});
						this.listDueData();
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
	}
</script>

<style scoped>
	.loanAll{
		height: 1.9rem;
		background-color: #fff;
		text-align: center;
		padding-top: 0.54rem;
	}
	.loanAll .title{
		font-size: 0.18rem;
		color: #92969C;
	}
	.loanAll .money{
		font-size: 0.36rem;
		color:#000000;
		padding-top: 0.25rem;
	}
	.due{
		margin-top: 0.1rem;
		overflow: hidden;
	}
	.due .title{
		line-height: 0.6rem;
		height:0.6rem;
		background: #EEF5FD;
		padding:0 0.12rem;
		font-size: 0.12rem;
		color:#000000;
		width: 100%;
	}
	.due .title li{
		float:left;
	}
	.due .title .dueNo{
		padding:0 0.2rem;
	}
	.due .title .reduis{
		display: inline-block;
		background: #FF5500;
		height:0.1rem;
		width:0.1rem;
		border-radius: 50%;
	}
	.due .content {
		line-height: 0.6rem;
		height:0.6rem;
		background: #fff;
		padding-left:0.45rem;
		font-size: 0.15rem;
		color:#92969C;
		width: 100%;
		border-bottom: solid 0.01rem #F2F3F4;
	}
	.due .content li{
		float:left;
		width:20%;
	}
	.due .content .overdue{
		color:#FF0000;
	}
	.due .content .repay{
		color:#5489F1;
		padding-left: 0.1rem;
	}
	.btn{
		background: #fff;
		height:0.6rem;
	}
	.mint-button{
		font-size: 0.18rem;
		width:1.2rem;
		height:0.3rem;
		margin-left: 0.1rem;
		float: right;
		margin-top: 0.15rem;
		margin-right: 0.2rem;
		border-radius: 0.5rem;
	}
	.mint-button--primary {
	    color: #5489F1;
	    background-color: #fff;
	    border: 0.01rem solid #5489F1;
	    display: inherit;
	}
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
		padding-left: 0.1rem;
		display: inline-block;
		width: 60%;
		color: #494c51;
		vertical-align: top;
	}
	.list_cont ul li span {
		display: inline-block;
		color: #92979d;
		width: 30%;
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
		padding: 0.1rem 0.4rem;
    	position: relative;
    	top: -0.15rem;
	}
	.due .content li.detail-rt{
		width: 0.8rem;
    	margin-left: 0.15rem;
	}
</style>