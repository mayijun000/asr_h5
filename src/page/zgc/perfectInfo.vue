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
		<div class="list">
			<div class="list_tip">
				<img src="../../static/caution.png"/>
				<span>请您如实填写信息，工作人员会尽快与您联系</span>
			</div>			
			<h3>完善个人信息</h3>			
			<form enctype="multipart/form-data">
				<div class="list_cont">
					<div class="form">
						<p>
							<label><span>&nbsp;</span>申请人姓名:</label>
							<input type="text" placeholder="请输入详细地址" v-model="applyFrom.contactPerson">
						</p>
						<p>
							<label><span>&nbsp;</span>申请人本行从业年限:</label>
							<input type="number" placeholder="请输入本行从业年限" v-model="applyFrom.tradeYears">
						</p>
						<p class="other">
							<label for=""><span>*</span>户籍:</label>
							<input type="text" placeholder="请选择户籍" required='不能为空' v-model="applyFrom.censusRegister" @click="showCensus" readonly="readonly">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="censusRegister" position="bottom" class="region-popup">  
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeCensus">取消</span> 
									<span class="mint-datetime-action mint-datetime-confirm" @click="okCensus">确定</span>
								</div>
	        					<mt-picker :slots="censusListSlots" valueKey="name" :visibleItemCount ="3" @change="onCensus" :itemHeight="50"></mt-picker>  
		      				</mt-popup>
						</p>
						<p class="other">
							<label for=""><span>*</span>婚姻状况:</label>
							<input type="text" placeholder="请选择婚姻状况" required='不能为空' v-model="applyFrom.marriage" @click="showMarriage" readonly="readonly">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="marriage" position="bottom" class="region-popup">  
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeMarriage">取消</span> 
									<span class="mint-datetime-action mint-datetime-confirm" @click="okMarriage">确定</span>
								</div>
	        					<mt-picker :slots="marriageListSlots" valueKey="name" :visibleItemCount ="3" @change="onMarriage" :itemHeight="50"></mt-picker>  
		      				</mt-popup>
						</p>
						<p class="other">
							<label for=""><span>*</span>子女情况:</label>
							<input type="text" placeholder="请选择子女情况" required='不能为空' v-model="applyFrom.children" @click="showChildren" readonly="readonly">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="children" position="bottom" class="region-popup">  
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeChildren">取消</span> 
									<span class="mint-datetime-action mint-datetime-confirm" @click="okChildren">确定</span>
								</div>
	        					<mt-picker :slots="childrenListSlots" valueKey="name" :visibleItemCount ="3" @change="onChildren" :itemHeight="50"></mt-picker>  
		      				</mt-popup>
						</p>
						<p class="other">
							<label for=""><span>*</span>住房状况:</label>
							<input type="text" placeholder="请选择住房状况" required='不能为空' v-model="applyFrom.housing" @click="showHouse" readonly="readonly">
							<i class="right">&nbsp;</i>
							<mt-popup v-model="house" position="bottom" class="region-popup">  
								<div class="picker-toolbar">
									<span class="mint-datetime-action mint-datetime-cancel" @click="closeHouse">取消</span> 
									<span class="mint-datetime-action mint-datetime-confirm" @click="okHouse">确定</span>
								</div>
	        					<mt-picker :slots="houseListSlots" valueKey="name" :visibleItemCount ="3" @change="onHouse" :itemHeight="50"></mt-picker>  
		      				</mt-popup>
						</p>
						<p class='bot_none'>
							<label><span>*</span>上传照片<i>请上传营业执照，身份证正反面，人行开户许可证以及完整的办公场地租房合同照片，不超过20张图</i></label>
						</p>
						<p class='bot_none'>	
							<b class="avatar-uploader-up" v-for="(item,index) in upimgSrc" @click.stop="previewImage(item)">
							  	<em class="avatar-uploader-icon" @click.stop="removeImg(index)"></em>	
								<img :src="item"/>
							</b>
							<b class="avatar-uploader" @click="actionSheet">
							</b>
						</p>
						<div class="preview" v-show="show" @click="closePreview"><img :src="previewSrc"/></div>
						<a href="javascript:;" class="apply btnUp" @click="uploadMore">上传照片</a>
						<p class='bot_none het_none'>
							<input type="file" ref="file1" accept="image/jpeg,image/x-png,image/gif" capture="camera" @change="uploading($event)">
						</p>
						<p>	
							<img class="img" src="../../static/example.png"/>
						</p>
						<p>
							<label><span>*</span>您预留手机号:</label>
							<input type="text" placeholder="请输入手机号码" maxlength="11" style="width:35%;" disabled="true" v-model="contactMobile">
							<a href="javascript:void(0);" class="btn" v-show="isCodeSend" @click="sendMobileCodeData">获取验证码</a>
							<a href="javascript:void(0);" class="closeBtn" v-show="!isCodeSend">{{countDown}}</a>
						</p>
						<p>
							<label><span>*</span>短信验证码:</label>
							<input type="number" placeholder="请输入短信验证码" style="width:35%;" v-model="code">
							<i class="cancel" @click="cancel">&nbsp;</i>
						</p>
					</div>
				</div>
			</form>
		</div>
		<div class="btn">
			<a href="javascript:void(0);" class="apply" @click="submitApply">提交</a>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { findCreditByApplyId, sendMobileCode, submitApplySteptwoZgcb, checkMobileCode, uploadMore } from "@/api/getData"
	import { Toast, Indicator, DatetimePicker, Picker, Popup, MessageBox} from 'mint-ui';
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
					contactPerson: "",
					cardMobile: "",	
					id : "",
	                applyId : this.$route.query.applyId,
	                tradeYears : "",
	                censusRegister : "",
	                marriage : "",
	                children : "",
	                housing : "",
				},
				contactMobile: "",
				code: "", //短信验证码
				smsCodeId :"",
				checkBox: false, //是否同意协议
				countDown: 60,
				timeoutCount: null, //短信倒计时
				isCodeSend: true,
				file:[],
       			src:'',
				censusList:[{
					name: "本地户籍"
				},{
					name: "非本地户籍"
				},{
					name: "未知"
				}],
				marriageList:[{
					name: "已婚"
				},{
					name: "未婚"
				},{
					name: "离异"
				},{
					name: "丧偶"
				},{
					name: "未知"
				}],
				childrenList:[{
					name: "有子女"
				},{
					name: "无子女"
				},{
					name: "未知"
				}],
				houseList:[{
					name: "自置"
				},{
					name: "按揭"
				},{
					name: "租住"
				},{
					name: "未知"
				}],
				censusRegister: false,
	      		censusInit: false,
	      		censusListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        marriage: false,
	      		marriageInit: false,
	      		marriageListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        children: false,
	      		childrenInit: false,
		        childrenListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        house: false,
	      		houseInit: false,
				houseListSlots: [
	      			{
		            	flex: 1,  
		            	values: [], //数组  
		            	className: 'slot1',
		          	}, 
		        ],
		        upimgSrc:[],		        
		        upimgFile:[],
		        show:false,
		        previewSrc:"",
		        fileFlog: false,
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
			this.findCreditByApplyId();			
		},
		components: {
			headTop,
			DatetimePicker,
			Picker,
			Popup 
		},
		methods: {
			//获取申请信息
			async findCreditByApplyId() {
				try {
					const res = await findCreditByApplyId({							
						applyId: this.$route.query.applyId
					});
					if(res.errorCode == "0") {
						let apply = res.dataBody.credit;
						this.applyFrom.id = apply.id;
						this.applyFrom.contactPerson = apply.userRealName;
						this.applyFrom.cardMobile =  apply.cardMobile;
						this.contactMobile =  apply.cardMobile;
						
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
			async sendMobileCodeData() {
				let mobile = this.contactMobile;
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
						const res = await sendMobileCode({
							mobile: mobile
						});
						if(res.errorCode == "0") {
							Toast({
								message: '短信已发送，请查收！',
							});
							this.countNum(mobile);
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
			//检验短信验证码
			async checkMobileCodeData() {
				console.log(this.applyFrom)
				Indicator.open({
				  text: '提交中...',
				  spinnerType: 'fading-circle'
				});
				try {
					const res = await checkMobileCode({
						mobile: this.contactMobile,
						code: this.code
					});
					if(res.errorCode == "0") {
						this.submitApplySteptwoZgcb();
					} else if(res.errorCode == "3006") {
						Indicator.close();
						Toast({
							message: '验证码不正确，请输入正确的验证码！',
						});
					} else {
						Indicator.close();
						Toast({
							message: '手机号码不正确或验证码过期，请输入正确信息！',
						});
					}
				} catch(err) {
					console.log('错误', err);
					Toast({
						message: err.toString(),
					});
				}
			},
			//提交申请
			async submitApplySteptwoZgcb() {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				let data  = this.applyFrom;
				try {
					const res = await submitApplySteptwoZgcb(data);
					if(res.errorCode == "0") {
						let _this = this;
						Indicator.open({
						  text: '提交成功，即将前往二类账户开立页面',
						  spinnerType: 'fading-circle'
						});
						setTimeout(function(){
							_this.$router.push({
								path: 'zgc_openAccount',
								query:{
									productId:productId,
									applyId:_this.$route.query.applyId
								},
							});
						},3000)
						
						//Indicator.close();
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
			//上传文件
			async uploadMore() {
				if(this.upimgFile.length<=0){
					Toast({
						message: "上传照片不能为空",
					});
					return false;
				}	
				let formData = {
					files: this.upimgFile
				};
				
				try {
					const res = await uploadMore(formData);
					if(res.errorCode == "0") {
						Toast({
							message: "上传成功！",
						});
						this.fileFlog = true;
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
				if(applyFrom.censusRegister == ""){
					Toast({
						message: '请选择户籍所在地',
					});
					return false;
				} else if(applyFrom.marriage == "") {
					Toast({
						message: '请选择婚姻状况',
					});
					return false;
				} else if(applyFrom.children == "") {
					Toast({
						message: '请选择子女情况',
					});
					return false;
				} else if(applyFrom.housing == "") {
					Toast({
						message: '请选择住房状况',
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
				if(this.checkData() && fileFlog) {
					this.checkMobileCodeData();
				}else if(!fileFlog){
					Toast({
						message: '请上传照片',
					});
					return false;
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
			showCensus(){
				this.censusRegister = true; 
				this.censusListSlots[0].values = this.censusList;
				
			},
			closeCensus(){  
		        this.censusRegister = false;  
		    }, 
		    okCensus(type){
		    	this.closeCensus();
		    },
		    onCensus(picker, values,type){
		    	if(this.censusInit){
		    		this.applyFrom.censusRegister = values[0].name;
		    	}else{
		    		this.censusInit = true;
		    	}
		    	
		    },
			showMarriage(){
				this.marriage = true; 
				this.marriageListSlots[0].values = this.marriageList;				
			},
			closeMarriage(){  
		        this.marriage = false;  
		    }, 
		    okMarriage(type){
		    	this.closeMarriage();
		    },
		    onMarriage(picker, values,type){
		    	if(this.marriageInit){
		    		this.applyFrom.marriage = values[0].name;
		    	}else{
		    		this.marriageInit = true;
		    	}
		    	
		    },
		    showChildren(){
				this.children = true; 
				this.childrenListSlots[0].values = this.childrenList;
				
			},
			closeChildren(){  
		        this.children = false;  
		    }, 
		    okChildren(type){
		    	this.closeChildren();
		    },
		    onChildren(picker, values,type){
		    	if(this.childrenInit){
		    		this.applyFrom.children = values[0].name;
		    	}else{
		    		this.childrenInit = true;
		    	}
		    	
		    },
		    showHouse(){
				this.house = true; 
				this.houseListSlots[0].values = this.houseList;
				
			},
			closeHouse(){  
		        this.house = false;  
		    }, 
		    okHouse(type){
		    	this.closeHouse();
		    },
		    onHouse(picker, values,type){
		    	if(this.houseInit){
		    		this.applyFrom.housing = values[0].name;
		    	}else{
		    		this.houseInit = true;
		    	}
		    	
		    },
		    actionSheet(type){  
		    	if(this.upimgSrc.length >= 20){
		    		Toast({
						message: '不超过20张图',
					});					
		    	}else{
		    		this.$refs.file1.click();
		    	}
		    	
		    }, 
		    uploading(event){
	    		let file = event.target.files[0];//获取文件		
		       	let windowURL = window.URL || window.webkitURL;	
		    	if(file && windowURL){
			        //创建图片文件的url		
			       	let windowSRC = windowURL.createObjectURL(event.target.files[0]);
			        //this.$refs.img1.src = windowURL.createObjectURL(event.target.files[0]);
			        this.upimgSrc.push(windowSRC);
			       	this.upimgFile.push(file);
		    	}
		    	
			   		
		   	},
		   	removeImg(ind){
				let _this = this;
		   		MessageBox.confirm('是否确定删除此照片！').then(action => {
					_this.upimgSrc.splice( ind, 1 );
	   				_this.upimgFile.splice( ind, 1 );
				}, action => {
					return false;
				});
		   		
		   	},
		   	previewImage(src){
		   		this.previewSrc = src;
		   		this.show = true;
		   	},
		   	closePreview(){
		   		this.show = false;
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
	.form p>input[type=file]{
		visibility: hidden;    /* 隐藏 */
   	 	padding:0;
    	width:0;
    	height: 0;
    	display:inline-block;
	}
	.img_box{
		 -webkit-box-orient: horizontal;
	}
	.form p>img.apply_btn{
		width: 2.25rem;
		height: 1.5rem;
		-webkit-box-flex: 1;
	}
	.form p>img.sf_1{
		margin-left: 0.3rem;	
	}
	.form p.bot_none{
		border-bottom: none;
		padding-bottom: 0;
	}
	.form p.bot_none label{
		width: 92%;
	}
	.bot_none i{
		float: right;
		display: inline-block;
		width: 75%;
		font-size: 0.16rem;
		color: #92969C;
		font-style: normal;
	}
	.form p .img{
		margin: 0 auto;
		display: block;
	}
	.form p.het_none{
		height: 0;
		padding: 0;
	}
	.avatar-uploader-up{
		position: relative;
		display: inline-block;
	    width: 1.14rem;
	    height: 1.14rem;
	    margin-left: 0.14rem;
	    text-align: center;
	    background:#F2F3F4;
	}
	.avatar-uploader{
		position: relative;
		display: inline-block;
	    width: 1.14rem;
	    height: 1.14rem;
	    margin-left: 0.14rem;
	    background: url(../../static/up.png) no-repeat;
	    background-size: 99%;
	}
	.avatar-uploader-up img{
		max-width: 80%;
		height:100%;
		margin: 0 auto;
	}
	.avatar-uploader-icon{
		position: absolute;
		right:0;
	    width: 0.25rem;
	    height: 0.25rem;
	    background: url(../../static/delete_photo.png);
	    background-size: 100%;;		
	}
	.btnUp{
		width: 1rem;
		height: 0.45rem;
		line-height: 0.45rem;
		font-size: 0.18rem;
		margin-left: 0.5rem;
	}
	.preview{
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0,0,0,0.8);
		top:0;
		display: flex;
		justify-content:center;
		align-items:center;
	}
	.preview img{
		display: block;
		max-height: 90%;
		max-width: 100%;
	}
</style>