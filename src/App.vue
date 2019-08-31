<template>
  <div id="app">
		<transition name="van-slide-left" mode="out-in" >
			<router-view/>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
	#app {
		height:100%;
	}
	.main {
		height:100%;
	}
	.content {
		min-height:calc(100% - 96px);
		padding-top:46px;
		padding-bottom:50px;
	}
	.content2{
		min-height: calc(100% - 46px);
		padding-top:46px;
		background: #efefef;
	}
	.fcfff {
		color:#fff;
	}
</style>
