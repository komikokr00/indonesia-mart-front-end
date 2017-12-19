<template src='./adminPage.html'></template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'adminPage',
  data: () => ({
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
    onSetClick () {
      this.$store.dispatch('setDbDataAdmin', this.dataAdmin)
      this.$router.push('navibahaya')
    },
    onKembaliClick () {
      this.$router.push('utama')
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'dataAdmin'
    ])
  },
  created () {
    if (this.isAdmin && (this.dataAdmin === null || this.dataAdmin === undefined)) {
      this.$store.dispatch('getDbDataAdmin')
    }
  }
}
</script>