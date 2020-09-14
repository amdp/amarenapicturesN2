<template>
  <b-container class="m-0 p-0 bwhite" fluid>
    <b-container class="m-0 p-0 h80" fluid> </b-container>
    <b-row class="m-0 p-0">
      <b-col md="3" cols="1"></b-col>
      <b-col md="6" cols="10">
        <b-row class="m-0 p-0">
          <b-col cols="12">
            <p
              class="amarenared t32 text-center"
              v-html="$t('about.title')"
            ></p>
          </b-col>
        </b-row>
        <b-container class="m-0 p-0 text-justify">
          <p class="t18 text-center" v-html="$t('about.main1')"></p>
          <p class="t18" v-html="$t('about.main2')"></p>
          <p class="t18" v-html="$t('about.main3')"></p>
          <p class="t18" v-html="$t('about.main4')"></p>
          <p class="t18" v-html="$t('about.main5')"></p>
          <p class="t18" v-html="$t('about.main6')"></p>
          <p class="t18" v-html="$t('about.main7')"></p>
          <p class="t18" v-html="$t('about.main8')"></p>
          <p class="t18 amarenared text-center" v-html="$t('about.main9')"></p>
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