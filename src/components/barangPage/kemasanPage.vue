<template src='./kemasanPage.html'>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'kemasanPage',
  data: () => ({
    newkemasan: {index: '', nama: '', harga: '', detil: ''},
    kemasansHeaders: [
      { text: 'ID', align: 'left', value: 'id' },
      { text: 'Nama Kemasan', align: 'left', value: 'nama' },
      { text: 'No. Indeks', align: 'left', value: 'index' },
      { text: 'Harga', align: 'left', value: 'harga' },
      { text: 'Keterangan', align: 'left', value: 'detil' }
    ]
  }),
  methods: {
    tambah () {
      this.$store.dispatch('tambahDbKemasan', this.newkemasan)
    },
    simpan () {
      this.$store.dispatch('setDbKemasan', this.kemasans)
    },
    hapus (_itm) {
      this.$store.dispatch('deleteDbKemasan', _itm)
    }
  },
  computed: {
    ...mapGetters([
      'kemasans'
    ])
  },
  created () {
    this.$store.dispatch('getDbKemasans')
  }
}
</script>