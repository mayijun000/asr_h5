<template>
	<div>
		<headTop title="我的贷款"></headTop>
		<!-- 列表 -->
		<div class="page-infinite-wrapper" v-if="applyTotal != 0">
			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
				<li v-for="item in applyList">
					<div class="bank">
						<div class="loan_bank">
							<h3><b>{{item.productName}}</b></h3>
							<span>{{item.statusName}}</span>
						</div>
						<div class="bank_loan">
							<div class="bank_name">
								<div class="bank_title">
									<template v-for="bank in bankList">
										<img v-if="bank.bankName == item.bankName" :src="'http://'+ bank.bankLogo" alt="">
									</template>
									<span>{{item.bankName}}</span>
								</div>
								<div class="bank_credit">
									<div>业务序列号: {{item.applyNo}}</div>
									<div>申请时间: {{item.time}}</div>
								</div>
							</div>
							<div style="clear:both;"></div>
							<div class="bank_meg" v-if="item.loanTerm">
								<div class="bank_title">
									<span>申请贷款期限:</span>
								</div>								
								<div class="bank_red">
									{{item.loanTerm}}个月
								</div>
							</div>
							<div style="clear:both;"></div>
							<div class="bank_meg" v-if="item.loanAmount">
								<div class="bank_title">
									<span>申请贷款额度:</span>
								</div>								
								<div class="bank_red">
									{{item.loanAmount}}万
								</div>
							</div>
							<div style="clear:both;"></div>
							<div class="bank_meg">
								<div class="bank_title">
									<span>申请办理银行:</span>
								</div>
								<div class="bank_red">{{item.bankName}}</div>
							</div>
							<div style="clear:both;"></div>
							
						</div>
						<div class="bank_btn">
							<a href="javascript:void(0);" @click="toDetail(item.applyNo,item.productId)">查看详情</a>
						</div>
					</div>
				</li>
			</ul>
			<p class="page-infinite-loading" v-show="loading">
				<mt-spinner type="fading-circle"></mt-spinner>加载中...
			</p>
		</div>
		<div class="noData" v-else>{{nodata}}</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { Toast } from 'mint-ui';
	import { bsxApp, getAllApplyByUuk ,getAllBank,showProductById} from "@/api/getData"
	import { getSign, setStore,getLocalTime } from "@/config/mUtils"
	export default {
		data() {
			return {
				pageNum: 1,
				applyTotal: 0,
				applyList:[],
				bankList:[],
				loading: false, //加载动画
				nodata:"",//无数据展示
			}
		},
		created() {
			//移动端获取登录后返回的token
			if(typeof(NativeBridge) == "undefined") {
				window.NativeBridge = {};
				NativeBridge.getUserToken = function() {
					return "1eb88adc-c429-4f01-8869-a19625e588d1";
				};
				NativeBridge.getEntTaxId = function() {
					return "91110108MA001K7YXU";
				};
				NativeBridge.getUserId = function() {
					return "18301179455";
				};
				NativeBridge.getUserToken = function() {
					return "979DBC09D7F0D8B52D1AFD46259ED6F9038A901E5C13580F96366D938A5EBC94";
				};
			}
			this.bsxAppData();
			this.getAllBankData();
		},
		components: {
			headTop,
		},
		methods: {
			//博士匣登录
			async bsxAppData() {
				let date = new Date();
				let reqtime = date.getTime();
				try {
					const res = await bsxApp({
						type: "jrfw",
						ts: reqtime,
						userid: NativeBridge.getUserId(),
						taxid: NativeBridge.getEntTaxId(),
						usersign: getSign(reqtime, NativeBridge.getUserId(), NativeBridge.getUserToken()),
					});
					if(res.errorCode == 0) {
						setStore("token", res.dataBody.token);
						this.getAllApplyByUukData();
					} else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
				}
			},
			//查询所有银行logo
			async getAllBankData() {
				try {
					const res = await getAllBank();
					if(res.errorCode == 0) {
						this.bankList = res.dataBody.bankList;
						setStore("bankList",this.bankList);//银行logo放入缓存
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
			//我的贷款列表
			async getAllApplyByUukData() {
				try {
					const res = await getAllApplyByUuk({
						PageNum: this.pageNum
					});
					if(res.errorCode == 0) {
						res.dataBody.applylist.forEach(item => {
							item.time = getLocalTime(item.gmtCreate);
							this.applyList.push(item);
						});
						this.applyTotal = res.dataBody.applyTotal;
						if(this.applyTotal == 0){
							this.nodata = "无数据";
						}
					} else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
				}
			},
			//查询更多
			loadMore() {
				//总页数
				let totalPage = 0;
				if(totalPage % 10 == 0) {
					totalPage = this.applyTotal / 10;
				} else {
					totalPage = this.applyTotal / 10 + 1;
				}
				//加载消失后再次触发
				if(totalPage - this.pageNum > 0 && !this.loading) {
					this.pageNum = this.pageNum + 1;
					this.loading = true;
					setTimeout(() => {
						let _this = this;
						this.filterFind(function() {
							_this.loading = false;
						});
					}, 500);
				}
			},
			//查询产品详情
			async showProductByIdData(applyNo,productId) {
				try {
					const res = await showProductById({
						id: productId
					});
					if(res.errorCode == 0) {
						let product = res.dataBody.product;
						setStore("product",product);//产品信息放入缓存
						if(product.filePath == "ZGCB_PAGE" || product.filePath == "HXYHV2" || product.filePath == "FMYH"){
							this.$router.push({
								path: product.filePath+'_loanDetail',
								query: {
									applyNo:applyNo,
									productId:productId
								}
							});
						}else {
							this.$router.push({
								path: 'loanDetail',
								query: {
									applyNo:applyNo,
									productId:productId
								}
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
			//跳转到详情页面
			toDetail(applyNo,productId){
				this.showProductByIdData(applyNo,productId);
			},
		}
	}
</script>

<style scoped>
	.page-infinite-loading {
		font-size: 0.18rem;
		text-align: center;
		height: 0.5rem;
		line-height: 0.5rem;
	}
	
	.noData {
		font-size: 0.18rem;
		text-align: center;
		line-height: 1.5rem;
	}
	.bank {
		width: 100%;
		margin-top: 0.15rem;
	}
	
	.bank .bank_loan {
		padding: 0.15rem 0.22rem;
		font-size: 0.25rem;
		background: #f9f9f9;
	}

	.bank .loan_bank{
		line-height: 0.6rem;
		display: -webkit-box;
		-webkit-box-pack: justify;
		background-color: #fff;
		padding: 0 0.22rem;
	}
	.bank .loan_bank h3 {
		padding-top: 0.1rem;
		color: #000;
		font-size: 0.25rem;
	}
	.bank .loan_bank span{
		padding-top: 0.12rem;
		font-size: 0.21rem;
		display: -webkit-box;
		color: #5489F1;
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
		float: right;
	    margin-top: 0.05rem;
	    font-size: 0.15rem;
	    color: #92969C;
	    text-align: right;
	}

	.bank_meg {
		font-size: 0.18rem;
		padding:0 0.4rem;
	}
	
	.bank_meg .bank_red {
		float: right;
	    font-size: 0.15rem;
	    color: #FF0000;
	    text-align: right;
	}
	.bank_meg div{
		padding: 0.1rem 0;
	}
	.bank_btn{
		background-color: #fff;
		padding-right: 0.22rem;
		line-height: 0.45rem;
		display: -webkit-box;
		-webkit-box-pack: end;
	}
	.bank_btn a{
		font-size: 0.18rem;
		color: #484B50;
		border: 0.01rem solid #92969C;
		border-radius: 1rem;
		margin: 0.2rem;
		display: block;
		width: 1rem;
		text-align: center;
	}
	.bank_btn a:active {
	    background-color: #484B50;
	    opacity: 0.5;
	    color:#fff;
	}
</style>