<template>
  <div class="auth">
    <ul>
      <li>
        <button
          @click='initial'
        >
          test
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  created: function () {
    this.initial()
  },
  methods: {
    initial: function () {
      var parser = new URL(location.href)
      var params = parser.search.split('&')
      var token = params[0].substring(1).split('=')[1]
      var verifier = params[1].split('=')[1]
      this.$store.commit('authTokenKeyRegist', token, verifier)
    }
  }
}
</script>

<style>
</style>
