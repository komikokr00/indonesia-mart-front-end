<template src='./naviPage.html'></template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'naviPage',
  data: () => ({
  }),
  methods: {
    onClickTo (_val) {
      this.$router.push(_val)
    }
  },
  computed: {
    ...mapGetters([
      'naviRutes'
    ])
  }
}
</script>