<template src='./kirimPage.html'></template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'kirimPage',
  data: () => ({
    headers: [
        { text: 'ID', value: 'id', align: 'left' },
        { text: 'Nama Pemesan', value: 'nama', align: 'left' },
        { text: 'Tanggal', value: 'tanggal', align: 'left' },
        { text: 'Kemasan', value: 'kemasan', align: 'left' },
        { text: 'Biaya', value: 'biaya', align: 'left' },
        { text: 'Bayar', value: 'bayar', align: 'left' },
        { text: 'Kirim', value: 'kirim', align: 'left' }
    ],
    tmp: '',
    datefrom: null,
    dateuntil: null,
    search: null,
    date: null,
    menudateuntil: false,
    selectSudahItem: [
        {text: 'Sudah', value: true},
        {text: 'Belum', value: false}
    ],
    ditem: null,
    dialogDetil: false
  }),
  methods: {
    pad (n) {
      return n < 10 ? '0' + n : n
    },
    getDateString (_date) {
      return '' + _date.getFullYear() + '-' + this.pad(_date.getMonth() + 1) + '-' + this.pad(_date.getDate())
    },
    setOrder (_val, _key, _itm) {
      var payload = {id: '', data: {}}
      payload.id = _itm.id
      payload.data[_key] = _val
      _itm[_key] = _val
      this.$store.dispatch('setDbOrder', payload)
    },
    onClickRow (_itm) {
      this.ditem = null
      this.dialogDetil = true
      this.ditem = _itm
    },
    dialogSave () {
      this.dialogDetil = false
      this.$store.dispatch('setDbOrderBarang', {id: this.ditem.id, data: {barangs: this.ditem.barangs}})
    }
  },
  computed: {
    ...mapGetters([
      'naviRutes',
      'orders'
    ])
  },
  watch: {
    dateuntil (_val) {
      var curMonth = new Date(_val)
      var lastMonth = new Date(_val)
      lastMonth.setMonth(curMonth.getMonth() - 1)
      var lastMonthStr = this.getDateString(lastMonth)
      if (this.datefrom !== lastMonthStr) {
        this.datefrom = lastMonthStr
        this.$store.dispatch('getDbOrders', {datefrom: lastMonth, dateuntil: curMonth})
      }
    }
  },
  created () {
    this.dateuntil = this.getDateString(new Date())
  }
}
</script>