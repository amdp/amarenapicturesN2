<template>
  <b-container class="p-0 m-0 mb-5">
    <h2 class="text-center my-4">VIDEO EDIT/UPLOAD</h2>
    <p class="d-flex justify-content-center">
      <nuxt-link to="/cms/brand" class="amarenared">
        ADD A NEW BRAND INSTEAD
      </nuxt-link>
    </p>
    <b-row class="p-0 m-0 mb-5">
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <b-form @submit.prevent="videoForm()" class="mt-3 was-validated">
          <b-form-group
            label-for="videoFileInput"
            label="Video file upload:"
            description="The video file"
            v-if="!old"
          >
            <b-form-file
              id="videoFileInput"
              v-model="formVideoFile"
              ref="formVideoFile"
              size="sm"
              required
            ></b-form-file>
          </b-form-group>

          <p class="d-flex justify-content-center">
            <b-link @click="newvideo()" class="amarenared" v-if="old">
              CANCEL EDIT, ADD A NEW VIDEO
            </b-link>
          </p>

          <b-form-group
            label-for="imageFileInput"
            label="Image upload:"
            description="The video image"
            v-if="!old"
          >
            <b-form-file
              id="imageFileInput"
              v-model="formImageFile"
              ref="formImageFile"
              size="sm"
              required
            ></b-form-file>
          </b-form-group>

          <b-form-group
            label-for="videoFileInput"
            label="Video file upload:"
            description="The video file"
            v-if="old"
          >
            <b-form-file
              id="videoFileInput"
              v-model="formVideoFile"
              ref="formVideoFile"
              size="sm"
            ></b-form-file>
          </b-form-group>

          <b-form-group
            label-for="imageFileInput"
            label="Image upload:"
            description="The video image"
            v-if="old"
          >
            <b-form-file
              id="imageFileInput"
              v-model="formImageFile"
              ref="formImageFile"
              size="sm"
            ></b-form-file>
          </b-form-group>
          <b-form-group
            label-for="idInput"
            label="Id:"
            description="The video id, if inserting a new video leave blank for automated id assignment"
            v-if="!old"
          >
            <b-form-input
              id="idInput"
              v-model="formid"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="idInput"
            label="Id:"
            description="The video id, if inserting a new video leave blank for automated id assignment"
            v-if="old"
          >
            <b-form-input
              id="idInput"
              v-model="formid"
              size="sm"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="titleInput"
            label="Title:"
            description="Insert the video title"
          >
            <b-form-input
              id="titleInput"
              v-model="formtitle"
              size="sm"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            label-for="yearInput"
            label="Year:"
            description="Insert the video year"
          >
            <b-form-select id="yearInput" v-model="formyear" size="sm" required>
              <option v-for="year in 100" :key="year">{{ 2010 + year }}</option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-for="brandInput"
            label="Brand:"
            description="Insert the video brand"
          >
            <b-form-select
              id="brandInput"
              v-model="formbrand"
              size="sm"
              required
            >
              <option
                v-for="brand in $store.state.brand"
                :key="brand.id"
                :value="brand.brand"
              >
                {{ brand.brand }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-for="agencyInput"
            label="Agency:"
            description="Insert the video agency"
          >
            <b-form-input
              id="agencyInput"
              v-model="formagency"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="productionInput"
            label="Production:"
            description="Insert the video production"
          >
            <b-form-input
              id="productionInput"
              v-model="formproduction"
              size="sm"
              required
            ></b-form-input>
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
          <b-form-group
            label-for="abstractInput"
            label="Abstract:"
            description="Insert the video abstract"
          >
            <b-form-input
              id="abstractInput"
              v-model="formabstract"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-for="abstractitInput"
            label="Abstract in italian:"
            description="Insert the video abstract in Italian"
          >
            <b-form-input
              id="abstractitInput"
              v-model="formabstractit"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            class="btn bhtrust btn-block mt-3 mb-3 gray border-0"
          >
            <span v-if="!editing">GO!</span>
            <b-spinner small v-if="editing" class="m-1"></b-spinner>
            <span v-if="editing">Reloading the video..</span>
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-container class="p-0 m-0 mb-5">
      <b-row
        v-for="video in $store.state.videoall"
        :key="video.id"
        class="p-0 m-0 mb-5"
      >
        <b-col cols="1">{{ video.id }}</b-col>
        <b-col cols="2">{{ video.video }}</b-col>
        <b-col cols="2">{{ video.title }}</b-col>
        <b-col cols="1">{{ video.year }}</b-col>
        <b-col cols="2">{{ video.brand }}</b-col>
        <b-col cols="2">{{ video.agency }}</b-col>
        <b-col cols="2">{{ video.production }}</b-col>
        <b-col cols="2" class="amarenared">Visible: {{ video.visible }}</b-col>
        <b-col cols="4" class="amarenared">{{ video.abstract }}</b-col>
        <b-col cols="4" class="amarenared">{{ video.abstractit }}</b-col>
        <b-col cols="1" @click="editvideo(video)" class="amarenared pointer">
          EDIT
        </b-col>
        <b-col cols="1" @click="deletevideo(video)" class="amarenared pointer">
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
      title: 'Amarena Pictures - Video Form'
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getBrandAction')
    await store.dispatch('getVideoAllAction')
  },
  mounted() {
    console.log('mounted ' + JSON.stringify(this.$store.state.videoall))
    console.log('edit: ' + JSON.stringify(this.$store.state.edit))
  },
  data() {
    return {
      editing: false,
      old: this.$store.state.edit,
      formid: this.$store.state.edit
        ? this.$store.state.edit.id
        : null,
      formfilename: this.$store.state.edit
        ? this.$store.state.edit.video
        : null,
      formtitle: this.$store.state.edit
        ? this.$store.state.edit.title
        : null,
      formyear: this.$store.state.edit
        ? this.$store.state.edit.year
        : null,
      formbrand: this.$store.state.edit
        ? this.$store.state.edit.brand
        : null,
      formagency: this.$store.state.edit
        ? this.$store.state.edit.agency
        : null,
      formproduction: this.$store.state.edit
        ? this.$store.state.edit.production
        : null,
      formvisible: this.$store.state.edit
        ? this.$store.state.edit.visible
        : '1',
      formabstract: this.$store.state.edit
        ? this.$store.state.edit.abstract
        : null,
      formabstractit: this.$store.state.edit
        ? this.$store.state.edit.abstractit
        : null,
      formVideoFile: null,
      formImageFile: null,
    }
  },
  methods: {
    async videoForm() {
      if (this.formVideoFile && this.formImageFile) {
        if (this.formVideoFile.name.slice(0, -4) != this.formImageFile.name.slice(0, -4)) {
          return alert('The video filename and image filename differ, please upload the two files with the same name and of course .mp4 for the video and .jpg for the image, thanks.')
        }
      }
      this.editing = true
      // This function creates and sends database request body both for video creation and update
      //'new' is set for a new video, if not the edit.id is taken from url to update or copy old ones
      var formBodyRequest = {
        id: this.formid,
        video: this.formVideoFile ? this.formVideoFile.name.slice(0, -4) : this.old.video,
        title: this.formtitle,
        year: this.formyear,
        brand: this.formbrand,
        agency: this.formagency,
        production: this.formproduction,
        visible: this.formvisible,
        abstract: this.formabstract,
        abstractit: this.formabstractit,
        direction: 'Alessandro Merletti De Palo & Giovanni Caloro',
        old: this.old
      }
      let res
      try {
        res = await this.$store.dispatch('videoFormAction', formBodyRequest)
      } catch (err) {
        console.log(' ' + JSON.stringify(err))
        alert(err)
      }
      if (res == 'exists') {
        return this.$toast.show('video filename already exists!', {
          duration: 1500,
          className: 'toast'
        })
      } else {
        try {
          this.imagevideoUpload()
        } catch (err) {
          console.log(' ' + JSON.stringify(err))
          alert(err)
        }
      }
    },
    async imagevideoUpload() {
      let formImageVideoData = new FormData()
      formImageVideoData.append('video', this.formVideoFile)
      formImageVideoData.append('image', this.formImageFile)
      let res
      try {
        res = await this.$store.dispatch('imageVideoUploadAction', {
          formImageVideoData: formImageVideoData,
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
          location.href = '/cms/video'
        }
      }, 1200)
    },
    editvideo(video) {
      this.formid = video.id
      this.formvisible = video.visible
      this.formfilename = video.video
      this.formtitle = video.title
      this.formyear = video.year
      this.formbrand = video.brand
      this.formagency = video.agency
      this.formproduction = video.production
      this.formvisible = video.visible
      this.formabstract = video.abstract
      this.formabstractit = video.abstractit
      this.old = video
    },
    newvideo() {
      this.formid = null
      this.formvisible = null
      this.formfilename = null
      this.formtitle = null
      this.formyear = null
      this.formbrand = null
      this.formagency = null
      this.formproduction = null
      this.formvisible = 1
      this.formabstract = null
      this.formabstractit = null
      this.old = false
    },
    async deletevideo(video) {
      await this.$store.dispatch('deleteVideoAction', video)
      location.href = '/cms/video'
    },
  }
}
</script>
