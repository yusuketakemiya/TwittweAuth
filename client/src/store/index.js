import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const URI = 'http://localhost:8080/twitteroauthurl'

export default new Vuex.Store({
  state: {
    twitter: {
      token: null,
      verifier: null,
      authUrl: null
    }
  },
  mutations: {
    authUrlRegist ({ twitter }, authUrl) {
      twitter.authUrl = authUrl
    },
    authTokenKeyRegist ({ twitter }, token, verifier) {
      twitter.token = token
      twitter.verifier = verifier
      if (token == null) {
        localStorage.removeItem('oauth_token')
        localStorage.removeItem('oauth_verifier')
      } else {
        localStorage.setItem('oauth_token', token)
        localStorage.setItem('oauth_verifier', verifier)
      }
    }
  },
  actions: {
    authTwitter ({commit}) {
      console.log('authTwitter:' + URI)
      fetch(URI)
        .then(res => { return res.json() })
        .then(data => {
          console.log(data)
          commit('authUrlRegist', data.url)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    },
    authTwitterClear ({commit}) {
      commit('authTokenKeyRegist', null, null)
    },
    authTwitterLoad ({commit}) {
      var oauthtoken = localStorage.getItem('oauth_token')
      var oauthverifier = localStorage.getItem('oauth_verifier')
      commit('authTokenKeyRegist', oauthtoken, oauthverifier)
    }
  }
})
