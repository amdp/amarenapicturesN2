<template>
  <b-container class="m-0 p-0 pt-3 main" fluid>
    <b-row class="p-0 m-0 pt-3 mb-5">
      <b-col cols="12" class="m-0 p-0 majestic text-center">
        <nuxt-link to="/"
          ><span class="amarenared">AMARENA</span> PICTURE<span
            class="noletterspacing"
            >S</span
          ></nuxt-link
        >
      </b-col>
    </b-row>
    <b-row class="p-0 m-0">
      <b-col cols="12" class="text-center weprovide p-0 m-0 px-2 mt-3">
        <span v-html="$t('home.head')"></span>
      </b-col>
    </b-row>
  </b-container>
</template>