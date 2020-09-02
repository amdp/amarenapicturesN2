<template>
  <b-container class="footcontainer m-0 p-0" fluid>
    <b-row class="p-0 m-0 brandrow">
      <b-col cols="12" class="text-center up mb-3"> </b-col>
      <b-col cols="12" class="d-flex moveme">
        <div
          v-for="brand in $store.state.brand"
          :key="brand.id"
          style="overflow: visible;"
        >
          <b-link
            @click="brandFilter(brand.brand)"
            :href="'#' + brandhere[0].video"
          >
            <img :src="brandImage(brand.image)" class="imgbrand" />
          </b-link>
          <b-link
            class="amarenared pointer"
            @click="editbrand(brand)"
            v-if="$auth.user"
          >
            EDIT
          </b-link>
        </div>
      </b-col>
    </b-row>
    <b-row class="p-0 m-0">
      <b-col cols="12" class="text-center up my-2">
        <nuxt-link to="/"><span v-html="$t('footer.main')"></span></nuxt-link>
        <nuxt-link :to="switchLocalePath('it')">
          <b-img src="../assets/it.png" width="15px" />
        </nuxt-link>
        <nuxt-link :to="switchLocalePath('en')">
          <b-img src="../assets/uk.png" width="15px" />
        </nuxt-link>
        <span>~</span>
        <b-link href="https://www.facebook.com/amarenapictures">
          <img src="~/assets/facebook.svg" width="15px" />
        </b-link>
        <b-link href="https://instagram.com/amarenapictures/">
          <img src="~/assets/instagram.svg" width="15px" />
        </b-link>
        <b-link href="https://www.linkedin.com/company/amarena-pictures">
          <img src="~/assets/linkedin.svg" width="15px" />
        </b-link>
        <span>~</span>
        <nuxt-link
          to="/contact"
          class="amarenared"
          v-html="$t('home.contactus')"
        ></nuxt-link>
        <nuxt-link to="/terms" class="amarenared">
          ~ Cookie, Privacy and Terms
        </nuxt-link>
        <b-link class="amarenared" @click="$auth.logout()" v-if="$auth.user">
          ~ LOGOUT
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      brandhere: [],
    }
  },
  created() {
    this.brandhere = this.$store.state.video
  },
  methods: {
    brandImage(brandname) {
      try {
        return '/b/' + brandname
      } catch (e) {
        return require('../assets/amarenasquare.png')
      }
    },
    brandFilter(brand) {
      if (brand) {
        this.brandhere = this.$store.state.video.filter(video => video.brand == brand)
      } else {
        this.brandhere = this.$store.state.video
      }
    },
    editbrand(brand) {
      this.$store.commit('setEdit', brand)
      return this.$router.push({ path: '/brand' })
    }
  }
}
</script> 
