<template>
	<div>
		<headTop showBack="1" title="贷款详情"></headTop>
		<div class="list" >
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
		<div class="list">
			<h3>申请信息</h3>
			<div class="list_cont">
				<ul>
					<li><i>业务序列号:</i><span>{{apply.applyNo }}</span></li>
					<li><i>企业名称:</i><span>{{apply.etrName }}</span></li>
					<li><i>税号:</i><span>{{apply.nsrsbh }}</span></li>
					<li><i>受理银行:</i><span>{{apply.bankName }}</span></li>
					<li v-if="apply.loanAmount"><i>贷款金额:</i><span>{{apply.loanAmount }}万</span></li>
					<li v-if="apply.loanTerm"><i>贷款期限:</i><span>{{apply.loanTerm}}个月</span></li>
					<li><i>提交时间:</i><span>{{apply.time }}</span></li>
				</ul>
			</div>
		</div>
		<div class="list">
			<h3>申请人资料</h3>
			<div class="list_cont">
				<ul>
					<li><i>申请人:</i><span>{{apply.contactPerson }}</span></li>
					<li><i>手机号:</i><span>{{apply.contactMobile }}</span></li>
					<li><i>身份证:</i><span>{{inputPageOne.idtfno }}</span></li>
					<template v-for="item in applyPerson">
						<li v-if="item.value == inputPageOne.loanType"><i>申请人类型:</i><span>{{item.optionText}}</span></li>
					</template>
					<li v-if="inputPageOne.cqzh"><i>办理支行:</i><span>{{inputPageOne.cqzh }}</span></li>
					<li v-if="inputPageOne.openBankNo"><i>申请人银行卡号:</i><span>{{inputPageOne.openBankNo }}</span></li>
					<li v-if="inputPageOne.openBankName"><i>银行卡开户银行:</i><span>{{inputPageOne.openBankName }}</span></li>					
					<li v-if="inputPageOne.ownedFlag"><i>独资且未婚:</i><span>{{inputPageOne.ownedFlag}}</span></li>
					<li v-if="inputPageOne.acFlag"><i>本人为实际控制人:</i><span>{{inputPageOne.acFlag}}</span></li>
					<li v-if="inputPageOne.cbType"><i>共同借款人:</i><span>{{inputPageOne.cbType}}</span></li>
					<li v-if="inputPageOne.cbName"><i>共同借款人姓名:</i><span>{{inputPageOne.cbName }}</span></li>
					<li v-if="inputPageOne.cbMobile"><i>共同借款人手机号:</i><span>{{inputPageOne.cbMobile }}</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>
{"loanType":"fddbr","idtfno":"412726199002040497","openBankNo":"622700245162311","openBankName":"工商银行","ownedFlag":"1"}
<script>
	import headTop from "@/components/headTop"
	import { showProductById,getAllApplyByApply,applyPerson , } from "@/api/getData"
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
						
						this.inputPageOne = JSON.parse(this.apply.inputPageOne);
						if(this.inputPageOne.cbType == "1"){
							this.inputPageOne.cbType = "共同借款人";
						}else if(this.inputPageOne.cbType == "2"){
							this.inputPageOne.cbType = "配偶";
						}else if(this.inputPageOne.cbType == "3"){
							this.inputPageOne.cbType = "股东";
						}
						if(this.inputPageOne.ownedFlag == "0"){
							this.inputPageOne.ownedFlag = '不是';
						}else if(this.inputPageOne.ownedFlag == "1"){
							this.inputPageOne.ownedFlag = '是';
						}
						if(this.inputPageOne.acFlag == "0"){
							this.inputPageOne.acFlag = '不是';
						}else if(this.inputPageOne.acFlag == "1"){
							this.inputPageOne.acFlag = '是';
						}
						
						
						
						//console.log(this.inputPageOne )
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
			
			//返回我的贷款
			toMyLoan() {
				this.$router.push({
					path: 'myLoan'
				});
			},
			
		}
	}
</script>

<style scoped>
	.list {
		width: 100%;
		margin-top: 0.15rem;
		padding-bottom: 0.1rem;
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
	.detail-list,.detail-xgsm{
		font-size:0.18rem ;
		margin: 0.1rem 0.2rem;
	}
	.detail-list h4,.detail-xgsm h4{
		font-size:0.21rem ;
		line-height: 0.48rem;
	}
	.detail-list .detail-zlzb li{
		padding: 0.05rem 0;
		color: #474A4F;
	}
	.detail-list .detail-zlzb li i{
		display: inline-block;
		width: 0.22rem;
		height: 0.22rem;
		text-align: center;
		margin-right: 0.2rem;
		background: url(../../static/bgjx.png) no-repeat;
	}
	.detail-xgsm{
		margin-top: 0.1rem;
		padding: 0.08rem;
		background: #fdf5e6;
		color: #e5a240;
	}
	.detail-xgsm li{
		line-height: 0.30rem;
	}
	.detail-xgsm li i{
		display: inline-block;
	    width: 0.12rem;
	    height: 0.12rem;
	    border-radius: 100%;
	    background: #e5a240;
	    margin: 0 0.2rem;
	}
	.detail-sqlc li{
		width: 100%;
		overflow: scroll;
	}
</style>