<template>
  <b-container class="m-0 p-0 bwhite" fluid>
    <b-container class="m-0 p-0 h80" fluid> </b-container>
    <b-row class="m-0 p-0">
      <b-col cols-md="3" cols="1"></b-col>
      <b-col cols-md="6" cols="10">
        <b-row class="m-0 p-0">
          <b-col cols="12" class="text-center">
            <p
              class="amarenared t32 text-center"
              v-html="$t('contact.title')"
            ></p>
          </b-col>
          <b-col cols="12" class="text-center mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.0218834613598!2d9.18570921715865!3d45.477562708529106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60832cb0bec7%3A0x1f11bd4215a2736f!2sAmarena%20Pictures!5e1!3m2!1sen!2sit!4v1599490193062!5m2!1sen!2sit"
              width="100%"
              height="300"
              frameborder="0"
              style="border: 0"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </b-col>
        </b-row>

        <b-row class="m-0 p-0">
          <b-col cols="12">
            <b-form @submit.prevent="submit" class="was-validated">
              <b-form-group label-for="name" :label="$t('contact.name')">
                <b-form-input
                  v-model="formName"
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  :placeholder="$t('contact.yourname')"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label-for="email" :label="$t('contact.email')">
                <b-form-input
                  v-model="formEmail"
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :placeholder="$t('contact.youremail')"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label-for="subject" :label="$t('contact.subject')">
                <b-form-input
                  v-model="formSubject"
                  id="subject"
                  name="subject"
                  type="text"
                  class="form-control"
                  :placeholder="$t('contact.yoursubject')"
                  required
                ></b-form-input>
              </b-form-group>

              <!-- Message body -->
              <b-form-group
                label-for="message"
                :label="$t('contact.message')"
                :description="$t('contact.yourmessage')"
              >
                <b-form-textarea
                  v-model="formBody"
                  class="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></b-form-textarea>
              </b-form-group>

              <!-- Form actions -->
              <b-form-group>
                <VueRecaptcha
                  :sitekey="envrecaptcha"
                  size="invisible"
                  ref="recaptcha"
                  @verify="onVerify"
                  @expired="onExpired"
                  loadRecaptchaScript
                ></VueRecaptcha>
              </b-form-group>

              <b-button
                size="sm"
                type="submit"
                class="amarenared bwhite"
                v-html="$t('contact.send')"
              >
              </b-button>
              <b-check
                id="termscheckbox"
                name="termscheckbox"
                v-model="termscheckbox"
                required
              >
                <span>
                  <i v-html="$t('contact.checkbox')"> </i>
                </span>
              </b-check>
              <div v-if="response.length" v-html="response"></div>
            </b-form>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols-md="3" cols="1"></b-col>
    </b-row>
    <b-container class="h80"></b-container>
    <b-container class="h80"></b-container>
  </b-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  async fetch({ store }) {
    await store.dispatch('getVideoAction')
    await store.dispatch('getBrandAction')
  },
  data() {
    return {
      formName: '',
      formEmail: '',
      formSubject: '',
      formBody: '',
      recaptchaToken: '',
      response: '',
      envrecaptcha: process.env.RECAPTCHA,
      termscheckbox: null,
    }
  },
  components: {
    VueRecaptcha,
  },
  methods: {
    submit() {
      this.$refs.recaptcha.execute()
      this.sendMail()
    },
    onVerify(res) {
      this.recaptchaToken = res
      this.sendMail()
    },
    onExpired() {
      this.$refs.recaptcha.reset()
    },
    async sendMail() {
      const message = {
        formName: this.formName,
        formEmail: this.formEmail,
        formSubject: this.formSubject,
        formBody: this.formBody,
        recaptchaToken: this.recaptchaToken
      }
      try {
        const res = await this.$store.dispatch('contactEmailAction', message)
        this.formName = this.formEmail = this.formSubject = this.formBody = this.recaptchaToken =
          ''
        this.response = res.message
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>