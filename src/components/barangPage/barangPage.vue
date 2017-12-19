<template src='./barangPage.html'></template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'barangPage',
  data: () => ({
    newbarang: {kategori: '', nama: '', detil: '', jenis: '', perusahaan: '', harga: '', img: '', likes: 0},
    barangsHeaders: [
      { text: 'ID', align: 'left', value: 'id' },
      { text: 'Gambar', align: 'left', value: 'gambar' },
      { text: 'Nama', align: 'left', value: 'nama' },
      { text: 'Kategori', align: 'left', value: 'kategori' },
      { text: 'Jenis', align: 'left', value: 'jenis' },
      { text: 'Perusahaan', align: 'left', value: 'perusahaan' },
      { text: 'Keterangan', align: 'left', value: 'text' },
      { text: 'Harga', align: 'left', value: 'harga' },
      { text: 'Favorit', align: 'left', value: 'favorit' },
      { text: 'Pengaturan', align: 'left', value: 'pengaturan' }
    ],
    barangsItems: [],
    totalItems: 0,
    pagination: {}
  }),
  methods: {
    tambah () {
      this.$store.dispatch('tambahDbBarang', this.newbarang)
    },
    hapusBarang (_itm) {
      this.$store.dispatch('deleteDbBarang', _itm)
    },
    setBarang (_itm) {
      this.$store.dispatch('setDbBarang', _itm)
    },
    simpan () {
      this.$store.dispatch('setDbBarangs', this.barangsItems)
    },
    tambahlist () {
      this.$store.dispatch('getDbBarangs', {limit: 4, continue: true})
      this.updateBarangItems()
    },
    updateBarangItems () {
      this.barangsItems = []
      if (this.barangs !== null && this.barangs !== undefined) {
        this.barangs.map((itm) => {
          var val = {...itm}
          this.barangsItems.push(val)
        })
      }
    }
  },
  watch: {
    barangs () {
      this.updateBarangItems()
    }
  },
  computed: {
    ...mapGetters([
      'kategoris',
      'barangs'
    ])
  },
  created () {
    // this.$store.commit('setBarangs', null)
    this.$store.dispatch('getDbKategoris')
    this.$store.dispatch('getDbBarangs', {limit: 4, continue: true})
  }
}
</script>