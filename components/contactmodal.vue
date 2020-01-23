<template>
  <b-container>
    <b-modal id="contactmodal" title="Contact Us" hide-header>
      <b-row>
        <b-col cols="12">
          <p class="amarenared videotitle text-center">
            CONTACT US
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <form class="form-horizontal" @submit.prevent="submit">
            <fieldset>
              <!-- Name input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="name">Name</label>
                <div class="col-md-9">
                  <input
                    v-model="formName"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <!-- Email input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="email"
                  >Your E-mail</label
                >
                <div class="col-md-9">
                  <input
                    v-model="formEmail"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <!-- Subject -->
              <div class="form-group">
                <label class="col-md-3 control-label" for="subject"
                  >Subject</label
                >
                <div class="col-md-9">
                  <input
                    v-model="formSubject"
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <!-- Message body -->
              <div class="form-group">
                <label class="col-md-3 control-label" for="message"
                  >Your message</label
                >
                <div class="col-md-9">
                  <textarea
                    v-model="formBody"
                    class="form-control"
                    id="message"
                    name="message"
                    placeholder="Please enter your message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>
              </div>

              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-3">
                  <VueRecaptcha
                    :sitekey="envrecaptcha"
                    size="invisible"
                    ref="recaptcha"
                    @verify="onVerify"
                    @expired="onExpired"
                    loadRecaptchaScript
                  ></VueRecaptcha>
                </div>
              </div>
            </fieldset>
          </form>
          <div v-if="response.length" v-html="response"></div>
        </b-col>
      </b-row>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" class="amarenared whiteback" @click="sendMail()">
          SEND
        </b-button>
        <b-button size="sm" class="amarenared whiteback" @click="cancel()">
          CANCEL
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