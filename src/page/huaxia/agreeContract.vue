<template>
	<div>
		<headTop showBack="1" title="华夏银行借款合同"></headTop>
		<div class="agreement">
			<p>
				<span class="ahui_sle">华夏银行借款合同</span>
			</p>
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
			//this.getAllApplyByApply();
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