<template src="./components/main/mainPage.html">
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data: () => ({
    toolbarColor: 'red darken-1',
    drawer: null,
    search_drawer: null,
    selectCari: ''
  }),
  computed: {
    ...mapGetters([
      'barangs',
      'barangsNamas',
      'kategoris',
      'kategori',
      'favorit',
      'isAdmin',
      'naviRutes',
      'queryLimit'
    ])
  },
  methods: {
    onClickDrawer (_itm) {
      if (this.$route.name !== 'frontPage') {
        this.$router.replace('/')
      }
      this.$store.commit('setKategori', _itm)
      if (!this.$vuetify.breakpoint.lgAndUp) {
        this.drawer = !this.drawer
      }
    },
    onClickTo (_val) {
      this.$router.push(_val)
    },
    onClickSearch () {
      this.$store.commit('setKataCari', null)
      this.$store.commit('setKataCari', this.selectCari)
    },
    gotoUrl (_url) {
      window.open(_url, '_blank')
    }
  },
  created () {
    this.$store.dispatch('getDbKemasans')
    this.$store.dispatch('getDbKategoris')
    this.$store.commit('initKategori')
    this.$store.dispatch('getDbBarangsFavorit', {limit: this.queryLimit, continue: false})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
