<template>
	<div>
		<headTop showBack="1" title="更多产品详情"></headTop>
		<div class="list">
			<h3>产品详情</h3>
			<div class="content">{{product.productDetail}}</div>
		</div>
		<div class="list">
			<h3>申请资料</h3>
			<div class="content">{{product.applyMaterials}}</div>
		</div>
				<div class="list">
			<h3>贷款协议</h3>
			<div class="content">{{product.loanAgreement}}</div>
		</div>
	</div>
</template>

<script>
	import headTop from "@/components/headTop"
	import { getStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				product: {},
			}
		},
		created() {
			this.product = JSON.parse(getStore("product"));
		},
		components: {
			headTop,
		},
		methods: {

		}
	}
</script>

<style scoped>
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
		top: 0.2rem;
	}
	.content{
		color:#484B50;
		font-size: 0.18rem;
		padding:0.15rem 0.25rem;
	}
	
</style>