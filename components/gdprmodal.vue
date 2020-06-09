<template>
  <b-container v-if="gdprgo" class="gdpr p-0 m-0" fluid name="gdpr" id="gdpr">
    <b-row class="p-0 m-0">
      <b-col cols="12">
        <p class="p-2 m-0">
          Questo sito o gli strumenti di terze parti in esso integrati trattano
          dati personali (es. dati di navigazione o indirizzi IP) e fanno uso di
          cookie o altri identificatori necessari per il funzionamento e per il
          raggiungimento delle finalità descritte nella cookie policy. We use
          cookies to provide our services and for analytics and marketing. To
          find out more about our use of cookies, please see our Privacy Policy.
          By continuing to browse our website, you agree to our use of cookies.
          Per saperne di più, consulta la
          <nuxt-link to="/terms">
            Privacy, Cookie, Terms and Conditions Policy
          </nuxt-link>
        </p>
      </b-col>
      <b-col class="p-3 m-0 d-flex" cols="12" md="3">
        <b-btn @click="accept()">Accetta</b-btn>
        &nbsp;&nbsp;
        <b-btn @click="deny()">
          Rifiuta tutti i cookies non necessari
        </b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      gdprgo: true,
    }
  },
  created() {
    if (this.$ga) {
      this.gdprgo = false
    }
  },
  methods: {
    accept() {
      console.log(' ' + JSON.stringify(this.$ga))
      this.gdprgo = false
    },
    deny() {
      this.$ga.disable
      console.log(' ' + JSON.stringify(this.$ga))
      this.gdprgo = false
    },
  }

}
</script>