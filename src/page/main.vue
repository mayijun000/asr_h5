<template>
	<div>		
		<headTop title="金融服务"></headTop>
		<nav class="navClass">
			<ul class="navList">
				<li :class="{'nav-on':nav}" @click="navClick(1)">借款</li>
				<li :class="{'nav-on':!nav}" @click="navClick(2)">理财</li>
			</ul>
		</nav>
		<mt-navbar v-model="sortValue" v-if="nav">
			<mt-tab-item id="1" @click.native="sortProductList">默认排序</mt-tab-item>
			<mt-tab-item id="2" @click.native="sortProductList" :class="{'sort':sortClass2,'reverse':!sortClass2,'isSort':!sortClass2}">授信额度</mt-tab-item>
			<mt-tab-item id="3" @click.native="sortProductList" :class="{'sort':sortClass3,'reverse':!sortClass3,'isSort':!sortClass3}">授信权限</mt-tab-item>
			<mt-tab-item id="4" @click.native="openFilter" class="filter"><span class="filterImg"></span>筛选</mt-tab-item>
		</mt-navbar>
		<!-- 产品列表 -->
		<div class="page-infinite-wrapper" v-if="nav && productTotal > 0">
			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
				<li v-for="item in productlist">
					<div class="bank" @click="toDetail(item.id)">
						<div class="bank_loan">
							<h3><b>{{item.productName}}</b></h3>
							<div class="bank_name">
								<div class="bank_title">
									<template v-for="bank in bankList">
										<img v-if="bank.bankName == item.bankName" :src="'http://'+ bank.bankLogo" alt="">
									</template>

									<span>{{item.bankName}}</span>
								</div>
								<div class="bank_credit">
									<span class="blue">{{item.guaranteeTypeName}}</span>
									<span class="green">最快今日到账</span>
								</div>
							</div>
							<div style="clear:both;"></div>
							<div class="bank_meg">
								<div class="one"><b>{{item.maxLoanAmount}}万</b><span>最高额度</span></div>
								<div class="two"><b>{{item.rate}}</b><span>利率</span></div>
								<div class="three"><b>{{item.repaymentTerm}}个月</b><span>授信期限</span></div>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<p class="page-infinite-loading" v-show="loading">
				<mt-spinner type="fading-circle"></mt-spinner>加载中...
			</p>
		</div>
		<div class="noData" v-if="nav && productTotal < 1">{{nodata}}</div>
		<!--理财列表-->
		<div class="bank" @click="toFuminbao" v-if="!nav">
			<div class="bank_loan">
				<h3><b>富民宝</b></h3>
				<div class="bank_meg">
					<div style="width:30%"><b>4.2%</b><span>年化</span></div>
					<div style="width:60%"><b style="color:#484B50;font-size: 0.18rem;">富民银行旗下产品</b><span>本金安全 灵活存取</span></div>
				</div>
			</div>
		</div>
		<section class="filterPage" id="filter" v-show="showFilter">
			<section class="mask" id="mask"></section>
			<section class="side">
				<headTop showBack="2" v-on:close="closeFilter" title="筛选"></headTop>
				<section class="filter_scroll">
					<section class="content">
						<div class="list">
							<h3>地区</h3>
							<ul>
								<li class="ddopxx unlimit" :class="{'bggg':provinceCurrent==0}" @click="noSelectAddress">不限</li>
								<div style="clear:both;"></div>
							</ul>
							<mt-navbar v-model="addressItem" style="background-color: inherit;">
								<mt-tab-item id="1" class="addressClass">省份</mt-tab-item>
								<mt-tab-item id="2" class="addressClass">市区</mt-tab-item>
							</mt-navbar>
							<mt-tab-container v-model="addressItem">
								<mt-tab-container-item id="1">
									<ul>
										<li class="ddopxx" :class="{'bggg':index==provinceCurrent}" v-for="(item, index) in allProvince" @click="provinceSelect(index)">{{item}}</li>
										<div style="clear:both;"></div>
									</ul>
								</mt-tab-container-item>
								<mt-tab-container-item id="2">
									<ul>
										<li class="ddopxx" :class="{'bggg':item.code==cityCurrent}" v-for="(item, index) in cityByProvince" @click="citySelect(item.code)">{{item.name}}</li>
										<div style="clear:both;"></div>
									</ul>
								</mt-tab-container-item>
							</mt-tab-container>
						</div>
						<div class="list">
							<h3>授信期限</h3>
							<ul>
								<li class="ddopxx" :class="{'bggg':index==xxqxCurrent}" v-for="(item, index) in xxqxList" @click="xxqxSelect(index)">{{item}}</li>
								<div style="clear:both;"></div>
							</ul>
						</div>
						<div class="list">
							<h3>还款方式</h3>
							<ul>
								<li class="ddopxx" :class="{'bggg':index==hkfsCurrent}" v-for="(item, index) in hkfsList" @click="hkfsSelect(index)">{{item}}</li>
								<div style="clear:both;"></div>
							</ul>
						</div>
						<div class="list">
							<h3>担保类型</h3>
							<ul>
								<li class="ddopxx" :class="{'bggg':index==dblxCurrent}" v-for="(item, index) in dblxList" @click="dblxSelect(index)">{{item}}</li>
								<div style="clear:both;"></div>
							</ul>
						</div>
					</section>
				</section>
				<section class="filter_btn">
					<div>
						<mt-button class="reset" @click="resetFilter">重置</mt-button>
					</div>
					<div>
						<mt-button class="ok" @click="filterFind">确定</mt-button>
					</div>
				</section>
			</section>

		</section>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { Toast } from 'mint-ui';
	import { bsxApp, getUserInfo, getAllProvince, getCityByProvince, showAllProduct, showProductByCondition, getAllBank, getGuaranteeList, getRefundList } from "@/api/getData"
	import { getSign, setStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				nav:true,//表示借款
				xxqxList: {
					"0": "不限",
					"6": "6个月",
					"9": "9个月",
					"12": "12个月",
					"24": "24个月",
					"36": "36个月"
				},
				hkfsList: {
					"NO_LIMIT": "不限",
				},
				dblxList: {
					"NO_LIMIT": "不限",
				},
				xxqxCurrent: 0, //选择授信下标值
				hkfsCurrent: "NO_LIMIT", //选择还款方式下标值
				dblxCurrent: "NO_LIMIT", //选择担保类型下标值
				sortValue: "",
				sortClass2: true,
				isSort2: true, //true 正序
				orderTypeCode: "DEFAULT_ORDER", //排序方式
				sortClass3: true,
				isSort3: true, //true 正序
				showFilter: false, //是否显示筛选
				addressItem: "1", //选择省还是市
				allProvince: {}, //所有省
				provinceCurrent: 0, //选择省下标值
				cityByProvince: [], //所有市区
				cityCurrent: 0, //选择市区下标值
				pageNum: 1, //当前页数
				productTotal: 0, //总条数
				productlist: [], //产品列表
				bankList: [], //所有银行logo
				loading: false, //加载动画
				nodata: "", //无数据展示
				location_code: "",
			};
		},
		components: {
			headTop,
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
			let params = {
				PageNum: 1,
				listType: "PRODUCT_DEFAULT"
			}
			//this.showAllProductData(params);
		},
		methods: {
			//菜单切换
			navClick(num){
				if(num == 1){
					this.nav = true;
				}else{
					this.nav = false;
				}
			},
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
						
						this.getUserInfoData();
					} else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
				}
			},			
			//查询用户详情
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
						if(userMap.user_type == 0){
							let selectedEtrMap = res.dataBody.selectedEtrMap;
							this.location_code = selectedEtrMap.corp_location_code;
							let params = {
								PageNum: 1,
								listType: "PRODUCT_DEFAULT",
								locationCode: this.location_code
							}
							this.showAllProductData(params);
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
			//排序逻辑
			sortProductList: function() {
				if(this.sortValue == "1") {
					this.orderTypeCode = "DEFAULT_ORDER";
				} else if(this.sortValue == "2") {
					if(this.isSort2 == true) {
						this.isSort2 = false;
						this.sortClass2 = true;
						this.orderTypeCode = "CREDIT_AMOUNT_ORDER_DESC";
					} else {
						this.sortClass2 = false;
						this.isSort2 = true;
						this.orderTypeCode = "CREDIT_AMOUNT_ORDER_ASC";
					}
					this.isSort3 = true;
					this.sortClass3 = true;
				} else if(this.sortValue == "3") {
					if(this.isSort3 == true) {
						this.isSort3 = false;
						this.sortClass3 = true;
						this.orderTypeCode = "CREDIT_DURATION_ORDER_DESC";
					} else {
						this.sortClass3 = false;
						this.isSort3 = true;
						this.orderTypeCode = "CREDIT_DURATION_ORDER_ASC";
					}
					this.isSort2 = true;
					this.sortClass2 = true;
				}
				//过滤查询
				this.filterFind();
			},
			//显示查询页面
			openFilter: function() {
				this.getAllProvinceData();
				this.getRefundListData();
				this.getGuaranteeListData();
				this.showFilter = true;
			},
			//关闭查询页面
			closeFilter: function() {
				this.showFilter = false;
				//判断排序的条件选中状态
				if(this.orderTypeCode == "CREDIT_AMOUNT_ORDER_DESC" || this.orderTypeCode == "CREDIT_AMOUNT_ORDER_ASC") {
					this.sortValue = "2";
				} else if(this.orderTypeCode == "CREDIT_DURATION_ORDER_DESC" || this.orderTypeCode == "CREDIT_DURATION_ORDER_ASC") {
					this.sortValue = "3";
				} else {
					this.sortValue = "";
				}
			},
			//重置查询条件
			resetFilter: function() {
				this.provinceCurrent = 0;
				this.cityCurrent = 0;
				this.addressItem = "1";
				this.xxqxCurrent = 0; //选择授信下标值
				this.hkfsCurrent = "NO_LIMIT"; //选择还款方式下标值
				this.dblxCurrent = "NO_LIMIT"; //选择担保类型下标值
				this.closeFilter(); //关闭过滤窗口
				let obj = {
					PageNum: this.pageNum,
					listType: "PRODUCT_DEFAULT",
					locationCode: this.location_code
				}
				this.showAllProductData(obj);
			},
			//过滤查询
			filterFind: function(callback) {
				let params = {
					PageNum: 1,
					orderTypeCode: this.orderTypeCode
				};
				if(this.hkfsCurrent != "NO_LIMIT") {
					params.repaymentCode = this.hkfsCurrent;
				}
				if(this.dblxCurrent != "NO_LIMIT") {
					params.guaranteeTypeCode = this.dblxCurrent;
				}
				if(this.xxqxCurrent != 0) {
					params.repaymentTerm = this.xxqxCurrent;
				}
				if(this.cityCurrent != 0) {
					params.areaCode = this.cityCurrent;
				}
				if(callback == undefined) {
					this.productlist = []; //先清空列表，分页不清空
				}

				this.closeFilter(); //关闭过滤窗口
				//判断是否有查询条件
				if(this.orderTypeCode == "DEFAULT_ORDER" && this.cityCurrent == 0 && this.xxqxCurrent == 0 && this.hkfsCurrent == "NO_LIMIT" && this.dblxCurrent == "NO_LIMIT") {
					let obj = {
						PageNum: this.pageNum,
						listType: "PRODUCT_DEFAULT",
						locationCode: this.location_code
					}
					this.showAllProductData(obj, callback);
				} else {
					this.showProductByConditionData(params, callback);
				}
			},
			//选择授信
			xxqxSelect: function(index) {
				this.xxqxCurrent = index;
				//event.target.classList.add("bggg");
			},
			//选择还款方式
			hkfsSelect: function(index) {
				this.hkfsCurrent = index;
			},
			//选择担保类型
			dblxSelect: function(index) {
				this.dblxCurrent = index;
			},
			//选择省
			provinceSelect: function(index) {
				this.provinceCurrent = index;
				this.addressItem = "2";
				this.getCityByProvinceData(index);
			},
			//选择市区
			citySelect: function(index) {
				this.cityCurrent = index;
			},
			//不选择地区
			noSelectAddress: function(index) {
				this.provinceCurrent = 0;
				this.cityCurrent = 0;
				this.addressItem = "1";
			},
			//获取省
			async getAllProvinceData() {
				try {
					const res = await getAllProvince();
					if(res.errorCode == 0) {
						this.allProvince = res.dataBody.allProvince;
					} else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
				}
			},
			//获取市区
			async getCityByProvinceData(provinceCode) {
				try {
					const res = await getCityByProvince({
						provinceCode: provinceCode
					});
					if(res.errorCode == 0) {
						this.cityByProvince = JSON.parse(res.dataBody.cityByProvince);
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
					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString()+err,
					});
				}
			},
			//查询产品列表
			async showAllProductData(params, callback) {
				try {
					const res = await showAllProduct(params);
					if(callback != undefined) {
						callback();
					}
					if(res.errorCode == 0) {
						res.dataBody.productlist.forEach(item => {
							this.productlist.push(item);
						});
						this.productTotal = res.dataBody.productAmount;
						if(this.productTotal == 0) {
							this.nodata = "无数据";
						}
					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
				}
			},
			//条件查询
			async showProductByConditionData(params, callback) {
				try {
					const res = await showProductByCondition(params);
					if(callback != undefined) {
						callback();
					}
					if(res.errorCode == 0) {
						if(this.pageNum == 1) {
							this.productlist = [];
						}
						res.dataBody.productlist.forEach(item => {
							this.productlist.push(item);
						});
						this.productTotal = res.dataBody.productTotal;
						if(this.productTotal == 0) {
							this.nodata = "无数据";
						}
					} else {
						if(this.productTotal == 0) {
							this.nodata = "系统异常";
						}
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
					totalPage = this.productTotal / 10;
				} else {
					totalPage = this.productTotal / 10 + 1;
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
			//查询担保类型
			async getGuaranteeListData() {
				try {
					const res = await getGuaranteeList();
					if(res.errorCode == 0) {
						for(let index in res.dataBody) {
							if(index != "NO_LIMIT") {
								this.dblxList[index] = res.dataBody[index];
							}
						}
					} else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
				}
			},
			//查询还款方式
			async getRefundListData() {
				try {
					const res = await getRefundList();
					if(res.errorCode == 0) {
						for(let index in res.dataBody) {
							if(index != "NO_LIMIT") {
								this.hkfsList[index] = res.dataBody[index];
							}
						}
					} else {
						throw new Error(res.errorString);
					}

				} catch(err) {
					console.log('错误', err);
				}
			},
			toDetail(id) {
				this.$router.push({
					path: 'product_detail',
					query: {
						productId: id
					}
				})
			},
			//跳转富民宝页面
			toFuminbao(){
				NativeBridge.fuminBankFinance();
			}

		},
	}
</script>

<style scoped>
	.navClass {
		width: 100%;
		height: 0.6rem;
		/* padding: 0 0.15rem; */
		background: #fff;
		border-bottom: #e9e9e9 solid 0.02rem;
	}
	
	.navList {
		height: 100%;
		text-align: center;
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-align: center;
	}
	
	.navList li {
		width: 30%;
		text-align: center;
		font-size: 0.21rem;
		line-height: 0.6rem;
		color: #474a4f;
	}
	
	.navList li.nav-on {
		color: #538aee;
		border-bottom: #007cff solid 0.04rem;
	}
	
	.sort {
		position: relative;
	}
	
	.sort:before {
		content: "";
		display: block;
		position: absolute;
		top: 22px;
		right: 0.1rem;
		width: 0;
		height: 0;
		border-left: 0.05rem solid transparent;
		border-right: 0.05rem solid transparent;
		border-top: 0.05rem solid #92969c;
	}
	
	.reverse {
		position: relative;
	}
	
	.reverse:before {
		content: "";
		display: block;
		position: absolute;
		top: 0.25rem;
		right: 0.1rem;
		width: 0;
		height: 0;
		border-left: 0.05rem solid transparent;
		border-right: 0.05rem solid transparent;
		border-bottom: 0.05rem solid #92969c;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 0;
	}
	
	.mint-navbar .mint-tab-item.is-selected:before {
		border-bottom: 0;
		border-top: 0.05rem solid #26a2ff;
	}
	
	.mint-navbar .mint-tab-item.isSort:before {
		border-top: 0;
		border-bottom: 0.05rem solid #26a2ff;
	}
	
	.filter {
		position: relative;
	}
	
	.filter .filterImg {
		display: block;
		position: absolute;
		top: 17px;
		left: 0.2rem;
		width: 0.225rem;
		height: 0.225rem;
		background: url(../static/filter.png) no-repeat;
		background-size: 100%;
	}
	
	.mint-navbar {
		border-bottom: 1px solid #DDDDDD;
	}
	
	.filterPage {
		width: 100%;
		font-size: 0.18rem;
	}
	
	.filterPage .mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 11;
	}
	
	.filterPage .side {
		width: 82%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: 11;
	}
	
	.filter_scroll {
		width: 100%;
		position: absolute;
		overflow: auto;
		top: 0.9rem;
		bottom: 0.9rem;
		padding-left: 0.15rem;
	}
	
	.filter_scroll .content {
		position: absolute;
	}
	
	.list {
		clear: both;
	}
	
	.list h3 {
		height: 0.4rem;
		line-height: 0.4rem;
		padding: 0 0.15rem;
		position: relative;
	}
	
	.list h3:before {
		content: "";
		width: 0.08rem;
		height: 0.2rem;
		background: #5489f1;
		border-radius: 0.05rem;
		position: absolute;
		left: 0;
		top: 0.1rem;
	}
	
	.list ul {
		width: 100%;
		margin-bottom: 0.15rem;
	}
	
	.list ul li.bggg {
		color: #5489f1;
	}
	
	.list ul li {
		float: left;
		width: 2rem;
		height: 0.4rem;
		background: #fff;
		margin-right: 0.15rem;
		margin-top: 0.15rem;
		color: #484b52;
		font-size: 0.15rem;
		text-align: center;
		line-height: 0.4rem;
	}
	
	.side .filter_btn {
		position: fixed;
		width: 82%;
		bottom: 0;
		display: -webkit-box;
		-webkit-box-orient: justify;
	}
	
	.filter_btn div {
		-webkit-box-flex: 1;
		display: -webkit-box;
		height: 0.8rem;
		width: 50%;
		font-size: 0.24rem;
	}
	
	.filter_btn div button {
		display: block;
		-webkit-box-flex: 1;
		text-align: center;
		line-height: 0.8rem;
		color: #fff;
	}
	
	.reset {
		background: #bdc0c7;
	}
	
	.ok {
		background: #5489f1;
	}
	
	.mint-button {
		border-radius: inherit;
		height: inherit;
	}
	
	.bank {
		width: 100%;
		margin-top: 0.15rem;
	}
	
	.bank .bank_loan {
		padding: 0 0.375rem;
		margin-bottom: 0.15rem;
		background: #fff;
		font-size: 0.25rem;
	}
	
	.bank .bank_loan h3 {
		padding-top: 0.15rem;
		color: #000;
		font-size: 0.25rem;
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
		margin-top: 0.08rem;
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
	
	.addressClass {
		flex: inherit;
		padding: 0.15rem 0.2rem;
		color: #000000;
	}
	
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
</style>