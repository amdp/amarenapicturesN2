<template>
  <div class="m-0 p-0">
    <home />
    <videolist />
  </div>
</template>

<script>
import home from '@/components/home'
import videolist from '@/components/videolist'

export default {
  components: { home: home, videolist: videolist },
}
</script>
