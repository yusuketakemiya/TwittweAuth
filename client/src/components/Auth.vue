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
import axios from 'axios'
const ACCESS_TOKEN_URL = 'http://localhost:8080/twittergetaccesstoken'

export default {
  name: 'Auth',
  isLoad: false,
  data () {
    return {
      msg: 'Top'
    }
  },
  mounted: function () {
    if (!this.urlParce()) {
      this.sleepstart()
    }
    alert('end mounted')
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

      var url = ACCESS_TOKEN_URL + '?' + 'oauth_token=' + token + '&' + 'oauth_verifier=' + verifier
      console.log('getAccessTokenTwitterTest:' + url)
      try {
        alert('getAccessTokenTwitterTest axios.get(url)')
        const response = await axios.get(url)
        alert('getAccessTokenTwitterTest axios.get(url) end')
        alert('getAccessTokenTwitterTest response:' + response)

        this.sleeppend()
      } catch (error) {
        console.error('Error:', error)
        alert('getAccessTokenTwitterTest Error' + error)
      } finally {
        console.error('getAccessTokenTwitterTest end')
        alert('getAccessTokenTwitterTest end')
      }

      alert('end urlParce')
      return false
    },
    sleepstart () {
      alert('sleepstart')
      this.isLoad = true
      while (this.isLoad) {
        this.sleep(1000)
      }
    },
    sleeppend () {
      alert('sleeppend')
      this.isLoad = false
    },
    async sleep (sec) {
      console.log('wait ' + sec.toString() + ' sec right now!')
      await this.sleepByPromise(sec)
      console.log('wait ' + sec.toString() + ' sec done!')
    },
    sleepByPromise (sec) {
      return new Promise(resolve => setTimeout(resolve, sec * 1000))
    },
    authTwitterCall () {
      this.authTwitter(this.authLocationHref)
    },
    authLocationHref (authUrl) {
      location.href = this.$store.state.twitter.authUrl
    },
    async getAccessTokenTwitterTest (token, verifier, callback) {
      var url = ACCESS_TOKEN_URL + '?' + 'oauth_token=' + token + '&' + 'oauth_verifier=' + verifier
      console.log('getAccessTokenTwitterTest:' + url)
      try {
        alert('getAccessTokenTwitterTest axios.get(url)')
        const response = await axios.get(url)
        alert('getAccessTokenTwitterTest axios.get(url) end')
        alert('getAccessTokenTwitterTest response:' + response)
        callback()
      } catch (error) {
        console.error('Error:', error)
        alert('getAccessTokenTwitterTest Error' + error)
      } finally {
        console.error('getAccessTokenTwitterTest end')
        alert('getAccessTokenTwitterTest end')
      }
      alert('getAccessTokenTwitterTest ended')
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
