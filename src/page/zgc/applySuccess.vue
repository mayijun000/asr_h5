<template>
	<div style="height:100%; background-color: #fff;">
		<headTop title="申请贷款"></headTop>
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
						<span class="line"></span>
						<span class="circular"></span>
						<span class="line"></span>
					</dt>
					<dd>完善资料</dd>
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
						<span class="line"></span>
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
		<div class="greyClass"></div>
		<div class="content" >
			<img src="../../static/success.png" />
			<div class="info">申请资料提交成功</div>
			<p style="margin-top: 0.2rem;">您可以进入我的贷款页面，查看贷款申请进度；</p>
			<div class="detail">
				<h2>{{productName}}-{{bankName}}</h2>
				<ul>
					<li><span>申请贷款期限</span><span class="right">{{loanTerm}}</span></li>
					<li><span>申请办理银行</span><span class="right">{{bankName}}</span></li>
				</ul>
			</div>
			<div class="btn">
				<a href="javascript:void(0);" class="apply" @click="toMyLoan">返回我的贷款</a>
				<a href="javascript:void(0);" class="apply" @click="toProductList">返回首页</a>
			</div>
		</div>
			
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { showProductById, getAllApplyZgc} from "@/api/getData"
	import { Toast, MessageBox } from 'mint-ui';

	export default {
		data() {
			return {
				applyNo: "",
				productId: "",
				productName: "",
				bankName:"",
				loanTerm: "",
				cardBankName:""
			}
		},
		created() {
			this.applyNo = this.$route.query.applyNo;
			this.productId = this.$route.query.productId;
			this.showProductById();
			this.getAllApplyZgc();
		},
		components: {
			headTop,
		},
		methods: {
			//查询产品
			async showProductById() {
				try {
					const res = await showProductById({
						id: this.productId
					});
					if(res.errorCode == 0) {
						let productList = res.dataBody.product;
						this.productName = productList.productName;
						this.bankName = productList.bankName;
					} else {
						Toast({
							message: data.errorString,
						});
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			async getAllApplyZgc() {
				try {
					const res = await getAllApplyZgc({
						applyNo: this.applyNo
					});
					if(res.errorCode == 0) {
						let apply = res.dataBody.apply;
						this.loanTerm = apply.loanTerm+"个月";
						this.cardBankName = apply.bankName;
					} else {
						Toast({
							message: data.errorString,
						});
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
			//跳转到产品列表
			toProductList() {
				this.$router.push({
					path: '/'
				});
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
		padding: 0 0.3rem;
		padding-top: 0.875rem;
	}
	
	.apply {
		font-size: 0.24rem;
		width: 45%;
		display: block;
		height: 0.75rem;
		text-align: center;
		line-height: 0.75rem;
		color: #ffffff;
		background-color: #5489f1;
		border-radius: 0.03rem;
		margin: 0 0.2rem;
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
	.detail{
		margin-top: 0.4rem;
	}
	.detail h2{
		font-size: 0.21rem;
		padding: 0.2rem 0.3rem;
		text-align: left;
		border-top: solid 1px #F2F3F4;
		border-bottom: solid 1px #F2F3F4;
	}
	.detail ul{
		color: #92969C;
		font-size: 0.18rem;
		text-align: left;
		padding: 0.2rem 0.45rem;
	}
	.detail ul li{
		line-height: 0.4rem;
	}
	.right{
		float: right;
	}
</style>