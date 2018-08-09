<template>
	<div>
		<headTop showBack="1" title="产品详情"></headTop>
		<div class="bank_loan">
			<h3><b>{{product.productName}}</b></h3>
			<div class="bank_name">
				<div class="bank_title">
					<template v-for="bank in bankList">
						<img v-if="bank.bankName == product.bankName" :src="'http://'+ bank.bankLogo" alt="">
					</template>

					<span>{{product.bankName}}</span>
				</div>
				<div class="bank_credit">
					<span class="blue">{{product.guaranteeTypeName}}</span>
					<span class="green">最快今日到账</span>
				</div>
			</div>
			<div style="clear:both;"></div>
			<div class="bank_meg">
				<div class="one"><b>{{product.maxLoanAmount}}万</b><span>最高额度</span></div>
				<div class="two"><b>{{product.rate}}</b><span>利率</span></div>
				<div class="three"><b>{{product.repaymentTerm}}个月</b><span>授信期限</span></div>
			</div>
		</div>
		<div class="content">
			<div class="list">
				<h3>业务流程</h3>
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
							<span class="circular"></span>
							<span class="line"></span>
						</dt>
						<dd>填写申请</dd>
					</dl>
					<dl>
						<dt>
							<span class="line"></span>
								<span class="circular"></span>
								<span class="line"></span>
							</dt>
						<dd>平台初审</dd>
					</dl>
					<dl v-if="product.filePath == 'ZGCB_PAGE' || product.filePath == 'HXYHV2'">
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
					<dl v-if="product.filePath == 'HXYHV2'">
						<dt>
							<span class="line"></span>
								<span class="circular"></span>
								<span class="line"></span>
							</dt>
						<dd>开户借款</dd>
					</dl>
					<dl v-if="product.filePath == 'ZGCB_PAGE'">
						<dt>
							<span class="line"></span>
								<span class="circular"></span>
								<span class="line"></span>
							</dt>
						<dd>开户&签订合同</dd>
					</dl>	
					<dl v-if="product.filePath == 'ZGCB_PAGE'">
						<dt>
							<span class="line"></span>
							<span class="circular"></span>
						</dt>
						<dd>立即放款</dd>
					</dl>
					<dl v-if="product.filePath != 'ZGCB_PAGE'">
						<dt>
							<span class="line"></span>
							<span class="circular"></span>
						</dt>
						<dd>贷款完成</dd>
					</dl>
				</div>
			</div>
			<div class="list">
				<h3>产品说明</h3>
				<div class="list_cont">
					<ul>
						<li><i>还款方式</i><span>{{product.repaymentName }}</span></li>
						<li><i>担保方式</i><span>{{product.guaranteeTypeName }}</span></li>
						<li><i>开放城市</i><span>{{product.remark }}</span></li>
						<li><i>产品介绍</i><span>{{product.productDetail }}</span></li>
					</ul>
					<div class="more">
						<a href="javascript:void(0);" @click="detailMore">
							<span>更多产品详情</span>
							<i>了解更多详情</i>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="btn">
			<a href="javascript:void(0);" class="apply" @click="applyProduct">立即申请</a>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import {getUserInfo,getProductAreaInApply, getAllBank, showProductById } from "@/api/getData"
	import { Toast } from 'mint-ui';
	import { setStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				bankList: [],
				product: {},
				cityArr:[],
			}
		},
		activated() {
			this.getAllBankData();
			this.showProductByIdData(this.$route.query.productId);
			this.getProductAreaInApplyData(this.$route.query.productId);
		},
		components: {
			headTop,
		},
		methods: {
			//查询产品详情
			async getUserInfoData(callback) {
				try {
					const res = await getUserInfo();
					if(res == undefined){
						Toast({
						  	message: '请重新登录！',
						});
						return false;
					}
					if(res.errorCode == 0) {
						let userMap = res.dataBody.userMap;
						let selectedEtrMap = res.dataBody.selectedEtrMap;
						let userCorpList = res.dataBody.userCorpList;
						setStore("userMap",userMap);
						setStore("selectedEtrMap",selectedEtrMap);//缓存企业信息
						//判断用户类型
						if(userMap.user_type == 0){
							if(userCorpList.length > 0 && selectedEtrMap){
								//默认企业的税号
								callback(selectedEtrMap.corp_location_code);
							}else{
								Toast({
								  	message: '未绑定企业！',
								});
							}
						}else{
							Toast({
							  	message: '您不是企业用户,请更换企业账户,以便查看更多！',
							});
						}
					} else {
						Toast({
						  	message: '请重新登录！',
						});
					}
				} catch(err) {
					console.log('错误', err);
				}
			},
			//查询产品区域
			async getProductAreaInApplyData(productId){
				try {
					const res = await getProductAreaInApply({
						productId : productId
					});
					if(res.errorCode == 0){
						this.cityArr = [];
						var productAreaList = res.dataBody.productAreaList;
						productAreaList.forEach(item =>{
							this.cityArr.push(item.areaCode.toString());
						});
					}else{
						throw new Error(res.errorString);
					}				
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
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
			//查询产品详情
			async showProductByIdData(id) {
				try {
					const res = await showProductById({
						id: id
					});
					if(res.errorCode == 0) {
						this.product = res.dataBody.product;
						if(this.product.productRemark && JSON.parse(this.product.productRemark)) {
							let productRemark = JSON.parse(this.product.productRemark);
							this.product.remark = productRemark.Remark;
						} else {
							this.product.remark = "--";
						}
						setStore("product",this.product);//产品信息放入缓存
						//console.log(this.product.filePath)
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
			//更多产品详情
			detailMore(){
				this.$router.push({
					path: 'more_detail',
					query: {
						productId: this.product.id
					}
				});
			},
			//申请贷款
			applyProduct(){
				//不是华夏银行
				/*if(this.product.filePath != "HXYHV2"){
					Toast({
						message: "该产品暂未开放，不能申请,目前只开放华夏银行产品！",
					});
					return false;
				}*/
				let _this = this;
				_this.getUserInfoData(function(corpLocationCode){
					let codeSJ = corpLocationCode.slice(0,4)+"00";
					let codeXJ = corpLocationCode.slice(0,2)+"0000";
					if(_this.cityArr.indexOf(corpLocationCode)){
						setStore("location_code",corpLocationCode);
					}else if(_this.cityArr.indexOf(codeSJ)){
						setStore("location_code",codeSJ);
					}else if(_this.cityArr.indexOf(codeXJ)){
						setStore("location_code",codeXJ);
					}
					if(_this.cityArr.indexOf(corpLocationCode) != -1 || _this.cityArr.indexOf(codeSJ) != -1  || _this.cityArr.indexOf(codeXJ) != -1 ){	
						_this.$router.push({
							path: _this.product.filePath+'_apply',
							query: {
								productId: _this.product.id
							}
						});
							
					}else{
						Toast({
							message: "该产品的开放城市没有覆盖您所属的区域,不能申请,请重新选择产品！",
						});
					}
				});
			},
		}
	}
</script>

<style scoped>
	.bank_loan {
		padding: 0 0.375rem;
		margin-bottom: 0.15rem;
		background: #fff;
		font-size: 0.25rem;
	}
	
	.bank_loan h3 {
		padding-top: 0.15rem;
		color: #000;
		font-size: 0.25rem;
		text-align: center;
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
	
	.bank_meg .one {
		width: 40%;
	}	
	.bank_meg .two {
		width: 40%;
	}	
	.bank_meg .three {
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
	
	.content {
		width: 100%;
		font-size: 0.15rem;
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
	
	.more {
		padding: 0 0.15rem;
		height: 0.66rem;
		line-height: 0.66rem;
		color: #5489f1;
	}
	
	.more a {
		display: -webkit-box;
		-webkit-box-pack: justify;
	}
	
	.more a span {
		display: block;
		color: #5489f1;
		font-size: 0.21rem;
		padding-left: 0.3rem;
	}
	.more a i {
	    display: block;
	    color: #dddddd;
	    font-size: 0.18rem;
	    padding: 0 0.15rem;
	    background: url(../../static/right.png) right center no-repeat;
	    background-size: 0.12rem;
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
</style>