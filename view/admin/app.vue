<style lang="scss" scoped>
</style>

<template>
	<div class="adminWrap">
		这是admin页面
		<entrance-point></entrance-point>
	</div>
</template>

<script>
	import entrancePoint from '@@/views/'

	export default {

		name: 'admin',
		components: {
			entrancePoint
		},
		data () {
			return {

			}
		}
	}
</script>
