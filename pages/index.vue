  <template>
  <b-container class="m-0 p-0" fluid>
    <b-container class="m-0 p-0 pt-3 main" fluid>
      <b-row class="p-0 m-0 mb-5">
        <b-col cols="12" class="m-0 p-0 pt-3 majestic">
          <nuxt-link to="/">
            <span class="amarenared">AMARENA</span> PICTURES
          </nuxt-link>
        </b-col>
      </b-row>
      <b-row class="p-0 m-0">
        <b-col cols="1"></b-col>
        <b-col cols="10" class="text-center weprovide p-0 m-0 mt-4">
          <span v-html="$t('home.head')"></span>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
    <b-container class="m-0 p-0 thatsamarena fadeinout" fluid>
      <video autoplay muted>
        <source src="~/assets/thatsamarena.mp4" type="video/mp4" />
      </video>
    </b-container>

    <b-container class="m-0 p-0 videos" fluid>
      <!-- INTRO -->
      <b-row class="p-0 m-0 mb-5">
        <b-col cols="12" class="px-4 m-0 text-center desc">
          <span v-html="$t('home.desc')"></span><br />
          <!-- <b-img src="~/assets/amarenasquare.png" class="logo m-0 p-0" /> -->
        </b-col>
      </b-row>
      <!-- AUTH -->
      <b-row class="p-0 m-0 mx-5" v-if="$auth.user">
        <b-col cols="12" class="text-center videoabstract">
          <p class="up">
            WELCOME {{ $auth.user.name }} {{ $auth.user.surname }} <br />
            <br />
            <nuxt-link class="amarenared" to="/video">
              ADD/EDIT VIDEO
            </nuxt-link>
            <br />
            <nuxt-link class="amarenared" to="/brand">
              ADD/EDIT BRAND
            </nuxt-link>
            <br />
          </p>
        </b-col>
      </b-row>
      <!-- VIDEOS -->
      <b-row class="p-0 m-0">
        <b-col cols="12" class="p-0 m-0">
          <b-card
            no-body
            v-for="video in brandhere"
            :key="video.id"
            class="text-center videocard"
            :id="video.video"
            :name="video.video"
          >
            <b-row class="p-0 m-0">
              <b-col md="8">
                <img
                  v-if="showvideo != video.video"
                  class="pointer imgvideo"
                  @click="amareel(video.video)"
                  :src="videoImage(video.video)"
                />
                <b-embed
                  v-if="showvideo == video.video"
                  type="video"
                  autoplay
                  controls
                >
                  <source :src="amareel(video.video)" type="video/mp4" />
                </b-embed>
              </b-col>
              <b-col md="4">
                <b-card-body>
                  <b-card-text>
                    <b-row>
                      <b-col cols="12" class="mb-1 p-1">
                        <span class="up amarenared videotitle">{{
                          video.title
                        }}</span>
                      </b-col>
                      <b-col
                        cols="12"
                        class="mb-4 videoabstract"
                        v-if="$i18n.locale == 'en'"
                        v-html="video.abstract"
                      >
                      </b-col>
                      <b-col
                        cols="12"
                        class="mb-4 videoabstract"
                        v-if="$i18n.locale == 'it'"
                        v-html="video.abstractit"
                      >
                      </b-col>
                      <b-col cols="4" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Client</span>
                      </b-col>
                      <b-col cols="8" class="mb-2 p-0 videospecs">
                        {{ video.brand }}
                      </b-col>
                      <b-col cols="4" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Agency</span>
                      </b-col>
                      <b-col cols="8" class="mb-2 p-0 videospecs">
                        {{ video.agency }}
                      </b-col>
                      <b-col cols="4" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Production</span>
                      </b-col>
                      <b-col cols="8" class="mb-2 p-0 videospecs">
                        {{ video.production }}
                      </b-col>
                      <b-col cols="4" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Direction</span>
                      </b-col>
                      <b-col cols="8" class="mb-2 p-0 videospecs">
                        {{ video.direction }}
                      </b-col>
                      <b-col
                        cols="12"
                        class="mb-2 mt-4 p-0 amarenared pointer"
                        @click="editvideo(video)"
                        v-if="$auth.user"
                      >
                        EDIT THIS VIDEO
                      </b-col>
                      <b-col
                        cols="12"
                        class="m-0 p-0 amarenared pointer"
                        @click="tag(video)"
                        v-if="$auth.user"
                      >
                        VIDEO TAG
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="m-0 my-5 p-0">
        <b-col cols="12" class="my-5">
          &nbsp;
        </b-col>
      </b-row>
    </b-container>
    <!-- BRAND ROW -->
    <b-container class="footcontainer m-0 p-0" fluid>
      <b-row class="p-0 m-0 brandrow">
        <b-col cols="12" class="text-center up mb-3"> </b-col>
        <b-col cols="12" class="d-flex moveme">
          <div
            v-for="brand in this.$store.state.brand"
            :key="brand.id"
            style="overflow: visible"
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
      <!-- KEEP THIS FOR NOW -->
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
          <nuxt-link
            to="/contact"
            class="amarenared"
            v-html="$t('home.contactus')"
          >
          </nuxt-link>
          <nuxt-link to="/terms" class="amarenared">
            ~ Cookie, Privacy and Terms
          </nuxt-link>
          <b-link class="amarenared" @click="$auth.logout()" v-if="$auth.user">
            ~ LOGOUT
          </b-link>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<!-- https://bootstrap-vue.org/docs/components/pagination -->

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('getVideoAction')
    await store.dispatch('getBrandAction')
  },
  data() {
    return {
      brandhere: [],
      showvideo: null,
      thatsamarena: false,
      show: false,
    }
  },
  mounted() {
    this.thatsamarena = true
    this.show = true
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
    amareel(videoname) {
      try {
        this.showvideo = videoname
        return '/v/' + videoname + '.mp4'
      } catch (e) {
        return '../assets/thatsamarena.mp4'
      }
    },
    editvideo(video) {
      this.$store.commit('setEdit', video)
      return this.$router.push({ path: '/video' })
    },
    tag(video) {
      location.href = process.env.URLHOME + '#' + video.video
    },
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
