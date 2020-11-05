  <template>
  <b-container class="m-0 p-0" fluid>
    <!-- video, fades over page, tops at 60px to be after navbar in desktop, tops at middle page in mobile -->
    <b-container class="m-0 p-0 thatsamarena z-2" fluid>
      <video
        autoplay
        muted
        playsinline
        id="thatsamarenavideo"
        name="thatsamarenavideo"
      >
        <source src="~/assets/thatsamarena.mp4" type="video/mp4" />
      </video>
    </b-container>

    <!-- title -->

    <b-container class="m-0 my-5 p-0 title bwhite z-1" fluid>
      <b-container class="m-0 p-0 o-0 bwhite h80" fluid> </b-container>
      <b-row class="p-0 m-0">
        <b-col cols="12" class="m-0 p-0 majestic text-center">
          <span class="amarenared">AMARENA</span> PICTURE<span
            class="noletterspacing"
            >S</span
          >
        </b-col>
      </b-row>
      <b-row class="p-0 m-0 mt-5">
        <b-col cols="12" class="text-center weprovide p-0 m-0">
          <span v-html="$t('home.head')"></span>
        </b-col>
      </b-row>
    </b-container>

    <!-- video spacer -->
    <b-container class="m-0 p-0 o-0 bwhite" fluid>
      <video
        autoplay
        muted
        playsinline
        id="thatsamarenavideo"
        name="thatsamarenavideo"
      >
        <source src="~/assets/thatsamarena.mp4" type="video/mp4" />
      </video>
    </b-container>

    <!-- main -->
    <b-container class="m-0 p-0 pt-5" fluid>
      <b-container class="m-0 p-0 mobile" fluid></b-container>
      <b-container class="m-0 my-5 p-0 py-5" fluid>
        <!-- INTRO -->
        <b-row class="p-0 m-0">
          <b-col cols="12" class="px-4 m-0 text-center desc">
            <span v-html="$t('home.desc')"></span><br />
          </b-col>
        </b-row>
      </b-container>
      <b-container class="m-0 my-5 p-0" fluid>
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
              class="text-center videocard p-0 m-0"
              :id="video.video"
              :name="video.video"
            >
              <b-row class="p-0 m-0">
                <b-col md="7" class="p-0 m-0 text-left">
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
                <b-col md="5">
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
        <b-row class="m-0 mb-5 mt-2 p-0" align-v="start">
          <b-col cols="12" class="mb-5">
            <b-button
              block
              v-if="!showallvideo"
              class="amarenared bwhite"
              v-html="$t('home.showall')"
              @click="showall()"
            >
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <!-- BRAND & FOOT SPACERS -->
    <b-container class="h80"></b-container>
    <b-container class="h80"></b-container>
  </b-container>
</template>

<!-- https://bootstrap-vue.org/docs/components/pagination -->

<script>
import foot from '@/components/foot'
export default {
  components: {
    foot: foot,
  },
  async fetch({ store }) {
    await store.dispatch('getVideoAction')
    await store.dispatch('getBrandAction')
  },
  data() {
    return {
      showvideo: null,
      showallvideo: false,
      thatsamarena: false,
      show: false,
      brandhere: [],
    }
  },
  mounted() {
    this.thatsamarena = true
    this.show = true
  },
  created() {
    this.brandhere = this.$store.state.video.slice(0, 5)
  },
  methods: {
    showall() {
      this.brandhere = this.$store.state.video
      this.showallvideo = true
    },
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
