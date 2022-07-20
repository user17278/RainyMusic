<template>
	<div class="video-show">
		<div class="video-show-box">
			<video :src="videoUrl" v-if="isVideo" autoplay controls>
			</video>
		</div>
	</div>
</template>

<script>
export default {
	name: "MusicCenterVideo",
	data() {
		return {
			videoUrl: null,
			isVideo: false
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.$bus.$on('getMusicVideoUrl', (url) => {
				this.videoUrl = url;
			})
			this.$bus.$on('controlVideoShow', (status) => {
				this.isVideo = status
			})
		})
	},
	beforeDestroy() {
		this.$bus.$off('getMusicVideoUrl')
	},
}
</script>

<style scoped lang="scss">
.video-show {
	display: flex;
	position: relative;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: white;
	overflow: hidden;

	.video-show-box {
		width: 100%;
		text-align: center;

		video {
			width: 98%;
			border-radius: 20px;
		}
	}
}
</style>