<template>
  <b-container class="m-0 p-0" fluid>
    <headernav />
    <nuxt class="m-0 p-0" />
    <foot />
  </b-container>
</template>

<script>
import gdprmodal from '@/components/gdprmodal'
import foot from '@/components/foot'
import headernav from '@/components/headernav'
export default {
  components: {
    headernav: headernav,
    gdprmodal: gdprmodal,
    foot: foot,
  }
}
</script>