<template>
  <b-container fluid>
    <b-row class="m-0 p-2">
      <b-col cols="2">
        <p>
          <nuxt-link to="/">
            <img
              src="~assets/amarena-logo.svg"
              class="amarenalogo float-left"
            />
          </nuxt-link>
        </p>
      </b-col>
      <b-col cols="8" class="text-center t18">
        <nuxt-link to="/" class="mr-3">ABOUT US</nuxt-link>
        <nuxt-link to="/" class="mr-3">VIDEOS</nuxt-link>
        <nuxt-link to="/" class="mr-3">CONTACT</nuxt-link>
      </b-col>
      <b-col cols="2" class="text-right">
        <nuxt-link to="/user">
          <em>User</em>
        </nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>
