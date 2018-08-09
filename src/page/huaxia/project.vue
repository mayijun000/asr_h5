<template>
	<div style="height: 100%; background-color: #fff;">
		<headTop title="还款计划" showBack="1"></headTop>
		<div class="list">
			<h3>还款计划表</h3>
			<div class="project-hd">以下数据均由华夏银行提供，如有问题请联系4400-66-95577</div>
		</div>
		<div class="project-tab">
			<table border="0" cellspacing="0" cellpadding="0" width="100%">
				  <tr class="project-head">
				    	<th>计划还款日期</th>
						<th>还款金额</th>
						<th>本金</th>
						<th>利息</th>
						<th>后续费</th>
				  </tr>
				  <tr v-for="item in finalrepayPlanResultList">
				    <td>{{item.repayDate}}</td>
				    <td>{{item.repayTotal}}</td>
				    <td>{{item.prcpAmt}}</td>
				    <td>{{item.intAmt}}</td>
				    <td>{{item.serviceFee}}</td>
				  </tr>
			</table>
		</div>
	</div>

</template>

<script>
	import headTop from "@/components/headTop"
	import { getPayPlanList } from "@/api/getData"
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				applyNo: "",
				dueNo:"",
				finalrepayPlanResultList: [],
			}
		},
		created() {
			this.applyNo = this.$route.query.applyNo;
			this.dueNo = this.$route.query.dueNo;
			this.getPayPlanList();
		},
		components: {
			headTop,
		},
		methods: {
			//查询还款计划
			async getPayPlanList() {
				try {
					const res = await getPayPlanList({
						dueNo: this.dueNo,
						applyNo:this.applyNo
					});
					if(res.errorCode == 0) {
						this.finalrepayPlanResultList = res.dataBody.finalrepayPlanResultList;
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
		padding-top: 0.875rem;
	}
	.btn-but{
		padding: 0.45rem;
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
	
	.list h3 {
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0 0.47rem;
		position: relative;
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
	.project-hd{
		height: 0.45rem;
		background: #FFF7EA;
		color: #FEB542;
		font-size: 0.15rem;
		align-items: center;
		line-height: 0.5rem;
		padding-left:0.27rem;
	}
	.project-tab{
		width: 100%;
		margin-top: 0.20rem;
		
	}
	.project-tab tr th{
		font-size: 0.15rem !important;
		align-items: center;
		padding: 0.17rem;
	}
	.project-tab tr td{
		font-size: 0.15rem !important;
		align-items: center;
		padding: 0.17rem;
	}
	.project-head{
		background:#EEF5FD;
		width: 100%;
	}
	.project-tab tr:nth-child(odd) {
	    background-color: #F6F7FA;
	}
	
</style>