export const state = () => ({
  videos: []
})

export const getters = {}

export const mutations = {
  setVideos: (state, payload) => {
    state.videos = payload
  },
  setImages: (state, payload) => {
    state.images = payload
  }
}

export const actions = {
  getVideosAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/videos', {
      params: payload
    })
    context.commit('setVideos', data)
  },
  getImagesAction: async function(context, payload) {
    let { data } = await this.$axios.get(process.env.DBURL + '/images', {
      params: payload
    })
    context.commit('setImages', data)
  }
}
