<template>
  <b-container class="footcontainer m-0 p-0" fluid>
    <b-row class="p-0 m-0 brandrow">
      <b-col cols="12" class="d-flex moveme">
        <div
          v-for="brand in this.$store.state.brand"
          :key="brand.id"
          style="overflow: visible"
        >
          <b-link @click="brandFilter(brand.brand)">
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
      <b-col cols="12" class="text-center up mb-3">
        <span v-html="$t('footer.main')"></span>
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
        <span>~</span>
        <b-link
          v-b-modal.contactmodal
          class="amarenared"
          v-html="$t('home.contactus')"
        ></b-link>
        <b-link
          href="https://www.iubenda.com/privacy-policy/29600831"
          class="iubenda-white iubenda-embed"
          title="Privacy Policy "
        >
          Privacy Policy
        </b-link>
        <b-link class="amarenared" @click="$auth.logout()" v-if="$auth.user">
          ~ LOGOUT
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import contactmodal from '@/components/contactmodal'
export default {
  components: {
    contactmodal: contactmodal,
  },
  async fetch({ store }) {
    await store.dispatch('getBrandAction')
    await store.dispatch('getVideoAction')
  },
  data() {
    return {
      brandhere: [],
    }
  },
  created() {
    this.brandhere = this.$store.state.video
  },
  methods: {
    videoImage(imagename) {
      try {
        return '/i/' + imagename + '.jpg'
      } catch (e) {
        return require('../assets/amarenasquare.png')
      }
    },
    // (function (w, d) {
    //   var loader = function () {
    //     var s = d.createElement("script"),
    //       tag = d.getElementsByTagName("script")[0];
    //     s.src = "https://cdn.iubenda.com/iubenda.js";
    //     tag.parentNode.insertBefore(s, tag);
    //   };
    //   if (w.addEventListener) {
    //     w.addEventListener("load", loader, false);
    //   } else if (w.attachEvent) {
    //     w.attachEvent("onload", loader);
    //   } else {
    //     w.onload = loader;
    //   }
    // })(window, document
    // amareel(videoname) {
    //   try {
    //     return '/v/' + videoname + '.mp4'
    //   } catch(e) {
    //     return '/v/thatsamarena.mp4'
    //   }
    // }),
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
    editvideo(video) {
      this.$store.commit('setEdit', video)
      return this.$router.push({ path: '/video' })
    },
    editbrand(brand) {
      this.$store.commit('setEdit', brand)
      return this.$router.push({ path: '/brand' })
    },
    tag(video) {
      location.href = process.env.URLHOME + '#' + video.video
    }
  }
}

</script>