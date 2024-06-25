<template>
  <video ref="video" autoplay playsinline></video>
</template>

<script>
export default {
  mounted() {
    this.$parent.remoteVideoRef = this.$refs.video;
  },
};
</script>

<style scoped>
video {
  width: 300px;
  height: 200px;
  margin: 10px;
}
</style>
