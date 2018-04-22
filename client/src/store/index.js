import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    authTwitter ({commit}, authLocationHref) {
      console.log('authTwitter:' + AUTHORIZE_URL)
      axios.get(AUTHORIZE_URL)
        .then(response => {
          console.log(response.data)
          commit('authUrlRegist', response.data.url)
          authLocationHref(response.data.url)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    },
    getAccessTokenTwitter ({commit, state}) {
      var url = ACCESS_TOKEN_URL + '?' + 'oauth_token=' + state.twitter.token + '&' + 'oauth_verifier=' + state.twitter.verifier
      console.log('getAccessTokenTwitter:' + url)
      axios.get(url)
        .then(response => {
          alert('getAccessTokenTwitter get')
          commit('authUserTokenRegist', response.data.token)
          commit('authUserSecretRegist', response.data.secret)
        })
        .catch(error => {
          alert('getAccessTokenTwitter catch')
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
