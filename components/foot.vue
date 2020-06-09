<template>
  <b-container class="footcontainer m-0 p-0" fluid>
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