<template>
  <b-container class="m-0 p-0 bwhite" fluid>
    <b-container class="m-0 p-0 h80" fluid> </b-container>
    <b-row class="m-0 p-0">
      <b-col md="2" cols="0"></b-col>
      <b-col md="8" cols="12" class="m-0 p-0">
        <p class="amarenared t32 text-center" v-html="$t('team.title')"></p>

        <b-card-group deck>
          <b-card class="border-0 text-center">
            <b-card-body class="text-center p-0 m-0">
              <b-img
                src="~/assets/amdp.png"
                class="rounded-circle imgteam"
              ></b-img>
              <b-card-title>Alessandro Merletti De Palo</b-card-title>
              <b-card-sub-title>Founder</b-card-sub-title>
              <b-card-text>
                <b-link class="amarenared" v-b-modal.1amodal> BIO </b-link>
              </b-card-text>
            </b-card-body>
          </b-card>

          <b-card class="border-0">
            <b-card-body class="text-center p-0 m-0">
              <b-img
                src="~/assets/gio.jpg"
                class="rounded-circle imgteam"
              ></b-img>
              <b-card-title>Giovanni Caloro</b-card-title>
              <b-card-sub-title>Founder</b-card-sub-title>
              <b-card-text>
                <b-link class="amarenared" v-b-modal.1bmodal> BIO </b-link>
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-card-group>

        <b-container class="my-2"></b-container>
        <b-card-group deck>
          <b-card class="border-0">
            <b-card-body class="text-center p-0 m-0">
              <b-img
                src="~/assets/ari.jpg"
                class="rounded-circle imgteam"
              ></b-img>
              <b-card-title>Arianna Giri</b-card-title>
              <b-card-sub-title> {{ $t("team.ari2") }} </b-card-sub-title>
              <b-card-text>
                <b-link class="amarenared" v-b-modal.2amodal> BIO </b-link>
              </b-card-text>
            </b-card-body>
          </b-card>

          <b-card class="border-0">
            <b-card-body class="text-center p-0 m-0">
              <b-img
                src="~/assets/chiara.png"
                class="rounded-circle imgteam"
              ></b-img>
              <b-card-title>Chiara Nicolini</b-card-title>
              <b-card-sub-title> {{ $t("team.chiara2") }} </b-card-sub-title>
              <b-card-text>
                <b-link class="amarenared" v-b-modal.3bmodal> BIO </b-link>
              </b-card-text>
            </b-card-body>
          </b-card>

          <b-card class="border-0">
            <b-card-body class="text-center p-0 m-0">
              <b-img
                src="~/assets/emilia.jpg"
                class="rounded-circle imgteam"
              ></b-img>
              <b-card-title>Emilia Apperti</b-card-title>
              <b-card-sub-title>
                {{ $t("team.emilia2") }}
              </b-card-sub-title>
              <b-card-text>
                <b-link class="amarenared" v-b-modal.2bmodal> BIO </b-link>
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-card-group>

        <b-container class="my-2"></b-container>

        <!-- <b-card-group deck>
          <b-card class="border-0 m-0 p-0">
            <b-card-body class="text-center p-0 m-0">
              <b-img
                src="~/assets/bea.png"
                class="rounded-circle imgteam"
              ></b-img>
              <b-card-title>Beatrice Caimi</b-card-title>
              <b-card-sub-title> {{ $t("team.bea2") }} </b-card-sub-title>
              <b-card-text>
                <b-link class="amarenared" v-b-modal.3amodal> BIO </b-link>
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-card-group> -->

        <b-container class="h80"></b-container>
        <b-container class="h80"></b-container>
      </b-col>
      <b-col md="2" cols="0"></b-col>
    </b-row>
    <b-modal
      ok-only
      hide-header-close
      id="1amodal"
      title="Alessandro Merletti De Palo"
    >
      <b-container class="text-center">
        <b-img
          src="~/assets/amdp.png"
          class="rounded-circle imgteam mb-3"
        ></b-img>
        <p class="t18" v-html="$t('team.amdp2')"></p>
        <p class="t18" v-html="$t('team.amdp3')"></p>
        <p class="t18" v-html="$t('team.amdp4')"></p>
        <p class="t18" v-html="$t('team.amdp5')"></p>
      </b-container>
    </b-modal>
    <b-modal ok-only hide-header-close id="1bmodal" title="Giovanni Caloro">
      <b-container class="text-center">
        <b-img
          src="~/assets/gio.jpg"
          class="rounded-circle imgteam mb-3"
        ></b-img>
        <p class="t18" v-html="$t('team.gio2')"></p>
        <p class="t18" v-html="$t('team.gio3')"></p>
        <p class="t18" v-html="$t('team.gio4')"></p>
        <p class="t18" v-html="$t('team.gio5')"></p>
      </b-container>
    </b-modal>
    <b-modal ok-only hide-header-close id="2amodal" title="Arianna Giri">
      <b-container class="text-center">
        <b-img
          src="~/assets/ari.jpg"
          class="rounded-circle imgteam mb-3"
        ></b-img>
        <p class="t18" v-html="$t('team.ari2')"></p>
        <p class="t18" v-html="$t('team.ari3')"></p>
        <p class="t18" v-html="$t('team.ari4')"></p>
        <p class="t18" v-html="$t('team.ari5')"></p>
      </b-container>
    </b-modal>
    <b-modal ok-only hide-header-close id="2bmodal" title="Emilia Apperti">
      <b-container class="text-center">
        <b-img
          src="~/assets/emilia.jpg"
          class="rounded-circle imgteam mb-3"
        ></b-img>
        <p class="t18" v-html="$t('team.emilia2')"></p>
        <p class="t18" v-html="$t('team.emilia3')"></p>
        <p class="t18" v-html="$t('team.emilia4')"></p>
        <p class="t18" v-html="$t('team.emilia5')"></p>
      </b-container>
    </b-modal>
    <b-modal ok-only hide-header-close id="3amodal" title="Beatrice Caimi">
      <b-container class="text-center">
        <b-img
          src="~/assets/bea.png"
          class="rounded-circle imgteam mb-3"
        ></b-img>
        <p class="t18" v-html="$t('team.bea2')"></p>
        <p class="t18" v-html="$t('team.bea3')"></p>
        <p class="t18" v-html="$t('team.bea4')"></p>
        <p class="t18" v-html="$t('team.bea5')"></p>
      </b-container>
    </b-modal>
    <b-modal ok-only hide-header-close id="3bmodal" title="Chiara Nicolini">
      <b-container class="text-center">
        <b-img
          src="~/assets/chiara.png"
          class="rounded-circle imgteam mb-3"
        ></b-img>
        <p class="t18" v-html="$t('team.chiara2')"></p>
        <p class="t18" v-html="$t('team.chiara3')"></p>
        <p class="t18" v-html="$t('team.chiara4')"></p>
        <p class="t18" v-html="$t('team.chiara5')"></p>
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('getVideoAction')
    await store.dispatch('getBrandAction')
  },
}
</script>