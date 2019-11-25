<template>
  <b-container>
    <div
      class="col-10 col-md-5 mx-2 mb-4 single-videos"
      v-for="video in this.$store.state.videos"
      :key="video.id"
    >
      <b-embed
        type="video"
        aspect="4by3"
        controls
        :poster="videoImage(video.video)"
      >
        <source :src="amareel(video.video)" type="video/mp4" />
      </b-embed>
    </div>
  </b-container>
</template>

<script>
export default {
  methods: {
    videoImage(filename) {
      try {
        return require('../assets/v/' + filename + '.png')
      } catch (e) {
        return require('../assets/v/0.png')
      }
    },
    amareel(filename) {
      try {
        return require('../assets/v/' + filename + '.mp4')
      } catch (e) {
        return require('../assets/v/thatsamarena.mp4')
      }
    }
  }
}
</script>
