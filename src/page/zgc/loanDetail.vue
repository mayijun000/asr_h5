<template>
	<div>
		<headTop showBack="1" title="贷款详情"></headTop>
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
					<li><i>申请贷款额度:</i><span>--万元</span></li>
					<li><i>申请还款方式:</i><span>{{apply.statusName}}</span></li>
					<li><i>银行授信状态:</i><span>{{mode}}</span></li>
					<li><i>银行授信额度:</i><span>{{creditAmount}}万元</span></li>
					<li><i>贷款合同:</i><span>尚未签订</span></li>
				</ul>
			</div>
		</div>
		
		<div class="btn">
			<a href="javascript:void(0);" class="apply" v-if="apply.statusCode == 'CSTG'" @click="toPerfectInfo">立即完善资料</a>
			<a href="javascript:void(0);" class="apply" v-if="apply.statusCode == 'YSX' && zgcLoan.zgcbAccountNo != '' && zgcLoan.loanContractNo == ''" @click="toContract">立即签订贷款合同</a>
			<a href="javascript:void(0);" class="apply" v-if="apply.statusCode == 'YSX' && zgcLoan.loanContractNo != ''" @click="toZgcPaymentPlan">查看还款情况</a>
			<a href="javascript:void(0);" class="apply" v-if="apply.statusCode == 'YSX' && zgcLoan.zgcbAccountNo == ''" @click="toOpenAccount">开户</a>
		</div>
		
		<div class="list" v-if="apply.permitLoanTerm != null && apply.primitLoanAmount != null && apply.permitLoanTerm != ''">
			<h3>授信详细信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>授信期限:</i><span>{{apply.permitLoanTerm}}个月</span></li>
					<li><i>授信额度:</i><span>{{apply.primitLoanAmount}}万元</span></li>
				</ul>
			</div>
		</div>
		<div class="list">
			<h3>产品详细信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>年利率:</i><span>{{product.rate }}</span></li>
					<li><i>最高金额:</i><span>{{product.maxLoanAmount }}万</span></li>
					<li><i>最长期限:</i><span>{{product.repaymentTerm }}个月</span></li>
					<li><i>还款方式:</i><span>{{product.repaymentName }}</span></li>
					<li><i>担保方式:</i><span>{{product.guaranteeTypeName }}</span></li>
					<li><i>开通地区:</i><span>{{product.remark }}</span></li>
				</ul>
			</div>
		</div>
		<div class="list">
			<h3>申请详细信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>业务序列号:</i><span>{{apply.applyNo }}</span></li>
					<li><i>贷款金额:</i><span>{{credit.loanAmount }}万元</span></li>
					<li><i>贷款期限:</i><span>{{credit.loanTerm}}个月</span></li>
					<li><i>企业名称:</i><span>{{qyxx.corp_name}}</span></li>
					<li><i>税号:</i><span>{{qyxx.tax_code}}</span></li>
					<li><i>受理银行:</i><span>{{apply.bankName}}</span></li>
					<li><i>提交时间:</i><span>{{gmtCreate}}</span></li>
				</ul>
			</div>
		</div>
		<div class="list">
			<h3>申请人资料</h3>
			<div class="list_cont">
				<ul>
					<li><i>申请人:</i><span>{{credit.userRealName}}</span></li>
					<li><i>手机号:</i><span>{{credit.cardMobile}}</span></li>
					<li><i>身份证:</i><span>{{credit.userIdno}}</span></li>
					<template v-for="item in applyPerson">
						<li v-if="item.value == credit.loanUserType"><i>申请人类型:</i><span>{{item.optionText}}</span></li>
					</template>
					<li><i>一类账户号码:</i><span>{{credit.cardNo}}</span></li>
					<li><i>一类账户银行:</i><span>{{credit.cardBankName}}</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { getAllApplyByApply,zgc_getAllApplyByApply,applyPerson ,checkOpenAccount} from "@/api/getData"
	import { Toast,MessageBox } from 'mint-ui';
	import { getLocalTime,formatMoney,getStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				bankList:[],
				applyNo:"",
				productId:"",
				apply:{},
				credit:{},
				qyxx:{},
				product:{},
				applyPerson:[],
				gmtCreate:"",
				creditAmount:"",
				mode:"",
				loan:null,
				zgcLoan:{},
			}
		},
		activated() {
			this.bankList = JSON.parse(getStore("bankList"));
			this.product = JSON.parse(getStore("product"));
			this.applyNo = this.$route.query.applyNo;
			this.productId = this.$route.query.productId;
			this.applyPersonData();
			this.getAllApplyByApplyData();
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
						if(this.apply != null){
							this.zgc_getAllApplyByApplyData();
						}
					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err,
					});
				}
			},
			//中关村贷款详情
			async zgc_getAllApplyByApplyData(){
				try {
					const res = await zgc_getAllApplyByApply({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						this.apply = res.dataBody.apply;
						this.credit = res.dataBody.credit;
						this.qyxx = res.dataBody.qyxx;
						this.loan = res.dataBody.loan;
						this.gmtCreate = getLocalTime(this.credit.gmtCreate);
						if(this.credit.creditAmount != null){
                            this.creditAmount = this.credit.creditAmount;
                        }else{
                        	this.creditAmount = "--";
                        }
                        if(this.credit.loanTerm == 6){
                            this.mode = "一次性还本付息";
                        }
                        if(this.apply.statusCode == "YSX" && this.loan != null){
                        	this.checkOpenAccountData(this.credit.applyId);
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
			//检查是否已经开户
			async checkOpenAccountData(applyId) {
				try {
					const res = await checkOpenAccount({
						applyId : applyId
					});
					if(res.errorCode == 0) {
						if(res.dataBody.loan != null){
							this.zgcLoan = res.dataBody.loan;
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
			//签订合同
			toContract(){
				if(zgcLoan.zgcbAccountNo){
					this.$router.push({
						path: 'zgc_contract',
						query: {
							applyId:this.credit.applyId,
							productId:this.productId
						}
					});
				}else{
					this.toOpenAccount();
				}
			},
			//跳转到开户
			toOpenAccount() {
				this.$router.push({
					path: 'zgc_openAccount',
					query:{
						applyId: this.credit.applyId,
					}
				});
			},
			//跳转到还款计划
			toZgcPaymentPlan() {
				this.$router.push({
					path: 'zgcPaymentPlan',
					query:{
						applyId: this.credit.applyId,
						productId: this.productId,
					}
				});
			},
			//跳转到完善资料
			toPerfectInfo(){
				this.$router.push({
					path: 'zgc_perfectInfo',
					query:{
						applyId: this.credit.applyId,
						productId: this.productId,
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
</style>