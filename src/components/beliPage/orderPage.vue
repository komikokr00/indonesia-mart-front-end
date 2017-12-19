<template src='./orderPage.html'></template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'orderPage',
  data: () => ({
    kodevalid: false,
    email: '',
    kode: '',
    rules: {
      required: (value) => !!value || 'Perlu.',
      kode: (value) => {
        const pattern = /^[a-zA-Z0-9]+$/g
        return pattern.test(value) || 'Kode tidak tepat'
      },
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Nama / Email tidak tepat.'
      }
    }
  }),
  props: ['orderId'],
  computed: {
    ...mapGetters([
      'kategoris',
      'barangsBeli',
      'barangsBeliTotalHarga',
      'kemasans',
      'kemasan',
      'pemesan',
      'orderCheck'
    ]),
    hargaTotal () {
      return this.barangsBeliTotalHarga + this.kemasan.harga
    },
    plist () {
      var val = []
      var orderPemesan = this.orderCheck.pemesan
      val.push({header: 'Nama', content: orderPemesan.nama})
      val.push({header: 'Alamat', content: orderPemesan.alamat})
      val.push({header: 'Telepon', content: orderPemesan.telepon})
      val.push({header: 'Email', content: orderPemesan.email.split('@')[0], orderPemesan: '@' + orderPemesan.email.split('@')[1]})
      return val
    }
  },
  methods: {
    onClickCek () {
      this.$store.dispatch('getDbOrderId', {orderId: this.orderId, email: this.email, kode: this.kode})
    },
    calcSubTotal (_itm) {
      return parseInt(_itm.harga * _itm.jumlah)
    },
    onKembali () {
      this.$store.commit('setOrderCheck', null)
      this.$router.replace('/')
    }
  },
  created () {
    this.$store.commit('setOrderCheck', null)
    if (this.kategoris === null && this.kategoris === undefined) {
      this.$store.dispatch('getDbKategoris')
    }
    if (this.kemasan === null || this.kemasan === undefined) {
      this.$store.commit('setKemasan', {harga: 0, nama: ''})
    }
  }
}
</script>