export const state = () => ({
  videos: [],
  brands: []
})

export const getters = {}

export const mutations = {
  setVideos: (state, payload) => {
    state.videos = payload
  },
  setBrands: (state, payload) => {
    state.brands = payload
  }
}

export const actions = {
  getBrandsAction: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/brands')
    context.commit('setBrands', data)
  },
  getVideosAction: async function (context) {
    let { data } = await this.$axios.get(process.env.DBURL + '/videos')
    context.commit('setVideos', data)
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
}
