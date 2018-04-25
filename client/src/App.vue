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
    <router-view v-bind:todos="todos" ></router-view>
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
      if (this.$store.state.main.isInit === false) { return }
      this.authTwitterLoad()
      this.$store.commit('initStateRegist', false)
      if (this.$store.state.twitter.isAuth) {
        this.$router.push({ name: 'Main' })
        return
      }
      this.$router.push({ name: 'Auth' })
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
