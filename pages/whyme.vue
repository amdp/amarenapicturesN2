<template>
  <b-container class="m-0 p-0 bwhite" fluid>
    <b-container class="m-0 p-0 h80" fluid> </b-container>
    <b-row class="m-0 p-0">
      <b-col md="3" cols="1"></b-col>
      <b-col md="6" cols="10">
        <b-row class="m-0 p-0">
          <b-col cols="12">
            <p class="amarenared t32 text-center" @click="go()">
              WHY ME - ANTEPRIMA DOCUMENTARIO
            </p>
            <p class="t18 text-center">FOR YOUR EYES ONLY</p>
          </b-col>
        </b-row>
        <b-row class="m-0 p-0">
          <b-col cols="12">
            <b-container class="m-0 p-0">
              <video
                type="video"
                autoplay
                controls
                style="position: absolute; top: 0px; left: 0px; width: 100%"
                id="whymevid"
                name="whymevid"
              >
                <source src="/v/whyme.mp4#t=2" type="video/mp4" />
              </video>
              <br /><br /><br /><br /><br /><br /><br />
            </b-container>
          </b-col>
        </b-row>
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
  }
}
</script>