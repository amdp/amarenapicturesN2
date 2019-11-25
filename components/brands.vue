<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="d-flex overflow-auto">
        <div
          class="col-10 col-md-5 mx-2 mb-4 single-brand"
          v-for="brand in this.$store.state.brands"
          :key="brand.id"
        >
          <img
            :src="brandImage(brand.image)"
            class="img-fluid img-responsive img-project w-100 mb-2 amarenabrand"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {
    brandImage(filename) {
      try {
        return require('../assets/brand/' + filename)
      } catch (e) {
        return require('../assets/brand/0.png')
      }
    }
  },
  head() {
    script: [
      {
        innerHTML:
          "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-53354338-1', 'auto');ga('send', 'pageview');"
      }
    ]
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
