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
  head: {
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css?family=Oswald:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap'
  },
  components: {
    headernav: headernav,
    gdprmodal: gdprmodal,
    foot: foot,
  }
}
</script>