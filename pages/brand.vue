<template>
  <b-container>
    <h2 class="text-center my-4">BRAND EDIT/UPLOAD</h2>
    <p class="d-flex justify-content-center">
      <nuxt-link to="/video" class="amarenared">
        ADD A NEW VIDEO INSTEAD
      </nuxt-link>
    </p>
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <b-form @submit.prevent="brandForm()" class="mt-3 was-validated">
          <b-form-group
            label-for="brandInput"
            label="Brand:"
            description="Insert the name of the video brand"
            v-if="!old"
          >
            <b-form-input
              id="brandInput"
              v-model="formbrand"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="brandInput"
            label="Brand:"
            description="Insert the name of the video brand"
            v-if="old"
          >
            <b-form-input
              id="brandInput"
              v-model="formbrand"
              size="sm"
              required
              readonly
            ></b-form-input>
          </b-form-group>
          <p class="d-flex justify-content-center">
            <b-link @click="newbrand()" class="amarenared" v-if="old">
              CANCEL EDIT, ADD A NEW BRAND
            </b-link>
          </p>
          <b-form-group
            label-for="idInput"
            label="Id:"
            description="The brand id, leave blank for automated id assignment"
          >
            <b-form-input
              id="idInput"
              v-model="formid"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="brandFileInput"
            label="Brand image upload:"
            description="The brand image"
          >
            <b-form-file
              id="brandFileInput"
              v-model="formBrandFile"
              ref="formBrandFile"
              v-if="old"
            ></b-form-file>
          </b-form-group>
          <b-form-group
            label-for="brandFileInput"
            label="Brand image upload:"
            description="The brand image"
          >
            <b-form-file
              id="brandFileInput"
              v-model="formBrandFile"
              ref="formBrandFile"
              v-if="!old"
              required
            ></b-form-file>
          </b-form-group>
          <b-form-group
            label-for="visibleInput"
            label="Visible?"
            description="Choose whether the video should be visible or not"
          >
            <b-form-select
              id="visibleInput"
              v-model="formvisible"
              size="sm"
              required
            >
              <option value="1">1</option>
              <option value="0">0</option>
            </b-form-select>
          </b-form-group>
          <b-button type="submit" class="btn btn-block mt-3 mb-3 gray border-0">
            <span v-if="!editing">GO!</span>
            <b-spinner small v-if="editing" class="m-1"></b-spinner>
            <span v-if="editing">Reloading the brand..</span>
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-container class="my-4">
      <b-row v-for="brand in $store.state.brand" :key="brand.id">
        <b-col cols="3">{{ brand.id }}</b-col>
        <b-col cols="3">{{ brand.brand }}</b-col>
        <b-col cols="3">{{ brand.image }}</b-col>
        <b-col cols="1">{{ brand.visible }}</b-col>
        <b-col cols="1" @click="editbrand(brand)" class="amarenared pointer">
          EDIT
        </b-col>
        <b-col cols="1" @click="deletebrand(brand)" class="amarenared pointer">
          DELETE
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Amarena Pictures - Brand Form'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getBrandAction')
  },
  mounted() {
    console.log('edit: ' + JSON.stringify(this.$store.state.edit))
  },
  data() {
    return {
      editing: false,
      old: this.$store.state.edit,
      formid: this.$store.state.edit
        ? this.$store.state.edit.id
        : null,
      formbrand: this.$store.state.edit
        ? this.$store.state.edit.brand
        : null,
      formvisible: this.$store.state.edit
        ? this.$store.state.edit.visible
        : '1',
      formBrandFile: null,
    }
  },
  methods: {
    async brandForm() {
      this.editing = true
      // This function creates and sends database request body both for brand creation and update
      //'new' is set for a new brand, if not the edit.id is taken from url to update or copy old ones
      var formBodyRequest = {
        id: this.formid,
        image: this.formBrandFile ? this.formBrandFile.name : this.old.image,
        brand: this.formbrand,
        visible: this.formvisible,
        old: this.old
      }
      let res
      try {
        res = await this.$store.dispatch('brandFormAction', formBodyRequest)
      } catch (err) {
        console.log(' ' + JSON.stringify(err))
        alert(err)
      }
      if (res == 'exists') {
        return this.$toast.show('brand name already exists!', {
          duration: 1500,
          className: 'toast'
        })
      } else {
        if (this.old && !this.formBrandFile) { return this.doneToast(res) }
        this.brandUpload()
      }
    },
    async brandUpload() {
      let formBrandData = new FormData()
      formBrandData.append('brand', this.formBrandFile)
      let res
      try {
        res = await this.$store.dispatch('brandUploadAction', {
          formBrandData: formBrandData,
          headers: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
      } catch (err) {
        console.log(err)
        alert(err)
      }
      if (res) {
        this.doneToast(res)
      }
    },
    doneToast(res) {
      this.$toast.success('Done!', { duration: 1000, className: 'toast' })
      this.$store.commit('setEdit', false)
      setTimeout(function () {
        if (res == 'OK') {
          location.href = '/'
        } else {
          location.href = '/brand'
        }
      }, 1200)
    },
    editbrand(brand) {
      this.formid = brand.id
      this.formbrand = brand.brand
      this.formvisible = brand.visible
      this.old = brand
    },
    newbrand() {
      this.formid = null
      this.formbrand = null
      this.formvisible = 1
      this.old = false
    },
    async deletebrand(brand) {
      await this.$store.dispatch('deleteBrandAction', brand)
      location.href = '/brand'
    },
  }
}
</script>
