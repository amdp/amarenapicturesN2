<template>
  <b-container class="m-0 p-0" fluid>
    <b-navbar toggleable="lg" class="fixed-top bwhite m-0 p-0">
      <b-navbar-brand to="/" class="m-0 p-0">
        <b-container class="amarenared m-0 p-0 pl-4 t150x redrborder">
          AMARENA PICTURES &nbsp;&nbsp;
        </b-container>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" class="bwhite m-0 p-0" is-nav>
        <b-navbar-nav class="m-0 p-0 pl-1 mr-auto text-center">
          <b-nav-item to="/about" active-="amarenared"> ABOUT </b-nav-item>
          <b-nav-item to="/team" active-class="amarenared"> TEAM </b-nav-item>
          <b-nav-item to="/contact" active-class="amarenared">
            CONTACT
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="p-0 m-0">
          <b-nav-text class="p-0 m-0 pr-4 text-center">
            <b-link href="https://www.facebook.com/amarenapictures">
              <img src="~/assets/facebook.svg" width="18px" />
            </b-link>
            <b-link href="https://instagram.com/amarenapictures/">
              <img src="~/assets/instagram.svg" width="18px" />
            </b-link>
            <b-link href="https://www.linkedin.com/company/amarena-pictures">
              <img src="~/assets/linkedin.svg" width="18px" />
            </b-link>
            <span>&nbsp;&nbsp;</span>
            <nuxt-link :to="switchLocalePath('it')">
              <b-img src="../assets/it.png" width="18px" />
            </nuxt-link>
            <nuxt-link :to="switchLocalePath('en')">
              <b-img src="../assets/uk.png" width="18px" />
            </nuxt-link>
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>