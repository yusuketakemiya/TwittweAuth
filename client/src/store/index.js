import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const AUTHORIZE_URL = 'http://localhost:8080/twitteroauthurl'
const ACCESS_TOKEN_URL = 'http://localhost:8080/twittergetaccesstoken'

export default new Vuex.Store({
  state: {
    twitter: {
      token: null,
      verifier: null,
      authUrl: null,
      isAuth: false
    }
  },
  mutations: {
    authUrlRegist ({ twitter }, authUrl) {
      twitter.authUrl = authUrl
    },
    authTokenRegist ({ twitter }, token) {
      twitter.token = token
      if (token == null) {
        localStorage.removeItem('oauth_token')
        twitter.isAuth = false
      } else {
        localStorage.setItem('oauth_token', token)
        twitter.isAuth = true
      }
    },
    authVerifierRegist ({ twitter }, verifier) {
      twitter.verifier = verifier
      if (verifier == null) {
        localStorage.removeItem('oauth_verifier')
        twitter.isAuth = false
      } else {
        localStorage.setItem('oauth_verifier', verifier)
        twitter.isAuth = true
      }
    },
    authUserTokenRegist ({ twitter }, token) {
      alert('authUserTokenRegist:' + token)
    },
    authUserSecretRegist ({ twitter }, secret) {
      alert('authUserSecretRegist:' + secret)
    }
  },
  actions: {
    authTwitter ({commit}) {
      console.log('authTwitter:' + AUTHORIZE_URL)
      fetch(AUTHORIZE_URL)
        .then(response => {
          alert('authTwitter response')
          if (response.ok) {
            return response.text()
          } else {
            alert(response)
            throw new Error()
          }
        })
        .then(data => {
          console.log(data)
          commit('authUrlRegist', data.url)
        })
        .catch(error => {
          alert('authTwitter error:' + error)
          console.error('Error:', error)
        })
    },
    getAccessTokenTwitter ({commit, state}) {
      var url = ACCESS_TOKEN_URL + '?' + 'oauth_token=' + state.twitter.token + '&' + 'oauth_verifier=' + state.twitter.verifier
      console.log('getAccessTokenTwitter:' + url)
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          commit('authUserTokenRegist', data.token)
          commit('authUserSecretRegist', data.secret)
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
