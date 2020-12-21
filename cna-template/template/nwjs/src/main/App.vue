<template>
  <v-app>
    <v-app-bar
      app
      dense
      color="primary"
      dark
    >
      <span></span>
      <div style="-webkit-app-region: drag;">
        <span class="hidden-sm-and-down">NWJS</span>
      </div>
      <div class="d-flex flex-grow-1" style="-webkit-app-region: drag;height: 100%"></div>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    close() {
      close()
    }
  }
}
</script>
<style lang="scss">
html, body {
  overflow: hidden;
  .v-main {
    overflow: auto;
  }
}
</style>