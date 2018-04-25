<template>
  <div class="auth">
    <h1>{{ msg }}</h1>
    <h2>Twitterにログインしてください</h2>
    <ul>
      <li>
        <v-ons-button @click='authTwitterCall'>
          Twitterログイン
        </v-ons-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Auth',
  isLoad: false,
  data () {
    return {
      msg: 'Top'
    }
  },
  mounted: function () {
    this.urlParce()
  },
  methods: {
    async urlParce () {
      var parser = new URL(location.href)
      var params = parser.search.split('&')
      var token = params[0].substring(1).split('=')[1]
      if (token === undefined) { return true }
      var verifier = params[1].split('=')[1]
      this.$store.commit('authTokenRegist', token)
      this.$store.commit('authVerifierRegist', verifier)
      this.getAccessTokenTwitter()
      this.$router.push({ name: 'Main' })
    },
    authTwitterCall () {
      this.authTwitter(this.authLocationHref)
    },
    authLocationHref (authUrl) {
      location.href = this.$store.state.twitter.authUrl
    },
    ...mapActions(['authTwitter']),
    ...mapActions(['getAccessTokenTwitter'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.o-button.-twitter {
    color: #fff;
    background-color: #5babea;
    border-color: transparent;
}
</style>
