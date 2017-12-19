<template src='./loginPage.html'></template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'loginPage',
  data: () => ({
    e1: true,
    password: '',
    email: '',
    rules: {
      required: (value) => !!value || 'Perlu.',
      password: (value) => {
        return value.length >= 8 || 'Kata Kunci minimal 8 karakter.'
      },
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Nama / Email tidak tepat.'
      }
    }
  }),
  methods: {
    onLoginClick () {
      this.$store.dispatch('signInUser', {email: this.email, password: this.password})
    }
  },
  watch: {
    isAdmin (_val) {
      if (_val) this.$router.replace('/navibahaya')
    },
    currentUser (_val) {
      console.log(_val)
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'currentUser'
    ])
  }
}
</script>