<template>
	<div>
		<headTop showBack="1" title="华夏银行个人征信授权书"></headTop>
		<div class="agreement">
			<p>
				<span class="ahui_sle">华夏银行个人征信授权书</span>

				<strong class="ahui_slo">重要提示：</strong></br>
<strong class="ahui_slo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的客户，为了维护您的权益，请在签署本授权书前，仔细阅读本授权书各条款（特别是黑体字条款），关注您在授权书中
的权利、义务。如有任何疑问，请向经办行咨询。</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人（指借款人、借款人配偶、担保人）因向<span style="text-decoration :underline;">华夏银行股份有限公司杭州分行</span>申请信贷业务，
<strong class="ahui_slo">特授权<span style="text-decoration :underline;">华夏银行股份有限公司杭州分行</span>在本人（指借款人、借款人配偶、担保人）信贷业务申请审批阶段及业务存续期间，
向中国人民银行个人信用信息基础数据库和其他经国务院征信业监督管理部门批准设立的征信机构查询本人（指借款人、借款人配偶、
担保人）个人信息及信用信息，用于本人（指借款人、借款人配偶、担保人）信贷业务申请与后续管理</strong>,
超出上述授权查询的一切后果及法律责任由<span style="text-decoration :underline;">华夏银行股份有限公司杭州分行</span>承担。</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人（仅指借款人、担保人）授权<span style="text-decoration :underline;">华夏银行股份有限公司杭州分行</span>依据《征信业管理条例》的规定，<strong class="ahui_slo">将本人（仅指借款人、担保人）个人
信息和信用信息，包括但不限于信贷信息及对信息主体信用状况构成负面影响的信息，报送中国人民银行个人信用信息基础数据库和其他经国务院征信业监督管理部门批准设立的征信机构。</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人（指借款人、借款人配偶、担保人）在此声明已知悉并理解上述授权条款。</br>
			</p>
<div class="ahui_line">
	<p class="bold">借款人授权</p>
	<span class="red">*</span><span class="ahui_tit">证件类型及号码：</span><span class="ahui_cont">{{useInfo.idtfno}}</span></br>
	<span class="red">*</span><span class="ahui_tit">联系方式：</span><span class="ahui_cont">{{useInfo.contactMobile}}</span></br>
	<span class="red">*</span><span class="ahui_tit">授权人签字：</span><span  class="ahui_cont">{{useInfo.contactPerson}}</span> </br>
	<span class="red">*</span><span class="ahui_tit">日期：</span><span class="ahui_cont">{{date}}</span></br>
	<p class="bold">借款人配偶授权</p>
	<span class="red">*</span><span class="ahui_tit">证件类型及号码：</span> <span id="jkrpoID" class="ahui_cont"></span></br>
	<span class="red">*</span><span class="ahui_tit">联系方式：</span><span id="jkrpoMobile"class="ahui_cont"></span></br>
	<span class="red">*</span><span class="ahui_tit">授权人签字：</span> <span id="jkrpoSign" class="ahui_cont"></span></br>
	<span class="red">*</span><span class="ahui_tit">日期：</span><span class="ahui_cont"></span></br>    
	<p class="bold">担保人授权</p>
	<span class="red">*</span><span class="ahui_tit">证件类型及号码：</span> <span id="jkrpoID" class="ahui_cont"></span></br>
	<span class="red">*</span><span class="ahui_tit">联系方式：</span><span id="jkrpoMobile" class="ahui_cont"></span></br>
	<span class="red">*</span><span class="ahui_tit">授权人签字： </span><span id="jkrpoSign" class="ahui_cont"></span></br>
	<span class="red">*</span><span class="ahui_tit">日期：</span><span class="ahui_cont"></span></br>   
</div>

        </div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { getAllApplyByApply } from "@/api/getData"
	import { moment } from '@/api/moment'// 格式化时间
	export default {
		data() {
			return {
				useInfo:{
					contactMobile: "",
					idtfno: "",
					contactPerson: "",
				},
				date:""
			}
		},
		created() {
			this.getAllApplyByApply();
		},
		components: {
			headTop,
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
							inputPageOne = JSON.parse(apply.inputPageOne),
						 	date = moment(new Date()).format('YYYY-MM-DD');
						this.useInfo.contactMobile = apply.contactMobile;
						this.useInfo.idtfno = inputPageOne.idtfno;
						this.useInfo.contactPerson = apply.contactPerson;
						this.date = date;
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
		}
	}
</script>

<style scoped>
	.agreement{
		font-size: 0.18rem;
		width:100%;
		color:#1E0020;
		background: #fff;
     	line-height: 0.27rem;
	}
	.agreement p{
		padding:0 0.22rem;
		color: #000000;
	}
	.agreement .ahui_sle{
		font-size: 0.21rem;
		text-align: center;
		display: block;
		line-height: 0.7rem;
	}
	.agreement .ahui_slo{
		color:#484B50;
	}
	.agreement .ahui_sll{
		color:#484B50;
	}
	.red{
		color: #FF5661;
		padding:0 0.05rem 0 0.2rem;
	}
	.bold{
		font-weight: bold;
		margin: 0.15rem 0;
	}
	.ahui_tit{
		display: inline-block;
		width: 1.44rem;
	}
	.ahui_cont{
		display: inline-block;
		width: 3rem;
		border-bottom: 1px solid #DDDDDD;
	}
	.ahui_line{
		line-height: 0.36rem;
	}
</style>