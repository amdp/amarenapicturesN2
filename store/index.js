export const state = () => ({
  video: [],
  brand: [],
  edit: false
})

export const getters = {}

export const mutations = {
  setVideo: (state, payload) => {
    state.video = payload
  },
  setBrand: (state, payload) => {
    state.brand = payload
  },
  setEdit: (state, payload) => {
    state.edit = payload
  }
}

export const actions = {
  getBrandAction: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/brand')
    context.commit('setBrand', data)
  },
  getVideoAction: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/video')
    context.commit('setVideo', data)
  },
  videoFormAction: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/video', payload)
    return data
  },
  contactEmailAction: async function (context, payload) {
    let { data } = await this.$axios.post(process.env.DBURL + '/contactemail', payload)
    return data
  },
  recoverPasswordAction: async function (context, payload) {
    let { data } = await this.$axios.post(
      process.env.DBURL + '/recoverpassword',
      payload
    )
    console.log('data ' + JSON.stringify(data))
    return data
  },
  imageVideoUploadAction: async function (context, payload) {
    for (var key of payload.formImageVideoData.entries()) {
      console.log(key[0] + ', in payload, ' + key[1])
    }
    let { data } = await this.$axios.post(
      process.env.DBURL + '/imagevideofiles',
      payload.formImageVideoData,
      payload.headers
    )
    if (data.id) return data.id
    else return data.status
  },
  editSwitchAction: async function (context, payload) {
    context.commit('setEdit', payload)
  },
}
