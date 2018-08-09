<template>
	<div>
		<headTop showBack="1" title="还款详情"></headTop>
		<div class="loanAll">
			<div class="title">本期待还(元)</div>
			<div class="money" v-if="listDueRepay.repayStatus == 'PS01'">{{Number(listDueRepay.repayShouldTotal).toFixed(2)}}</div>
			<div class="money" v-if="listDueRepay.repayStatus == 'PS00'">0.0</div>
		</div>
		<div class="list">
			<h3>应还</h3>
			<div class="list_cont">
				<ul>
					<li><i>本金(元):</i><span>{{Number(listDueRepay.repayShouldPrcp).toFixed(2) }}</span></li>
					<li><i>利息(元):</i><span>{{Number(listDueRepay.repayShouldInt).toFixed(2) }}</span></li>
					<li><i>利率%:</i><span>{{Number(due.dueRateYear*100).toFixed(2)}}</span></li>
					<li><i>罚息(元):</i><span>{{Number(listDueRepay.repayAlreadyIntOd).toFixed(2)}}</span></li>
					<li><i>罚息利率%:</i><span>{{Number(due.overRateYear*100).toFixed(2)}}</span></li>
					<li><i>复利(元):</i><span>{{Number(listDueRepay.repayAlreadyIntCd).toFixed(2)}}</span></li>
					<li><i>合计(元):</i><span>{{Number(listDueRepay.repayShouldTotal).toFixed(2)}}</span></li>
					<li><i>到期日:</i><span>{{listDueRepay.repayEndDate}}</span></li>
				</ul>
			</div>
		</div>
		<div class="list">
			<h3>已还</h3>
			<div class="list_cont">
				<ul>
					<li><i>已还金额(元):</i>
						<span v-if="listDueRepay.repayStatus == 'PS01'">{{Number(listDueRepay.repayShouldTotal).toFixed(2)}}</span>
						<span v-if="listDueRepay.repayStatus == 'PS00'">0.00</span>
					</li>
					<li><i>还款日:</i><span>{{listDueRepay.repayDate}}</span></li>
					<li><i>是否逾期:</i>
						<span v-if="listDueRepay.repayOverFlag == 'OF01'">逾期</span>
						<span v-if="listDueRepay.repayOverFlag == 'OF00'">正常</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { listDue } from "@/api/getData"
	import { Toast} from 'mint-ui';
	import { moment } from '@/api/moment'// 格式化时间
	import { getStore } from "@/config/mUtils"
	
	export default {
		data() {
			return {
				dueNo:"",
				due:{},
				listDueRepay:{},
			}
		},
		created() {
			this.dueNo = this.$route.query.dueNo;
			this.due = JSON.parse(getStore(this.dueNo+"item"));
			this.listDueRepay = JSON.parse(getStore(this.dueNo));
			
			this.listDueRepay.repayEndDate = moment(this.listDueRepay.repayEndDate).format('YYYY-MM-DD');
			if(this.listDueRepay.repayDate == null){
				this.listDueRepay.repayDate = "--";
			}else{
				this.listDueRepay.repayDate = moment(this.listDueRepay.repayDate).format('YYYY-MM-DD');
			}
			
		},
		components: {
			headTop
		},
		methods: {
			
		},
	}
</script>

<style scoped>
	.loanAll{
		height: 1.9rem;
		background-color: #fff;
		text-align: center;
		padding-top: 0.54rem;
	}
	.loanAll .title{
		font-size: 0.18rem;
		color: #92969C;
	}
	.loanAll .money{
		font-size: 0.36rem;
		color:#000000;
		padding-top: 0.25rem;
	}
	.list {
		width: 100%;
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
	.list_cont .info{
		font-size: 0.18rem;
		color:#4A4A4A;
		width: auto;
		padding: 0 0.3rem;
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
		width: 35%;
		color: #494c51;
		vertical-align: top;
	}
	
	.list_cont ul li span {
		display: inline-block;
		color: #92979d;
		width: 55%;
	}
</style>