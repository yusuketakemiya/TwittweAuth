<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <h2>Main!!</h2>
    <ul>
      <li>
        <v-ons-button @click='authTwitterClearCall'>
          Twitterログアウト
        </v-ons-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Main'
    }
  },
  created: function () {
  },
  methods: {
    authTwitterClearCall: function () {
      this.authTwitterClear()
      location.href = './#/Auth'
    },
    ...mapActions(['authTwitterClear'])
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
