<template>
	<div>
		<headTop showBack="1" title="完善资料"></headTop>
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
		<div class="list">
			<div class="list_tip">
				<img src="../../static/caution.png"/>
				<span>请您如实填写信息，工作人员会尽快与您联系</span>
			</div>
			<h3>补充邮寄地址信息</h3>
			<div class="list_cont">
				<div class="form">
					<p class="other">
						<label><span>*</span>邮寄地址:</label>
						<input type="text" v-model="region" placeholder="请选择省、市、区县" @click="showAddressPicker" readonly="readonly">
						<i class="right">&nbsp;</i>
					</p>
					<p>
						<label><span>*</span>详细地址:</label>
						<input type="text" placeholder="请输入详细地址" v-model="applyFrom.mailad">
					</p>
					<p>
						<label><span>*</span>地址邮政编码:</label>
						<input type="number" placeholder="请输入地址邮政编码" v-model="applyFrom.postalcode">
					</p>
				</div>
			</div>
			<mt-popup v-model="regionVisible" position="bottom" class="region-popup">
				<div class="picker-toolbar">
					<span class="mint-datetime-action mint-datetime-cancel" @click="closeAddressPicker">取消</span> 
					<span class="mint-datetime-action mint-datetime-confirm" @click="okAddressPicker">确定</span>
				</div>
        		<mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount ="5" @change="addressChange" :itemHeight="40"></mt-picker>  
      		</mt-popup>  
			<h3>补充证件信息</h3>
			<div class="list_cont">
				<div class="form">
					<p>
						<label style="width:40%"><span>*</span>身份证是否长期有效:</label>
						<input type="radio" name="isyx" value="Y" v-model="applyFrom.isyx" v-on:change="change"><span class="radio-tet">是</span>
						<input type="radio" name="isyx" value="N" v-model="applyFrom.isyx" v-on:change="change"><span class="radio-tet">否</span>
					</p>
					<p>
						<label><span>*</span>身份证到期日:</label>
						<input type="text" v-if="applyFrom.isyx == 'Y'"  placeholder="请选择身份证到期日" v-model="applyFrom.efctdt" disabled="true">
						<input type="text" v-if="applyFrom.isyx == 'N'"  placeholder="请选择身份证到期日" v-model="applyFrom.efctdt" @click="openPicker('efctdt')" readonly="readonly">	
					</p>
				</div>
			</div>
			<h3>补充企业信息</h3>
			<div class="list_cont">
				<div class="form">
					<p class="other">
						<label><span>*</span>企业所属行业门类:</label>
						<input type="text" placeholder="请选择企业所属行业门类" v-model="hyml"  @click="showHymlPicker" :disabled="bigData"  readonly="readonly">
						<i class="right">&nbsp;</i>
						<mt-popup v-model="hymlVisible" position="bottom" class="region-popup">  
							<div class="picker-toolbar">
								<span class="mint-datetime-action mint-datetime-cancel" @click="closeHymlPicker">取消</span> 
								<span class="mint-datetime-action mint-datetime-confirm" @click="okHymlPicker">确定</span>
							</div>
        					<mt-picker :slots="hymlListSlots" valueKey="name" :visibleItemCount ="5" @change="onHymlChange" :itemHeight="40"></mt-picker>  
      					</mt-popup>
					</p>
					<p class="other">
						<label><span>*</span>企业所属行业大类:</label>
						<input type="text" placeholder="请选择企业所属行业大类" v-model="hydl"  @click="showHydlPicker" :disabled="bigData"  readonly="readonly">
						<i class="right">&nbsp;</i>
						<mt-popup v-model="hydlVisible" position="bottom" class="region-popup">  
							<div class="picker-toolbar">
								<span class="mint-datetime-action mint-datetime-cancel" @click="closeHydlPicker">取消</span> 
								<span class="mint-datetime-action mint-datetime-confirm" @click="okHydlPicker">确定</span>
							</div>
        					<mt-picker :slots="hydlListSlots" valueKey="hymc" :visibleItemCount ="5" @change="onHydlChange" :itemHeight="40"></mt-picker>  
      					</mt-popup>
					</p>
					<p class="other">
						<label for=""><span>*</span>企业所属行业中类:</label>
						<input type="text" placeholder="请选择企业所属行业中类" v-model="hyzl"  @click="showHyzlPicker"  readonly="readonly">
						<i class="right">&nbsp;</i>
						<mt-popup v-model="hyzlVisible" position="bottom" class="region-popup">  
							<div class="picker-toolbar">
								<span class="mint-datetime-action mint-datetime-cancel" @click="closeHyzlPicker">取消</span> 
								<span class="mint-datetime-action mint-datetime-confirm" @click="okHyzlPicker">确定</span>
							</div>
        					<mt-picker :slots="hyzlListSlots" valueKey="hymc" :visibleItemCount ="5" @change="onHyzlChange" :itemHeight="40"></mt-picker>  
      					</mt-popup>
					</p>
					<p class="other">
						<label for=""><span>*</span>企业所属行业小类:</label>
						<input type="text" placeholder="请选择企业所属行业小类" v-model="hyxl"  @click="showHyxlPicker" :disabled="smallData"  readonly="readonly">
						<i class="right">&nbsp;</i>
						<mt-popup v-model="hyxlVisible" position="bottom" class="region-popup">  
							<div class="picker-toolbar">
								<span class="mint-datetime-action mint-datetime-cancel" @click="closeHyxlPicker">取消</span> 
								<span class="mint-datetime-action mint-datetime-confirm" @click="okHyxlPicker">确定</span>
							</div>
        					<mt-picker :slots="hyxlListSlots" valueKey="hymc" :visibleItemCount ="5" @change="onHyxlChange" :itemHeight="40"></mt-picker>  
      					</mt-popup>
					</p>
					<p>
						<label><span>*</span>企业经营地址:</label>
						<input type="text" placeholder="请输入企业经营地址" required='不能为空' v-model="applyFrom.address">
					</p>
				</div>
			</div>
			<h3>补充其他信息</h3>
			<div class="list_cont">
				<div class="form">
					<p>
						<label><span>*</span>从事本行业日期:</label>
						<input type="text" v-model="applyFrom.jrbhyrq" placeholder="请选择从事本行业年限" @click="openPicker('jrbhyrq')">
					</p>
					<p>
						<label style="width:40%"><span>*</span>现工作单位加入日期:</label>
						<input type="text" placeholder="请选择现单位加入日期" required='不能为空' v-model="applyFrom.workrq" @click="openPicker('workrq')" readonly="readonly">
					</p>
				</div>
			</div>
			<h3>签署征信授权协议</h3>
			<div class="list_cont">
				<div class="form">
					<p class="agree" id="agreeBox">
						<input type="checkbox" v-model="checkBox" class="agree"></b>
						<span>我已阅读并同意<a href="javascript:;" @click="toAgree" class="angents">《华夏银行个人征信授权书》</a></span>
					</p>
					<p>
						<label><span>*</span>您预留手机号:</label>
						<input type="text" placeholder="请输入手机号码" maxlength="11" style="width:35%;" disabled="true" v-model="contactMobile">
						<a href="javascript:void(0);" class="btn" v-show="isCodeSend" @click="sendHxhzMobileVerifyCode">获取验证码</a>
						<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
					</p>
					<p>
						<label><span>*</span>短信验证码:</label>
						<input type="number" placeholder="请输入短信验证码" style="width:35%;" v-model="code">
						<i class="cancel" @click="cancel">&nbsp;</i>
					</p>
				</div>
			</div>	
		</div>
		<div class="btn">
			<a href="javascript:void(0);" class="apply" @click="submitApply">提交</a>
		</div>
		<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" :visibleItemCount=5 month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>	
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { getAllApplyByApply, sendHxhzMobileVerifyCode, submitApplyStepTwoHxhzyh, getHydmByBigData, getHydm, getHxyhDictInfo } from "@/api/getData"
	import { Toast, Indicator, DatetimePicker, Picker, Popup } from 'mint-ui';
	import { getStore, isPhoneVailable } from "@/config/mUtils"
	import { IdentityCodeValid } from "@/api/checkCard"
	import { luhmCheck } from "@/api/luhn"
	import { moment } from '@/api/moment'// 格式化时间
  	import threeLevelAddress from '@/api/hxyh_dict.json'  
	export default {
		data() {
			return {
				bankList: [],
				product: {},
				selectedEtrMap: {},
				applyFrom: {
					mailad : "",
					postalcode : "",
					isyx : "N",
					efctdt : "",
					schyxl : "",
					address : "",
					jrbhyrq : "",
					workrq : ""
				},
				hyml: "",
				hydl: "",
				hyzl: "",
				hyxl:"",
				contactMobile: "",
				code: "", //短信验证码
				smsCodeId :"",
				checkBox: false, //是否同意协议
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true,
      			startDate: new Date(),
      			endDate: new Date('2100-1-1'),
      			regionVisible:false,//弹出框是否可见
        		regionInit:false,
        		hymlVisible: false,//门类弹出框是否可见
        		hydlVisible: false,//大类弹出框是否可见
        		hyzlVisible: false,//中类弹出框是否可见
        		hyxlVisible: false,//小类弹出框是否可见
        		region:'',//三级地址  
		        province:'',//省  
		        city:'',//市  
		        county:'',//县  
		        provinceCode:'',//省级代码  
		        cityCode:'', //市级代码  
		        countyCode:'',//县级代码  
      			//picker组件插槽  
		        myAddressSlots: [  
		          	//省  
		          	{  
		            	flex: 1,  
		            	values: this.getProvinceArr(), //省份数组  
		            	className: 'slot1',  
		            	textAlign: 'center',
		            	defaultIndex:0
		          	},  
		           	//分隔符  
		          	{  
		            	divider: true,  
		            	content: '',  
		            	className: 'slot2'  
		          	},  
		          	//市  
		          	{		  
		            	flex: 1,  
		            	values: this.getCityArr("北京"),  
		            	className: 'slot3',  
		            	textAlign: 'center',
		            	defaultIndex:0
		          	},  
		          	{  
		            	divider: true,  
		            	content: '',  
		            	className: 'slot4'  
		          	},  
		          	//县  
		          	{  
		            	flex: 1,  
		            	values: this.getCountyArr("北京","市辖区"),
		            	className: 'slot5',  
		            	textAlign: 'center',
		            	defaultIndex:0
		          	}
		        ], 
		        hymlListSlots:[
		        	{  
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        hydlListSlots:[
		        	{  
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        hyzlListSlots:[
		        	{  
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        hyxlListSlots:[
		        	{  
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        tempValue:"",//分类临时值
		        bigData:false,//大数据是否有值
		        smallData:false,
			}
		},
		created() {
			//移动端获取
			if(typeof(NativeBridge) == "undefined") {
				window.NativeBridge = {};

				NativeBridge.getEntTaxId = function() {
					return "91110108MA001K7YXU";
				};
			}
			this.getHydmByBigData();
			this.getAllApplyByApply();			
		},
		components: {
			headTop,
			DatetimePicker,
			Picker,
			Popup 
		},
		methods: {
			//获取申请信息
			async getAllApplyByApply() {
				try {
					const res = await getAllApplyByApply({							
						applyNo: this.$route.query.applyNo
					});
					if(res.errorCode == "0") {
						let apply = res.dataBody.apply,
							inputPageOne = JSON.parse(apply.inputPageOne);
						this.contactMobile = apply.contactMobile;
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
			//发送手机验证码
			async sendHxhzMobileVerifyCode() {
				let mobile = this.contactMobile;
				let data = {
					applyNo: this.$route.query.applyNo,
					codeFor : "000001"
				}
				if(mobile == "") {
					Toast({
						message: '请填写手机号码',
					});
				} else if(isPhoneVailable(mobile)) {
					Toast({
						message: '请填写正确的手机号码',
					});
				} else {
					try {
						const res = await sendHxhzMobileVerifyCode(data);
						if(res.errorCode == "0") {
							let smsCodeid = data.dataBody.smsCodeId;
							this.smsCodeId = smsCodeid;
							Toast({
								message: '短信已发送，请查收！',
							});							
							this.countNum(data);
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
				}

			},
			//提交申请
			async submitApplyStepTwoHxhzyh() {
				let data = {
					applyNo : this.$route.query.applyNo,
					smsCode : this.code,
					smsCodeId : this.smsCodeId
				};
				this.applyFrom.mailadProvince = this.provinceCode;
				this.applyFrom.mailadCity = this.cityCode;
				this.applyFrom.mailadCounty = this.countyCode;
				this.applyFrom.mailadProvinceName = this.province;
				this.applyFrom.mailadCityName = this.city;
				this.applyFrom.mailadCountyName = this.county;
				data.inputPageTwo = JSON.stringify(this.applyFrom);
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				try {
					const res = await submitApplyStepTwoHxhzyh(data);
					if(res.errorCode == "0") {
						this.$router.push({
							path: 'hx_infoSuccess',
							query:{
								productId:productId,
								applyNo:applyNo
							},
						});
						Indicator.close();
					} else {
						throw new Error(res.errorString);
					}
				} catch(err) {
					console.log('错误', err);
					Indicator.close();
					Toast({
						message: err.toString(),
					});
				}
			},
			//遍历json，返回省级对象数组  
		    getProvinceArr() {  
		        let provinceArr = [];  
		        threeLevelAddress.forEach(function (item) {  
		          let obj = {};  
		          obj.name = item.name;  
		          obj.code = item.code;  
		          provinceArr.push(obj);  
		        }); 
		        return provinceArr;  
		    },  
		    //遍历json，返回市级对象数组  
		    getCityArr(province) {  
		        //console.log("省：" + province);
		        let cityArr = [];  
		        threeLevelAddress.forEach(function (item) {  
		          if (item.name === province) {  
		            item.children.forEach(function (args) { 
		            	let obj = {};  
		              	obj.name = args.name;  
		              	obj.code = args.code;  
		              	cityArr.push(obj); 
		            });  
		          }  
		        });  
		        return cityArr;  
		    },  
		    //遍历json，返回县级对象数组  
		    getCountyArr(province,city){  
		        let countyArr = [];  
		        threeLevelAddress.forEach(function(item){  
		          if (item.name === province){  
		            item.children.forEach(function (args) {  
		              if (args.name === city){  
		                args.children.forEach(function (param) {  
		                  let obj = {};  
		                  obj.name=param.name;  
		                  obj.code=param.code;  
		                  countyArr.push(obj);  
		                })  
		              }  
		            });  
		          } 
		        });  
		        // console.log(countyArr);  
		        return countyArr;  
		    },  
			//跳转授权协议
			toAgree() {
				this.$router.push({
					path: 'hx_agreement',
					query: {
						applyNo: this.$route.query.applyNo,
					}
				});
			},
			//验证码倒计时
			countNum(data) {
				clearTimeout(this.timeoutCount);
				let _this = this;
				if(this.countDown > 0) {
					this.isCodeSend = false;
					this.timeoutCount = setTimeout(function() {
						_this.countNum(data);
					}, 1000);
					this.countDown = this.countDown - 1;
				} else {
					this.isCodeSend = true;
					this.countDown = 60;
				}
			},
			//验证数据
			checkData() {
				let applyFrom = this.applyFrom;
				if(applyFrom.mailad == "") {
					Toast({
						message: '请输入详细地址',
					});
					return false;
				} else if(this.region == ""){
					Toast({
						message: '请输入选择省、市、区县',
					});
					return false;
				} else if(applyFrom.postalcode == "") {
					Toast({
						message: '请输入邮寄地址',
					});
					return false;
				} else if(!/^(?!\d+$)([\u4e00-\u9fa5]|[\w]){1,150}$/.test(applyFrom.postalcode)) {
					Toast({
						message: '邮寄地址不允许输入纯数字或标点符号,长度最多150',
					});
					return false;
				} else if(applyFrom.efctdt == "") {
					Toast({
						message: '请选择身份证到期日',
					});
					return false;
				} else if(this.hyml == "") {
					Toast({
						message: '请选择企业所属行业门类',
					});
					return false;
				} else if(this.hydl == "") {
					Toast({
						message: '请选择企业所属行业大类',
					});
					return false;
				} else if(this.hyzl == "") {
					Toast({
						message: '请选择企业所属行业中类',
					});
					return false;
				} else if(applyFrom.schyxl == "") {
					Toast({
						message: '请选择企业所属行业小类',
					});
					return false;
				} else if(applyFrom.address == "") {
					Toast({
						message: '请输入企业经营地址',
					});
					return false;
				} else if(!/^(?!\d+$)([\u4e00-\u9fa5]|[\w]){1,150}$/.test(applyFrom.address)) {
					Toast({
						message: '企业经营地址不允许输入纯数字或标点符号,长度最多150',
					});
					return false;
				}  else if(applyFrom.jrbhyrq == "") {
					Toast({
						message: '请选择从事本行业年限',
					});
					return false;
				} else if(applyFrom.workrq == "") {
					Toast({
						message: '请选择现单位加入日期',
					});
					return false;
				}else if(this.code == "") {
					Toast({
						message: '请输入短信验证码',
					});
					return false;
				}
				return true;
			},
			//提交申请按钮
			submitApply() {
				if(this.checkBox) {
					if(this.checkData()) {
						this.submitApplyStepTwoHxhzyh();
					}
				} else {
					Toast({
						message: '请确认并同意《华夏银行个人征信授权书》',
					});
				}
			},
			change (){
				if(this.applyFrom.isyx == "Y"){
					this.applyFrom.efctdt = "长期";
				}
			},
			cancel (){
				this.code = "";
			},
			//日期
			openPicker (type) {
				this.type=type;
				if(type == "efctdt"){
		      		this.startDate = new Date();
		      		this.endDate = new Date('2100-1-1');
		      	}else if(type == "jrbhyrq"){
		      		this.startDate = new Date('1990-1-1');
		      		this.endDate = new Date();
		      	}else if(type == "workrq"){
		      		this.startDate = new Date('2000-1-1');
		      		this.endDate = new Date();
		      	}
		      	this.$refs.picker.open(type)
		    },
		    handleConfirm (data) {		    	
		      	let date = moment(data).format('YYYY-MM-DD');
		      	if(this.type == "efctdt"){
		      		this.applyFrom.efctdt = date;
		      	}else if(this.type == "jrbhyrq"){
		      		this.applyFrom.jrbhyrq = date;
		      	}else if(this.type == "workrq"){
		      		this.applyFrom.workrq = date;
		      	}
		    },
		    //省市
		    showAddressPicker(){  
		        this.regionVisible = true;  
		    }, 
		    closeAddressPicker(){  
		        this.regionVisible = false;  
		    }, 
		    okAddressPicker(){
		    	this.region = this.province + this.city + this.county;
		    	this.closeAddressPicker();
		    },
		    //显示门类
		    showHymlPicker(){
		    	this.hymlVisible = true; 
		    },
		    closeHymlPicker(){  
		        this.hymlVisible = false;  
		    }, 
		    okHymlPicker(){
		    	this.hyml = this.tempValue;
		    	this.getHydm("hydl","",this.hyml);
		    	this.closeHymlPicker();
		    },
		    //显示大类
		    showHydlPicker(){
		    	this.hydlVisible = true; 
		    },
		    closeHydlPicker(){  
		        this.hydlVisible = false;  
		    }, 
		    okHydlPicker(){
		    	this.hydl = this.tempValue.hymc;
		    	this.getHydm("hyzl",this.tempValue.hydm,"");
		    	this.closeHydlPicker();
		    },
		     //显示中类
		    showHyzlPicker(){
		    	this.hyzlVisible = true; 
		    },
		    closeHyzlPicker(){  
		        this.hyzlVisible = false;  
		    }, 
		    okHyzlPicker(){
		    	this.hyzl = this.tempValue.hymc;
		    	this.getHydm("hyxl",this.tempValue.hydm,"");
		    	this.closeHyzlPicker();
		    },
		    //显示小类
		    showHyxlPicker(){
		    	this.hyxlVisible = true; 
		    },
		    closeHyxlPicker(){  
		        this.hyxlVisible = false;  
		    }, 
		    okHyxlPicker(){
		    	this.hyxl = this.tempValue.hymc;
		    	this.applyFrom.schyxl = this.tempValue.hydm;
		    	this.closeHyxlPicker();
		    },
		    onValuesChange(picker, values) {
		      	if (values[0] > values[1]) {
		        	picker.setSlotValue(1, values[0]);
		      	}
		    },
		    addressChange(picker, values){ 
		        if (this.regionInit){  
		          	//取值并赋值  
		          	this.province = values[0]["name"];  
		          	this.city = values[1]["name"];  
		          	this.county = values[2]["name"];  
		          	this.provinceCode = values[0]["code"];  
		          	this.cityCode = values[1]["code"];  
		          	this.countyCode = values[2]["code"];  
		          	let cityArr = this.getCityArr(values[0]["name"]);
		          	//给市、县赋值  
		          	picker.setSlotValues(1, cityArr);  
		          	picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
		          	console.log(picker)

		        }else {  
		          	this.regionInit = true;  
		        } 
		    },
		    onHymlChange(picker, values){
		    	this.tempValue = values[0];
		    },
		    onHydlChange(picker, values){
		    	this.tempValue = values[0];
		    },
		    onHyzlChange(picker, values){
		    	this.tempValue = values[0];
		    },
		    onHyxlChange(picker, values){
		    	this.tempValue = values[0];
		    },
		    //获取大数据所有行业分类
		    async getHydmByBigData() {
				try {
					const res = await getHydmByBigData({							
						nsrsbh: NativeBridge.getEntTaxId()
//						nsrsbh:"930696764387"
					});
					if(res.errorCode == "0") {
						if(res.dataBody.hyml){
							this.hyml = res.dataBody.hyml;
							this.hydl = res.dataBody.hydl.hymc;
							this.hyzlListSlots[0].values = res.dataBody.hydmList;
							this.bigData = true;
						}else{
							this.getHydm("hyml","","");
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
			async getHydm(hydmFlag, hydm, hyml) {
				try {
					const res = await getHydm({							
						hydmFlag : hydmFlag,
						hydm : hydm,
						hyml : hyml
					});
					if(res.errorCode == "0") {
						let hydmList = res.dataBody.hydmList;
						if(hydmFlag == "hyml"){
							this.hymlListSlots[0].values = hydmList;//门类
						}else if(hydmFlag == "hydl"){
							this.hydlListSlots[0].values = hydmList;//大类
						}else if(hydmFlag == "hyzl"){
							this.hyzlListSlots[0].values = hydmList;//中类
						}else if(hydmFlag == "hyxl"){
							if(hydmList.length>0){
								this.smallData = false;
								this.hyxlListSlots[0].values = hydmList;//小类
							}else{
								this.smallData = true;
								this.hyxl = this.tempValue.hymc;
		    					this.applyFrom.schyxl = this.tempValue.hydm;
							}
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
			
		},
	}
</script>

<style scoped>
	.bank_loan {
		padding: 0 0.375rem;
		margin-bottom: 0.15rem;
		background: #fff;
		font-size: 0.25rem;
		padding-top: 0.1rem;
	}
	
	.bank_loan b {
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
	
	.bank_meg div {
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
	}
	
	.list h3 {
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0 0.47rem;
		position: relative;
		border-bottom: #f2f3f4 solid 0.015rem;
		font-weight: bold;
		font-size: 0.21rem;
		background: #fff;
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
	.list_cont{
		margin-bottom: 0.2rem;
		background: #fff;
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
	.form p {
		padding: 0.2rem 0;
		border-bottom: #f2f3f5 solid 0.015rem;
		display: -webkit-box;
		-webkit-box-align: center;
	}
	
	.form .info {
		font-size: 0.15rem;
		color: #FF5661;
		padding: 0.1rem 0.45rem;
	}
	
	.form .btn {
		font-size: 0.18rem;
		color: #5489F1;
		padding: 0 0.1rem;
	}
	
	.form .closeBtn {
		font-size: 0.18rem;
		color: grey;
		padding: 0 0.1rem;
		display: -webkit-box;
	}
	
	.form p .right {
		display: block;
		color: #dddddd;
		font-size: 0.18rem;
		padding-left: 0.45rem;
		background: url(../../static/right.png) right center no-repeat;
		background-size: 0.12rem;
	}
	
	.form p .cancel {
		display: block;
		color: #dddddd;
		font-size: 0.18rem;
		padding-left: 0.25rem;
		background: url(../../static/cancel.png) right center no-repeat;
		background-size: 0.17rem;
	}
	
	.form p>label {
		display: block;
		color: #484B50;
		width: 35%;
		font-size: 0.21rem;
		padding-left: 0.3rem;
	}
	
	.form p>label span {
		color: #fc0000;
		padding-right: 0.06rem;
	}
	
	.form .other_lab {
		width: 10%;
	}
	
	.form p>input {
		width: 58%;
		display: block;
		border: none;
		height: 0.4rem;
		font-size: 0.21rem;
		color: #92979d;
	}
	
	.form p.other>input {
		width: 45%;
	}
	
	.agree {
		padding: 0.2rem 0.3rem;
		height: 0.2rem;
		position: relative;
	}
	
	.agree input[type="checkbox"] {
		width: 0.18rem;
		height: 0.18rem;
		margin-left: 0.15rem;
		margin-top: 0.03rem;
		float: left;
	}
	
	.agree span {
		display: inline-block;
		font-size: 0.18rem;
		position: absolute;
		left: 0.7rem;
	}
	
	.agree .angents {
		color: #5489f1;
	}
	.list_tip{
      	margin-top: 0.15rem;
		height: 0.45rem;
		background: #FFF7EA;
		display: flex;
		align-items: center;
	}
	.list_tip img{
      	padding: 0 0.15rem 0 0.3rem;
		width: 0.225rem;
	}
	.list_tip span{
		font-size:0.15rem;
		color: #FEB542;
	}
	.form p>input[type=radio]{
		width: 0.18rem;
		margin: 0 0.1rem;
	}
	.radio-tet{
		font-size: 0.2rem;
		display: block;
	}
	input:disabled{
		background-color:#FFF;
	}
	.region-popup{  
    	width: 100%;  
  	} 
  	.picker-toolbar{
	    height:0.6rem;
	    background-color: #F2F3F4;
	}
	.mint-datetime-action{
		line-height: 0.6rem;
		color:#484B50;
		font-size: 0.21rem;
	}
</style>