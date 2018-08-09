<template>
	<div style="height:100%; background-color: #fff;">
		<headTop title="完善资料"></headTop>
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
		<div class="greyClass"></div>
		<div class="content" v-show="isShow == 2">
			<img src="../../static/success.png" />
			<div class="info">提交成功</div>
			<p style="margin-top: 0.2rem;">爱华夏银行正在审核您的贷款申请,请等待...</p>
			<p>预计还有{{times1}}秒返回授信结果</p>
			<div class="btn">
				<a href="javascript:void(0);" class="apply" @click="toMyLoan">不等了,返回我的贷款</a>
			</div>
		</div>
		<div class="content" v-show="isShow == 3">
			<img src="../../static/wait.png" />
			<div class="info">是否继续等待?</div>
			<p style="margin-top: 0.2rem;">您的贷款看起来还需要一些时间进行审批</p>
			<p>您是否继续等待30秒?</p>
			<div class="btn">
				<a href="javascript:void(0);" class="timesbtn" @click="waitResult">{{times2}}</a>
				<a href="javascript:void(0);" class="timesbtn" @click="toMyLoan">不等了,返回我的贷款</a>
			</div>
		</div>
		<div class="content" v-show="isShow == 4">
			<img src="../../static/ok.png" />
			<div class="info">恭喜您,授信通过！</div>
			<p style="margin-top: 0.2rem;">华夏银行已经审核通过了您的贷款申请</p>
			<p>并给出了授信额度。/p>
			<div class="btn">
				<a href="javascript:void(0);" class="apply" @click="toDetail">立即查看授信额度</a>
			</div>
		</div>
		<div class="content" v-show="isShow == 5">
			<img src="../../static/failed.png" />
			<div class="info">抱歉,您的贷款申请审批未通过</div>
			<p style="margin-top: 0.2rem;">华夏银行未能批准您的贷款申请。</p>
			<p>您可以查看其他合作银行的产品。</p>
			<div class="btn">
				<a href="javascript:void(0);" class="apply" @click="toProductList">看看其他产品</a>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { getApplyStatus } from "@/api/getData"
	import { Toast } from 'mint-ui';

	export default {
		data() {
			return {
				timeOne:false,
				isShow:2,//显示不同的提示
				numCredid:0,//查询次数
				timeoutCount: null, //倒计时
				timeoutCredid: null, //授信结果循环
				applyNo:"",
				productId:"",
				times1:30,
				times2:"继续等待30秒",
			}
		},
		created() {
			let _this = this;
			this.applyNo = this.$route.query.applyNo;
			this.productId = this.$route.query.productId;
			this.countDown(30);
			this.timeoutCredid = setInterval(function() {
				_this.getApplyStatus();
			}, 5000);
			
		},
		components: {
			headTop,
		},
		methods: {
			//查询授信结果
			async getApplyStatus() {
				if(this.numCredid >= 5){
					clearInterval(this.timeoutCredid);
					this.isShow = 3;//显示是否继续等待30秒	
					this.times2 = "继续等待30秒";
				}else{
					try {
						const res = await getApplyStatus({
							applyNo: this.applyNo
						});
						if(res.errorCode == 0) {
							let _this = this;
							let applyStatus = res.dataBody.applyStatus;
							if(applyStatus == "WSX"){
								clearInterval(this.timeoutCredid);
								this.isShow = 4;
							}else if(applyStatus == "YSX"){
								clearInterval(this.timeoutCredid);
								this.isShow = 5;
								
							}else{								
								this.numCredid = this.numCredid + 1;
								
							}						
						}
					} catch(err) {
						console.log('错误', err);
						Toast({
							message: err.toString(),
						});
					}
				}					
			},
			countDown(count, method) {
				let _this = this;
				this.timeoutCount = setInterval(function() {
					if(count == 0) {
						clearInterval(_this.timeoutCount);
						this.times2 = "继续等待30秒";
					} else if(count > 0) {
						_this.times1 = count;
						_this.times2 = count;
						count--;
					}
				}, 1000);
			},
			//继续等待
			waitResult(){
				let _this = this;
				this.numCredid = 0;
				this.times2 = "继续等待30秒";
				this.countDown(30);
				this.timeoutCredid = setInterval(function() {
					_this.getApplyStatus();
				}, 5000);
			},
			//返回我的贷款
			toMyLoan(){
				this.$router.push({
					path: 'myLoan'
				});
			},
			//贷款详情页
			toDetail(){
				this.$router.push({
					path: 'HXYHV2_loanDetail',
					query: {
						productId: this.productId,
						applyNo: this.applyNo,
					}
				});
			},
			//跳转到产品列表
			toProductList(){
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
		padding:0 0.3rem;
		padding-top: 0.875rem;
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
	.timesbtn{
		font-size: 0.18rem;
		width: 40%;
		display: block;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #ffffff;
		background-color: #5489f1;
		border-radius: 0.03rem;
		margin:0 0.15rem;
	}
</style>