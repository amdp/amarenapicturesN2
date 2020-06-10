<template>
  <b-container class="p-0 m-0" fluid>
    <transition name="fademe">
      <video v-if="show" autoplay muted class="thatsamarena">
        <source src="~/assets/thatsamarena.mp4" type="video/mp4" />
      </video>
    </transition>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>