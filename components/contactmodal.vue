<template>
  <b-container>
    <b-modal id="contactmodal" hide-header>
      <b-row>
        <b-col cols="12">
          <p
            class="amarenared videotitle text-center"
            v-html="$t('contact.title')"
          ></p>
        </b-col>
      </b-row>
      <b-row>
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
              <b-form-text
                v-model="formBody"
                class="form-control"
                id="message"
                name="message"
                rows="5"
                required
              ></b-form-text>
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
          </b-form>
          <div v-if="response.length" v-html="response"></div>
        </b-col>
      </b-row>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button
          size="sm"
          class="amarenared whiteback"
          @click="sendMail()"
          v-html="$t('contact.send')"
        >
        </b-button>
        <b-button
          size="sm"
          class="amarenared whiteback"
          @click="cancel()"
          v-html="$t('contact.cancel')"
        >
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  data() {
    return {
      formName: '',
      formEmail: '',
      formSubject: '',
      formBody: '',
      recaptchaToken: '',
      response: '',
      envrecaptcha: process.env.RECAPTCHA
    }
  },
  components: {
    VueRecaptcha
  },
  methods: {
    submit() {
      this.$refs.recaptcha.execute()
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