<template>
	<div>
		<headTop showBack="1" title="华夏银行送达地址确认书"></headTop>
		<div class="agreement">
			<p>
				<span class="ahui_sle">华夏银行送达地址确认书</span>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据《中华人民共和国民事诉讼法》、最高人民法院《关于以法院专递方式邮寄送达民事诉讼文书的若干规定》、最高人民法《关于进一步加强民事送达工作的若干意见》的通知等规定，本合同各方主体协商确定，对本确认书确定的文书需要送达时，自愿适用上述规定，承担由此产生的权利义务及其法律责任：<br>  
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、确认的送达地址适用于金融合同成立时起至债务全部履行完毕时止，包括适用于仲裁、法院诉讼（含一审、二审、再审）、实现担保物权特别程序及执行阶段；确认人同意贷款人按确认的地址、电子信箱、手机号、微信号等发出催收通知书、宣布贷款提前到期通知书、履行保证责任通知书等债权催收文件及涉诉后法院或仲裁委员会按确认的地址送达诉讼、仲裁、执行文书。<br>        	
    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 二、借款人、担保人自愿承诺以自己提供或确认的送达地址（地址、电子信箱、手机号、微信号等）为上述文书的送达地址，并且以任何一项送达地址（地址、电子信箱、手机号、微信号等）送达，均为有效合法送达。在向其提供或确认的送达地址送达文书时，受送达人是法人或者其他组织的，法人的法定代表人、其他组织的主要负责人或者该法人、其他组织的办公室、收发室、值班室等负责收件的人员均是收件人。如受送达人是自然人的，本人及同住成年家属或与本人有密切联系的人（即与本人非同住成年家属、有辨识能力的同住人、受雇人、房主、出租人或居住地的物业管理部门）均是收件人。上述人员签收的，均视为合法签收，承担送达的法律责任。<br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、如提供或确认的送达地址不准确、送达地址（地址、电子信箱、手机号、微信号等）变更未及时告知或第二条涉及的收件人拒绝签收，导致上述文书未能被实际接受的，文书退回之日为送达之日。<br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、以传真、电子邮件、手机短信、微信号方式送达的，以传真、电子邮件、短信、微信到达受送达人特定系统的日期为送达日。<br>	
		<span style="margin-left:190px;" id="time"></span>
		</p>
		<div class="ahui_line">
			<p class="bold">1、本人确认下列地址为送达地址：</p>
			<span class="red">*</span><span class="ahui_tit">地址：</span><span class="ahui_cont">{{useInfo.adderss}}{{useInfo.mailad}}</span></br>
			<span class="red">*</span><span class="ahui_tit">收件人：</span><span  class="ahui_cont">{{useInfo.contactPerson}}</span> </br>
			<span class="red">*</span><span class="ahui_tit">电话：</span><span class="ahui_cont">{{useInfo.contactMobile}}</span></br>
			<p class="bold">2、 本人指定以下代收人的地址为送达地址</p>
			<span class="red">&nbsp;</span><span class="ahui_tit">代收人码：</span> <span id="jkrpoID" class="ahui_cont"></span></br>
			<span class="red">&nbsp;</span><span class="ahui_tit">与本人关系：</span><span id="jkrpoMobile"class="ahui_cont"></span></br>
			<span class="red">&nbsp;</span><span class="ahui_tit">电话：</span> <span id="jkrpoSign" class="ahui_cont"></span></br>
			<span class="red">&nbsp;</span><span class="ahui_tit">地址：</span> <span id="jkrpoSign" class="ahui_cont"></span></br>
			<p class="bold">3、  本人指定下列现代通讯方式为送达地址</p>
			<span class="red">&nbsp;</span><span class="ahui_tit">手机号码：</span> <span id="jkrpoID" class="ahui_cont"></span></br>
			<span class="red">&nbsp;</span><span class="ahui_tit">电子邮件：</span><span id="jkrpoMobile" class="ahui_cont"></span></br>
			<span class="red">&nbsp;</span><span class="ahui_tit">传真： </span><span id="jkrpoSign" class="ahui_cont"></span></br>
			<span class="red">&nbsp;</span><span class="ahui_tit">微信号： </span><span id="jkrpoSign" class="ahui_cont"></span></br>
		</div>
		<p style="margin-top: 0.2rem;">声明：借款人或担保人已经详细阅读了填写确认书的告知事项，理解其法律责任；借款人或担保人承诺提供及确认的地址是准确、有效的。</br>
		借款人/担保人签名、盖章或捺印：</br> </br> 
		<span style="margin-left: 1rem;">{{date}}</span></p>
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
					mailad: "",
					adderss:"",
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
							inputPageTwo = JSON.parse(apply.inputPageOne),
						 	date = moment(new Date()).format('YYYY-MM-DD');
						this.useInfo.contactMobile = apply.contactMobile;
						this.useInfo.idtfno = inputPageOne.idtfno;
						this.useInfo.contactPerson = apply.contactPerson;
						this.useInfo.mailad = apply.mailad;
						this.date = date;
						if(inputPageTwo){
							if(inputPageTwo.mailadCityName == inputPageTwo.mailadCountyName){
								this.adderss = inputPageTwo.mailadProvinceName+inputPageTwo.mailadCityName;
							}else{
								this.adderss = inputPageTwo.mailadProvinceName+inputPageTwo.mailadCityName+inputPageTwo.mailadCountyName;
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