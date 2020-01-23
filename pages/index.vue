<template>
  <b-container fluid p-0 m-0>
    <b-row class="d-flex justify-content-center majestic mx-3 my-2">
      <b-col cols="12" class="text-center">
        <nuxt-link class="majestic" to="/">
          <span class="amarenared">AMARENA</span
          ><span>&nbsp;PICTURES</span></nuxt-link
        ></b-col
      >
    </b-row>
    <b-row class="d-flex justify-content-center mx-3">
      <b-col cols="12" class="quotedline text-center base">
        <em>
          We founded <span class="amarenared">Amarena</span> Pictures, the
          "<span class="amarenared">sour cherry</span>" production service for
          our directions, in 2010. Today it has become a full production company
          leveraging on our diection style and its unique flavour.
        </em>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center mx-3">
      <b-col cols="12" class="text-right signature base">
        Giovanni Caloro - Alessandro Merletti De Palo
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12 d-flex justify-content-center my-5">
        <img :src="brandImage('none')" class="logo" />
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-card
          no-body
          v-for="video in brandFilter()"
          :key="video.id"
          class="text-center"
        >
          <b-row no-gutters>
            <b-col md="8">
              <b-embed type="video" :poster="videoImage(video.video)" controls>
                <source :src="amareel(video.video)" type="video/mp4" />
              </b-embed>
            </b-col>
            <b-col md="4">
              <b-card-body class="up amarenared" :title="video.title">
                <b-card-text class="black">
                  {{ video.abstract }}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="m-5">
      <b-col cols="12" class="m-5">
        &nbsp;
      </b-col>
    </b-row>
    <b-container class="footcontainer p-0 m-0" fluid>
      <b-row class="m-0 p-0">
        <b-col cols="12" class="d-flex brandrow">
          <span>&nbsp;&nbsp;&nbsp;</span>
          <div v-for="brand in this.$store.state.brands" :key="brand.id">
            <a @click="brandFilter(brand.brand)"
              ><img :src="brandImage(brand.image)" class="imgbrand"
            /></a>
          </div>
          <span>&nbsp;&nbsp;&nbsp;</span>
        </b-col>
      </b-row>
      <b-row class="endline">
        <b-col cols="1" class="amarenared">
          <b-link v-b-modal.contactmodal class="amarenared">CONTACT</b-link>
        </b-col>
        <b-col cols="10" class="text-center up mb-3">
          <span class="amarenared">Amarena</span> Pictures S.r.l. ~ Via Pistelli
          16, 00135 Roma - Via Moscova 39, 20121 Milano ~ P.I. 11100831004 ~ W E
          <span class="amarenared"> &hearts; </span> D I V E R S I T Y
        </b-col>
        <b-col cols="1" class="amarenared text-right">LOGIN</b-col>
      </b-row>
    </b-container>
    <contactmodal />
  </b-container>
</template>

<script>
import contactmodal from '@/components/contactmodal'
export default {
  components: {
    contactmodal: contactmodal,
  },
  async fetch({ store }) {
    await store.dispatch('getBrandsAction')
    await store.dispatch('getVideosAction')
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
        return require('../assets/v/' + filename + '.mp4')
      } catch (e) {
        return require('../assets/v/thatsamarena.mp4')
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
      if (!brand) {
        return this.$store.state.videos
      } else {
        return this.$store.state.videos.filter(video => video.brand == brand)
      }
    }
  }
}
</script>

<!--
$jsonurl_content='js/testi.json';
$json_content = file_get_contents($jsonurl_content,0,null,null);
$json_output_content = json_decode($json_content, true);

$og_title= 'Amarena Pictures - '.$json_output_content['metavalue'][$pagina]['title'];
$og_image= $abs. $json_output_content['metavalue'][$pagina]['image'];
$og_desc= $json_output_content['metavalue'][$pagina]['description'];
$og_key= $json_output_content['metavalue'][$pagina]['key'];

if($_GET['cat']!=''){
$og_title= 'Amarena Pictures - '.$json_output_content['metavalue'][$_GET['cat']]['title'];
$og_image= $abs. $json_output_content['metavalue'][$_GET['cat']]['image'];
$og_desc= $json_output_content['metavalue'][$_GET['cat']]['description'];
}

if($_GET['name']!=''){

 $query_single="SELECT * FROM amareel WHERE alias ='" . $_GET['name'] . "'";
 $dati= $conn->query($query_single)->fetch();

 $og_title= 'Amarena Pictures - '. $dati['title'];
 $og_image= $abs.'img/portfolio/'. $dati['video'].'.jpg';
 $og_desc= 'Amarena Pictures - ' .$dati['abstract'];
}

if($og_image==''){$og_image='img/amarena-logo.svg';}

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $og_title;?></title>
    <meta name="description" content="<?php echo $og_desc; ?>">
	  <meta name="keywords" content="<?php echo $og_key; ?>">
    <link rel="stylesheet" href="<?php echo $abs; ?>css/foundation.css" />
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $abs; ?>css/slick.css"/>
	  <link rel="stylesheet" href="<?php echo $abs; ?>css/bst.css" />
    <script src="<?php echo $abs; ?>js/vendor/modernizr.js"></script>
	  
	  <meta property="og:title" content="<?php echo $og_title; ?>" />
	  <meta property="og:url" content="http://www.amarenapictures.com<?php echo $_SERVER['REQUEST_URI'];?>" />
	  <meta property="og:description" content="<?php echo $og_desc; ?>" />
	  <meta property="og:image" content="<?php echo $og_image; ?>" />
  </head>
  <body id="<?php echo $pagina; ?>">

 <div class="off-canvas-wrap" data-offcanvas>
  <div class="inner-wrap">
#######################################  PHONES  ###########################
              NAV SMALL
  <div class="show-for-medium-down">
    <nav class="tab-bar ">
      <div class="left column">
        <ul class="social-menu" >
          <li class="facebook"><a href="https://www.facebook.com/amarenapictures" target="_blank"></a></li>
          <li class="twitter"><a href="https://twitter.com/AmarenaPictures" target="_blank"></a></li>
          <li class="instagram"><a href="https://instagram.com/amarenapictures/" target="_blank"></a></li>
          <li class="flag"><a href="https://www.amarenapictures.com/it" target="_blank"></a></li>
        </ul>
      </div>
      <section class="right-small">
        <a class="right-off-canvas-toggle menu-icon" href="#"><span></span></a>
      </section>
      <div class="clearfix"></div>
      <div class="line-white-lit mbot-10"></div>
      <div class="clearfix"></div>
      <div class="logo left column "><a href="<?php echo $abs;?>home"><img src="<?php echo $abs; ?>img/amarena-logo.svg" alt="amarena pictures" class="mtop-10"></a></div>
    </nav>
    <aside class="right-off-canvas-menu">
      <ul class="off-canvas-list">
        <li class="about"><a href="<?php echo $abs;?>about">About</a></li>
        <li class="project"><a href="<?php echo $abs;?>project">Projects</a></li>
        <li class="humanfeel"><a href="<?php echo $abs;?>project/the-human-feel">Human Feel</a></li>
        <li class="contact"><a href="<?php echo $abs;?>contact">Contact</a></li>
      </ul>
    </aside>
  </div>
END NAV SMALL
################################## END PHONES ############################################
  <header class=" show-for-large-up">
    <nav class="top-bar" data-topbar role="navigation">
      <section class="top-bar-section">
        <table style="width:100%; border:0px;">
          <tr><td width="20%"><a href="<?php echo $abs; ?>home"><img src="<?php echo $abs; ?>img/amarena-logo.svg" alt="amarena pictures" style="width:60%"></a></td>
          <td width="60%" style="text-align: center;"><div class="menu-container" style="font-size:18px; color:#AAAAAA;">
              <span class="about"><a href="<?php echo $abs;?>about">ABOUT &nbsp;</a></span>
              <span class="divider-bst"> </span>
              <span class="project"><a href="https://amarenapictures.com/project/tv-web-video-adv">&nbsp; TV-WEB &nbsp;</a></span>
              <span class="divider-bst"> </span>
              <span class="humanfeel"><a href="https://amarenapictures.com/project/the-human-feel">&nbsp; HUMAN FEEL &nbsp;</a></span>
              <span class="divider-bst"> </span>
              <span class="contact"><a href="<?php echo $abs;?>contact">&nbsp; CONTACT</a></span>
          </td>
          <td width="20%"><ul class="social-menu right">
            <li class="facebook"><a href="https://www.facebook.com/amarenapictures" target="_blank">facebook</a></li>
            <li class="twitter"><a href="https://twitter.com/AmarenaPictures" target="_blank">twitter</a></li>
            <li class="instagram"><a href="https://instagram.com/amarenapictures/" target="_blank">instagram</a></li>
            <li class="flag"><a href="https://www.amarenapictures.com/it" >italiano</a></li>
          </ul></td></tr></table>
      </section>
    </nav>
  </header>
    if (is_file('include/inc-'.$pagina.'.php')){include('include/inc-'.$pagina.'.php');}
    else{include('include/inc-not-found.php');}
  
  <a class="exit-off-canvas"></a>
  </div>
</div>

<div><p>Founded by directors Alessandro Merletti De Palo and Giovanni Caloro, Amarena Pictures combines the art of film direction with solid, cutting-edge production.
</p></div> 
-->
