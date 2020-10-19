<template>
  <b-container>
    <b-row class="mr-3 ml-3 mt-5">
      <div class="container d-flex justify-content-center">
        <b-form
          @submit.prevent="login"
          class="needs-valitation mt-5"
          autocomplete="on"
        >
          <b-form-group label-for="loginEmail" label="Email:">
            <b-form-input
              id="loginEmail"
              v-model="loginEmail"
              size="sm"
              required
              autocomplete="current-email"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-for="loginPassword" label="Password:">
            <b-form-input
              id="loginPassword"
              v-model="loginPassword"
              size="sm"
              required
              type="password"
              autocomplete="current-password"
            ></b-form-input>
          </b-form-group>
          <p>
            <b-button
              type="submit"
              class="btn bhcare white btn-block mt-3 border-0"
              id="loginbutton"
            >
              <span v-if="!logging"><b>LOGIN</b></span>
              <b-spinner small v-if="logging" class="m-1"></b-spinner>
              <span v-if="logging">Checking your membership..</span>
            </b-button>
          </p>
          <p class="freedom">
            Want to <b>change</b> password? Just enter your email and a
            <em>new password</em> in the above fields
            <b-button
              class="btn bhunderstanding white btn-block border-0"
              @click="recover()"
              >CHANGE PASSWORD</b-button
            ><br />
            If you still have problems, please
            <nuxt-link to="./contact" class="amarenared"> contact us </nuxt-link
            >.
          </p>
        </b-form>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      logging: false
    }
  },
  computed: {
    mailInputState() {
      return this.mail.length > 1 ? true : false
    }, //CHECK THIS
  },
  methods: {
    async login() {
      this.logging = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.loginEmail,
            password: this.loginPassword
          }
        })
        this.logging = false
      } catch (err) {
        alert('Sorry, there seems to be something wrong: ' + err.response.data)
        this.logging = false
      }
    },
    async recover() {
      this.$store.dispatch('recoverPasswordAction', {
        email: this.loginEmail,
        password: this.loginPassword
      })
      alert(
        'Amarena Pictures is sending you an email to ' +
        this.loginEmail +
        ' to set the new password that is now in the password field.'
      )
    },
  }
}
</script>