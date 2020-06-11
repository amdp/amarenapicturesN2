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