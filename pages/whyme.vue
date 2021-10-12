<template>
  <b-container class="m-0 p-0 bwhite" fluid>
    <b-container class="m-0 p-0 h80" fluid> </b-container>
    <b-row class="m-0 p-0">
      <b-col md="3" cols="1"></b-col>
      <b-col md="6" cols="10">
        <b-row class="m-0 p-0">
          <b-col cols="12">
            <p class="amarenared t32 text-center">
              WHY ME - ANTEPRIMA DOCUMENTARIO
            </p>
          </b-col>
        </b-row>
        <b-container class="m-0 p-0 text-justify">
          <p class="t18 text-center">FOR YOUR EYES ONLY</p>
          <b-container class="m-0 p-0 pointer">
            <b-embed type="video" autoplay controls>
              <source src="../assets/thatsamarena.mp4" type="video/mp4" />
            </b-embed>
          </b-container>
        </b-container>
      </b-col>
      <b-col md="3" cols="1"></b-col>
    </b-row>
    <b-container class="h80"></b-container>
    <b-container class="h80"></b-container>
  </b-container>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('getVideoAction')
    await store.dispatch('getBrandAction')
  },
}
</script>