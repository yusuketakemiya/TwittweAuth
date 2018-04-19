<template>
  <div class="start">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <button
          class="p-lp__hero-button o-button -twitter"
          @click='authTwitterCall'
        >
          Twitterログイン
        </button>
      </li>
      <li>
        <button
          @click='authTwitterClear'
        >
          test-twitter-clear
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Start',
  data () {
    return {
      msg: 'Top'
    }
  },
  methods: {
    authTwitterCall () {
      this.authTwitterLoad()
      if (this.$store.state.twitter.token !== null && this.$store.state.twitter.token !== undefined) { return }
      if (this.$store.state.twitter.verifier !== null && this.$store.state.twitter.verifier !== undefined) { return }
      this.authTwitter()
      if (this.$store.state.twitter.authUrl == null) { return }
      window.open(this.$store.state.twitter.authUrl)
    },
    ...mapActions(['authTwitter']),
    ...mapActions(['authTwitterClear']),
    ...mapActions(['authTwitterLoad'])
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
