<template>
  <b-container class="m-0 p-0" fluid>
    <b-container class="m-0 p-0 z-2 thatsamarena" fluid>
      <thatsamarena />
    </b-container>
    <b-container class="m-0 p-0" fluid>
      <img
        height="1"
        width="1"
        style="display: none;"
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=2225833&fmt=gif"
      />
      <b-container class="m-0 p-0 o-0" fluid>
        <thatsamarena />
      </b-container>
      <b-container class="m-0 mt-3 p-0 z-1">
        <mainamarena />
      </b-container>
      <nuxt class="m-0 p-0 mobile" />
      <foot />
    </b-container>
  </b-container>
</template>

<script>
import foot from '@/components/foot'
import thatsamarena from '@/components/thatsamarena'
import mainamarena from '@/components/mainamarena'
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
    thatsamarena: thatsamarena,
    mainamarena: mainamarena,
  }
}
</script>