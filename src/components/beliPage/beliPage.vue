<template src="./beliPage.html">
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'beliPage',
    data: () => ({
      submited: false,
      dialog: false,
      dBarang: {nama: 'Tidak Ada', detil: 'Tidak Ada', harga: '0', img: 'none'},
      kemasansItems: null,
      e6: 1,
      rules: {
        required: (value) => !!value || 'Harus diisi.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email tidak tepat.'
        },
        telepon: (value) => {
          const pattern = /^[0-9]+$/g
          return pattern.test(value) || 'Telepon tidak tepat.'
        },
        nama: (value) => {
          const pattern = /^[a-zA-Z\u3131-\uD79D .]+$/ug
          return pattern.test(value) || 'Nama tidak tepat.'
        },
        alamat: (value) => {
          const pattern = /^[a-zA-Z0-9\u3131-\uD79D .-]+$/ug
          return pattern.test(value) || 'Alamat tidak tepat.'
        }
      },
      pemesanvalid: false
    }),
    computed: {
      ...mapGetters([
        'kategoris',
        'barangsBeli',
        'barangsBeliTotalHarga',
        'kemasans',
        'kemasan',
        'pemesan'
      ]),
      hargaTotal () {
        return this.barangsBeliTotalHarga + this.kemasan.harga
      },
      plist () {
        var val = []
        val.push({header: 'Nama', content: this.pemesan.nama})
        val.push({header: 'Alamat', content: this.pemesan.alamat})
        val.push({header: 'Telepon', content: this.pemesan.telepon})
        val.push({header: 'Email', content: this.pemesan.email.split('@')[0], content2: '@' + this.pemesan.email.split('@')[1]})
        return val
      }
    },
    watch: {
      kemasans () {
        this.updateKemasansItems()
      }
    },
    methods: {
      getKategoriNama (_itm) {
        return this.kategoris.filter((itm) => itm.id === _itm.kategori)[0].nama
      },
      calcSubTotal (_itm) {
        return parseInt(_itm.harga * _itm.jumlah)
      },
      chkKemasan (_idx) {
        this.kemasansItems.map((itm) => { itm.selected = false })
        this.kemasansItems[_idx].selected = true
        this.$store.commit('setKemasan', this.kemasansItems[_idx])
      },
      delBBeli (_idx) {
        this.$store.commit('deleteBarangsBeli', {start: _idx, count: 1})
        this.$store.commit('updateBarangsBeli')
      },
      minJml (_props) {
        var jml = _props.item.jumlah--
        this.$store.commit('setBarangsBeliJml', _props)
        this.$store.commit('updateBarangsBeli')
        return jml
      },
      plusJml (_props) {
        var jml = _props.item.jumlah++
        this.$store.commit('setBarangsBeliJml', _props)
        this.$store.commit('updateBarangsBeli')
        return jml
      },
      updateKemasansItems () {
        if (this.kemasans !== null && this.kemasans !== undefined) {
          var val = {}
          this.kemasansItems = []
          this.kemasans.map((itm) => {
            val = {...itm}
            if (this.kemasan.id === itm.id) val.selected = true
            else val.selected = false
            this.kemasansItems.push(val)
          })
        }
      },
      onImgClick (_itm) {
        this.dBarang = {..._itm}
        this.dialog = true
      },
      onClickSubmit () {
        this.$store.dispatch('updateDbLikes', this.barangsBeli)
        this.$store.dispatch('submitOrder')
        this.submited = true
      }
    },
    created () {
      this.submited = false
      if (this.barangsBeli === null || this.barangsBeli === undefined) {
        this.$router.replace('/')
      }
      if (this.kemasans === null || this.kemasans === undefined) {
        this.$store.dispatch('getDbKemasans')
      }
      this.updateKemasansItems()
      if (this.pemesan === null || this.pemesan === undefined) {
        this.$store.commit('setPemesan', {nama: '', alamat: '', email: '', telepon: ''})
      }
      if (this.kemasan === null || this.kemasan === undefined) {
        this.$store.commit('setKemasan', {harga: 0, nama: null})
      }
    }
  }
</script>