<template>
  <b-container class="m-0 p-0" fluid>
    <b-container class="footcontainer m-0 p-0" fluid>
      <b-row class="p-0 m-0 brandrow">
        <b-col cols="12" class="d-flex">
          <div v-for="brand in this.$store.state.brand" :key="brand.id">
            <a @click="brandFilter(brand.brand)"
              ><img :src="brandImage(brand.image)" class="imgbrand"
            /></a>
          </div>
        </b-col>
      </b-row>
      <b-row class="p-0 m-0">
        <b-col cols="2" class="amarenared pl-2">
          <b-link v-b-modal.contactmodal class="amarenared">CONTACT</b-link>
        </b-col>
        <b-col cols="8" class="text-center up mb-3">
          <span class="amarenared">Amarena</span> Pictures S.r.l. ~ Via Moscova
          39, 20121 <span class="amarenared">Milano</span> ~ Via Pistelli 16,
          00135 <span class="amarenared">Roma</span> ~ P.I. 11100831004 ~ W E
          <span class="amarenared"> &hearts; </span> D I V E R S I T Y
        </b-col>
        <b-col cols="2" class="amarenared text-right pr-2">
          <b-link v-b-modal.loginmodal class="amarenared" v-if="!$auth.user">
            LOGIN
          </b-link>
          <b-link class="amarenared" @click="$auth.logout()" v-if="$auth.user">
            LOGOUT
          </b-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="m-0 p-0" fluid>
      <b-row class="p-0 m-0">
        <b-col cols="12" class="text-center m-0 p-0 mt-2">
          <nuxt-link class="majestic" to="/">
            <span class="amarenared">AMARENA</span><span>&nbsp;PICTURES</span>
          </nuxt-link>
        </b-col>
      </b-row>
      <b-row class="m-0 p-0">
        <b-col cols="12 d-flex justify-content-center m-0 p-0 mt-n3">
          <img :src="require('../assets/amarenasquare.png')" class="logo" />
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center px-3 m-0">
        <b-col cols="12" class="quotedline text-center base">
          <em>
            That's <span class="amarenared">Amarena</span>!<br />
            We founded <span class="amarenared">Amarena</span> Pictures, the
            "<span class="amarenared">sour cherry</span>" production service for
            our directions, in 2010. Today it has become a full production
            company leveraging on our direction style and.. its unique
            <span class="amarenared">flavour</span>.
          </em>
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center m-0 mt-2 mb-5">
        <b-col cols="12" class="text-right signature base m-0 mb-5">
          Giovanni Caloro <span class="amarenared">~</span> Alessandro Merletti
          De Palo
        </b-col>
      </b-row>
      <b-row class="p-0 m-0">
        <b-col cols="12" class="p-0 m-0">
          <b-card
            no-body
            v-for="video in brandhere"
            :key="video.id"
            class="text-center"
          >
            <b-row class="p-0 m-0">
              <b-col md="4">
                <b-card-body>
                  <b-card-text>
                    <b-row>
                      <b-col cols="12" class="mb-2 p-1">
                        <span class="up amarenared videotitle">{{
                          video.title
                        }}</span>
                      </b-col>
                      <b-col cols="12" class="mb-5 videoabstract">
                        {{ video.abstract }}
                      </b-col>
                      <b-col cols="3" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Client</span>
                      </b-col>
                      <b-col cols="9" class="mb-2 p-0 videospecs">
                        {{ video.brand }}
                      </b-col>
                      <b-col cols="3" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Agency</span>
                      </b-col>
                      <b-col cols="9" class="mb-2 p-0 videospecs">
                        {{ video.agency }}
                      </b-col>
                      <b-col cols="3" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Production</span>
                      </b-col>
                      <b-col cols="9" class="mb-2 p-0 videospecs">
                        {{ video.production }}
                      </b-col>
                      <b-col cols="3" class="mb-2 p-0 pr-1 videospecstype">
                        <span class="up amarenared">Direction</span>
                      </b-col>
                      <b-col cols="9" class="mb-2 p-0 videospecs">
                        {{ video.direction }}
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card-body>
              </b-col>
              <b-col md="8">
                <b-embed
                  type="video"
                  :poster="videoImage(video.video)"
                  controls
                >
                  <source :src="amareel(video.video)" type="video/mp4" />
                </b-embed>
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
    <contactmodal />
    <loginmodal />
  </b-container>
</template>

<script>
import contactmodal from '@/components/contactmodal'
import loginmodal from '@/components/loginmodal'
export default {
  components: {
    contactmodal: contactmodal,
    loginmodal: loginmodal,
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
    videoImage(filename) {
      try {
        return require('../assets/i/' + filename + '.jpg')
      } catch (e) {
        return require('../assets/amarenasquare.png')
      }
    },
    amareel(filename) {
      try {
        return '/v/' + filename + '.mp4'
      } catch (e) {
        return '/v/thatsamarena.mp4'
      }
    },
    brandImage(filename) {
      try {
        return require('../assets/b/' + filename)
      } catch (e) {
        return require('../assets/amarenasquare.png')
      }
    },
    brandFilter(brand) {
      this.brandhere = this.$store.state.video.filter(video => video.brand == brand)
    }
  }
}

</script>

<!--
old website:
$og_title= 'Amarena Pictures - '.$json_output_content['metavalue'][$pagina]['title'];
$og_image= $abs. $json_output_content['metavalue'][$pagina]['image'];
$og_desc= $json_output_content['metavalue'][$pagina]['description'];
$og_key= $json_output_content['metavalue'][$pagina]['key'];
if cat
$og_title= 'Amarena Pictures - '.$json_output_content['metavalue'][$_GET['cat']]['title'];
$og_image= $abs. $json_output_content['metavalue'][$_GET['cat']]['image'];
$og_desc= $json_output_content['metavalue'][$_GET['cat']]['description'];
if($_GET['name']!=''){
 $og_title= 'Amarena Pictures - '. $dati['title'];
 $og_image= $abs.'img/portfolio/'. $dati['video'].'.jpg';
 $og_desc= 'Amarena Pictures - ' .$dati['abstract'];
if($og_image==''){$og_image='img/amarena-logo.svg';}

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $og_title;?></title>
    <meta name="description" content="<?php echo $og_desc; ?>">
	  <meta name="keywords" content="<?php echo $og_key; ?>">
    
	  <meta property="og:title" content="<?php echo $og_title; ?>" />
	  <meta property="og:url" content="http://www.amarenapictures.com<?php echo $_SERVER['REQUEST_URI'];?>" />
	  <meta property="og:description" content="<?php echo $og_desc; ?>" />
	  <meta property="og:image" content="<?php echo $og_image; ?>" />
  </head>
          <li class="facebook"><a href="https://www.facebook.com/amarenapictures" target="_blank"></a></li>
          <li class="twitter"><a href="https://twitter.com/AmarenaPictures" target="_blank"></a></li>
          <li class="instagram"><a href="https://instagram.com/amarenapictures/" target="_blank"></a></li>
          <li class="flag"><a href="https://www.amarenapictures.com/it" target="_blank"></a></li>
            <li class="flag"><a href="https://www.amarenapictures.com/it" >italiano</a></li>

Founded by directors Alessandro Merletti De Palo and Giovanni Caloro, Amarena Pictures combines the art of film direction with solid, cutting-edge production. -->

