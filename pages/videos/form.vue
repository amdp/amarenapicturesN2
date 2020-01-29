<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h2 class="text-center mb-4 diversity">VIDEO EDIT/UPLOAD</h2>
      <b-form @submit.prevent="videoForm()" class="mt-3 was-validated">
        <b-form-group
          label-for="idInput"
          label="Id:"
          description="The video id, if inserting a new video leave blank for automated id assignment"
        >
          <b-form-input id="idInput" v-model="formid" size="sm"></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="nameInput"
          label="Filename:"
          description="The video file name"
        >
          <b-form-input
            id="filenameInput"
            v-model="formfilename"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="titleInput"
          label="Title:"
          description="Insert the video title"
        >
          <b-form-input id="titleInput" v-model="formtitle" size="sm" required>
          </b-form-input>
        </b-form-group>
        <b-form-group
          label-for="yearInput"
          label="Year:"
          description="Insert the video year"
        >
          <b-form-select id="yearInput" v-model="formyear" required>
            <option v-for="year in 100" :key="year">{{ 2010 + year }}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-for="brandInput"
          label="Brand:"
          description="Insert the video brand"
        >
          <b-form-select id="brandInput" v-model="formbrand" required>
            <option
              v-for="brand in $store.brand"
              :key="brand.id"
              :value="brand.name"
            ></option>
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
          <b-form-select id="visibleInput" v-model="formvisible" required>
            <option>1</option>
            <option>0</option>
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

        <b-form-group
          label-for="imageFileInput"
          label="Image upload:"
          description="The video image"
        >
          <b-form-file
            id="imageFileInput"
            v-model="formImageFile"
            ref="formImageFile"
            size="sm"
          ></b-form-file>
        </b-form-group>

        <b-form-group
          label-for="videoFileInput"
          label="Video file upload:"
          description="The video file"
        >
          <b-form-input
            id="videoFileInput"
            v-model="formVideoFile"
            ref="formVideoFile"
            size="sm"
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
    </div>
  </div>
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
    if (store.state.edit.id) {
      await store.dispatch('getVideoAction', {
        videoid: store.state.edit.id,
      })
    }
  },
  data() {
    return {
      editing: false,
      formid: this.$store.state.edit.id
        ? this.$store.state.video[0].id
        : null,
      formfilename: this.$store.state.edit.id
        ? this.$store.state.video[0].name
        : null,
      formtitle: this.$store.state.edit.id
        ? this.$store.state.video[0].title
        : null,
      formyear: this.$store.state.edit.id
        ? this.$store.state.video[0].year
        : null,
      formbrand: this.$store.state.edit.id
        ? this.$store.state.video[0].year
        : null,
      formagency: this.$store.state.edit.id
        ? this.$store.state.video[0].agency
        : null,
      formproduction: this.$store.state.edit.id
        ? this.$store.state.video[0].production
        : null,
      formvisible: this.$store.state.edit.id
        ? this.$store.state.video[0].visible
        : 1,
      formabstract: this.$store.state.edit.id
        ? this.$store.state.video[0].production
        : null,
      formabstractit: this.$store.state.edit.id
        ? this.$store.state.video[0].production
        : null,
      formImageFile: null,
      formVideoFile: null,
      formnewbrand: null,
    }
  },
  methods: {
    async addbrand() {
      let result = await this.$store.dispatch('brandFormAction', {
        brand: this.formnewbrand,
      })
      if (result == 'exists') {
        this.$toast.success('This year already exists!', {
          duration: 1000,
          className: 'toastunderstanding'
        })
      } else {
        this.$toast.success(this.formnewbrand + ' added!', {
          duration: 1000,
          className: 'toast'
        })
      }
    },
    async videoForm() {
      this.editing = true
      // This function creates and sends database request body both for video creation and updating
      //'new' is set for a new video, if not the param.id is taken from url to update or copy old ones
      let videoid = 'new'
      if (this.$store.state.edit.id) {
        videoid = this.$store.state.edit.id
      }
      var formBodyRequest = {
        id: videoid,
        filename: this.formfilename,
        title: this.formtitle,
        year: this.formyear,
        brand: this.formbrand,
        agency: this.formagency,
        production: this.formproduction,
        visible: this.formvisible,
        abstract: this.formabstract,
        abstractit: this.formabstractit,
        direction: 'Alessandro Merletti De Palo & Giovanni Caloro'
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
          duration: 1000,
          className: 'toast'
        })
      } else {
        try {
          this.imagevideoUpload(res)
        } catch (err) {
          console.log(' ' + JSON.stringify(err))
          alert(err)
        }
      }
    },
    async imagevideoUpload(id) {
      let formImageData = new FormData()
      formImageData.append('file', this.formImageFile)
      formImageData.append('id', id)
      formImageData.append('proptype', 'video')
      // for (var key of formImageData.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }
      let res
      try {
        res = await this.$store.dispatch('imageUploadAction', {
          formImageData: formImageData,
          headers: { headers: { 'Content-Type': 'multipart/form-data' } },
          proptype: 'video'
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
      this.$store.dispatch('editSwitchAction', false)
      setTimeout(function () {
        if (res == 'OK') {
          location.href = process.env.URLHOME + '/video/' + res.id
        } else {
          location.href = process.env.URLHOME + '/video/' + res
        }
      }, 1200)
    }
  }
}
</script>
