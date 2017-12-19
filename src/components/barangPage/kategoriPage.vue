<template src='./kategoriPage.html'></template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'kategoriPage',
  data: () => ({
    newkategori: {index: '', icon: '', nama: ''},
    kategorisHeaders: [
      { text: 'ID', align: 'left', value: 'No' },
      { text: 'Nama', align: 'left', value: 'nama' },
      { text: 'Index', align: 'left', value: 'index' },
      { text: 'Nama Icon', align: 'left', value: 'icon_name' },
      { text: 'Icon', align: 'left', value: 'icon' },
      { text: 'Pengaturan', align: 'left', value: 'action' }
    ]
  }),
  methods: {
    tambah () {
      this.$store.dispatch('tambahDbKategori', this.newkategori)
    },
    simpan () {
      this.$store.dispatch('setDbKategoris', this.kategoris)
    },
    hapus (_itm) {
      this.$store.dispatch('deleteDbKategori', _itm)
    }
  },
  computed: {
    ...mapGetters([
      'kategoris'
    ])
  },
  created () {
    this.$store.dispatch('getDbKategoris')
  }
}
</script>