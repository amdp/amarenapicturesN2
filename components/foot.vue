<template>
  <b-container class="footcontainer m-0 p-0" fluid>
    <b-row class="p-0 m-0 brandrow">
      <b-col cols="12" class="text-center up mb-1"> </b-col>
      <b-col cols="12" class="d-flex moveme">
        <div
          v-for="brand in $store.state.brand"
          :key="brand.id"
          style="overflow: visible"
        >
          <b-link
            v-if="$route.path == '/'"
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
          <nuxt-link v-if="$route.path != '/'" to="/">
            <img :src="brandImage(brand.image)" class="imgbrand" />
          </nuxt-link>
        </div>
      </b-col>
    </b-row>
    <b-row class="p-0 m-0">
      <b-col cols="12" class="text-center up my-2">
        <span v-html="$t('footer.main')"></span>
        <nuxt-link to="/terms" class="amarenared">
          Cookie, Privacy and Terms
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
      return this.$router.push({ path: '/cms/brand' })
    }
  }
}
</script> 
