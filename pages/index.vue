<template>
  <div class="m-0 p-0">
    <brands />
    <videolist />
  </div>
</template>

<script>
import brands from '@/components/brands'
import videolist from '@/components/videolist'

export default {
  components: { brands: brands, videolist: videolist },
  async fetch({ store, params }) {
    await store.dispatch('getBrandsAction')
    await store.dispatch('getVideosAction')
  }
}
</script>
