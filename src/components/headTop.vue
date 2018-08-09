<template>
	<mt-header :title="title">
		<mt-button v-if="showBack == 1" icon="back" @click.native="back" slot="left"></mt-button>
		<mt-button v-if="showBack == 2" icon="back" @click.native="close" slot="left"></mt-button>
	</mt-header>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			title: String,
			showBack: String
		},
		created() {

		},

		methods: {
			close:function(){
				this.$emit('close');
			},
			back:function(){
				console.log(this.$router)
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.mint-header {
		font-size: 0.30rem;
		height: 0.75rem;
		background-color: #5489F1;
	}
</style>