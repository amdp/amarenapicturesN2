<template>
  <b-container class="m-0 p-0" fluid>
    <img
      height="1"
      width="1"
      style="display:none;"
      alt=""
      src="https://px.ads.linkedin.com/collect/?pid=2225833&fmt=gif"
    />
    <nuxt class="m-0 p-0" />
    <foot />
  </b-container>
</template>

<script>
import foot from '@/components/foot'
export default {
  head() {
    return {
      title: 'Amarena Pictures',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preload',
          href:
            'https://fonts.googleapis.com/css?family=Oswald:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap',
          as: 'style',
        },
      ],
      script: [
        { src: '/gdpr/cookies.js', type: 'text/javascript' },
        { src: '/gdpr/ga.js', type: 'text/javascript', 'data-starcookie': 'statistics' },
        { src: '/gdpr/linkedin.js', type: 'text/plain', 'data-starcookie': 'statistics' },
      ],
    }
  },
  components: {
    foot: foot,
  }
}
</script>