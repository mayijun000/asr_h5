<template>
	<div id="app" class="wrap">
			
		<transition :name="transitionName">
			<keep-alive>
				<router-view  class="Router"></router-view>
			</keep-alive>
		</transition>
			
	</div>
</template>

<script>
	export default {
		data() {　　　　
			return {　　　　　　
				transitionName: 'slide-right' // 默认动态路由变化为slide-right　　
			}　　
		},
		watch: {　　　
			'$route' (to, from) {　　　　
				let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
				　　　　　　
				if(isBack) {　　　　　　　　
					this.transitionName = 'slide-right'　　　　　　
				} else {　　　　　　
					this.transitionName = 'slide-left'　　　　　
				}　　
				this.$router.isBack = false　　
			}
		}
	}
</script>

<style lang="less">
	@import './style/common';
	.Router {
		position: absolute;
		width: 100%;
		transition: all .4s ease;
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100% 0);
	}
</style>