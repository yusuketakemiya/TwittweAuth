<template>
  <div id="app">
    <header class="topbar">
      <div class="container">
        <a class="topbarbrand" href="/#/">
          <img src="./assets/title.png">
        </a>
      </div>
    </header>
    <img src="./assets/nikukyu.png">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created: function () {
    this.init()
  },
  methods: {
    init () {
      this.authTwitterLoad()
      if (this.$store.state.twitter.isAuth) {
        if ( location.pathname === '/#/Main') { return }
        location.href = './#/Main'
        return
      }
      location.href = './#/Auth'
    },
    ...mapActions(['authTwitterLoad'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
