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
