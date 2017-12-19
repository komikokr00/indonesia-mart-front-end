<template src="./frontPage.html">
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'frontPage',
    data: () => ({
      dialog: false,
      dialogedit: false,
      snackbar: false,
      color: 'red darken-1',
      timeout: 0,
      barangItems: [],
      showLoading: false,
      kategoriLoading: true,
      dBarang: {nama: 'Tidak Ada', detil: 'Tidak Ada', harga: '0', img: 'none', jenis: 'none', perusahaan: 'none', kategori: 'none'},
      listMode: false,
      kategorisItems: [],
      kategoriNama: '',
      onCari: false,
      itmsoffsetstart: 0,
      itmsoffsetend: 0,
      scrollLine_old: null,
      clientHeight_old: null,
      tmpItms: null
    }),
    methods: {
      queryNewBarangs () {
        this.showLoading = true
        var limit = 0
        if (!this.onCari) limit = this.queryLimit
        if (this.kategori.all) {
          this.$store.dispatch('getDbBarangsFavorit', {limit: limit, continue: true})
        } else {
          this.$store.dispatch('getDbBarangsKategoris', {limit: limit, continue: true})
        }
      },
      handleScroll (event) {
        if (this.$refs.barangContainerRef !== undefined && this.$refs.barangContainerRef !== null) {
          var scrollLine = (window.innerHeight + window.scrollY) - document.body.clientHeight
          var scrollBorder = (scrollLine >= 60 && scrollLine < 65) // || (scrollLine >= -500 && scrollLine < -300)
          // this.itmsoffset = Math.round(this.queryLimit / 500 * scrollLine * -2)
          // console.log(scrollLine, document.body.clientHeight, this.tmpItms.length)
          if (scrollBorder && !this.showLoading) {
            if (this.getKategorisSnapshotsId === null) this.queryNewBarangs()
            else if (!this.getKategorisSnapshotsId.stop) {
              this.queryNewBarangs()
            }
          }
          // if (document.body.clientHeight > 10000) {
          //   if (scrollLine < -5000) {
          //     console.log('increase')
          //     if (this.itmsoffsetstart >= 36) this.itmsoffsetstart -= 36
          //     this.itmsoffsetend += 10
          //   } else {
          //     console.log('decrease')
          //     this.itmsoffsetstart += 36
          //     if (this.itmsoffsetend >= 36) this.itmsoffsetend -= 36
          //   }
          //   this.pushBarangsItems()
          // }
          // if (this.clientHeight_old !== document.body.clientHeight) this.clientHeight_old = document.body.clientHeight
        }
      },
      onImgClick (_itm) {
        this.dBarang = {..._itm}
        this.dialog = true
      },
      onEditClick (_itm) {
        if (this.isAdmin) {
          this.dBarang = _itm
          this.dialogedit = true
        }
      },
      setBarang (_itm) {
        if (this.isAdmin) {
          // this.barangItems = []
          // this.$store.commit('clearKategorisSnapshotsId')
          this.$store.dispatch('setDbBarang', _itm)
          if (this.dialogedit) this.dialogedit = false
          this.updateBarangItems()
        }
      },
      jmlMin (_itm) {
        if (_itm.jumlah > 0) _itm.jumlah--
        this.$store.commit('addBarangsBeli', _itm)
      },
      jmlPlus (_itm) {
        _itm.jumlah++
        this.$store.commit('addBarangsBeli', _itm)
        this.snackbar = true
      },
      pushBarangsItems () {
        this.barangItems = []
        if (this.tmpItms !== null && this.tmpItms !== undefined && this.tmpItms.length > 0) {
          var itms = this.tmpItms.slice(this.itmsoffetstart, this.tmpItms.length - this.itmsoffsetend)
          itms.map((itm) => {
            var elementPost = this.barangsBeli.map((x) => { return x.id }).indexOf(itm.id)
            if (elementPost >= 0) itm.jumlah = this.barangsBeli[elementPost].jumlah
            else itm.jumlah = 0
            this.barangItems.push(itm)
          })
        }
      },
      sortBarangsProp (a, b, _prop) {
        if (a[_prop] !== null && a[_prop] !== undefined) {
          if (b[_prop] !== null && b[_prop] !== undefined) {
            var x = a[_prop].toLowerCase().replace(/ /g, '')
            var y = b[_prop].toLowerCase().replace(/ /g, '')
            return x < y ? -1 : x > y ? 1 : 0
          } else {
            return 1
          }
        } else {
          if (b[_prop] !== null && b[_prop] !== undefined) {
            return -1
          } else {
            return 1
          }
        }
      },
      sortBarangs (a, b, _prop1, _prop2) {
        var sorted = this.sortBarangsProp(a, b, _prop1)
        if (sorted === 0) return this.sortBarangsProp(a, b, _prop2)
        return sorted
        // if (a.jenis.toLowerCase() < b.jenis.toLowerCase()) return -1
        // if (a.jenis.toLowerCase() === b.jenis.toLowerCase()) return 0
        // if (a.jenis.toLowerCase() > b.jenis.toLowerCase()) return 1
      },
      updateBarangItems () {
        this.tmpItms = []
        if (this.kategori.all) {
          if (this.barangsFavorit !== null && this.barangsFavorit !== undefined) {
            this.tmpItms = this.barangsFavorit
          }
        } else {
          if (this.getKategorisSnapshotsId === null || this.getKategorisSnapshotsId === undefined) {
            this.queryNewBarangs()
          }
          if (this.barangs !== null && this.barangs !== undefined) {
            var _this = this
            this.tmpItms = this.barangs.filter((itm) => itm.kategori === this.kategori.id).map((itm) => {
              if (itm.jenis === undefined || itm.jenis === null) itm.jenis = 'zzzzzzzzz'
              if (itm.perusahaan === undefined || itm.perusahaan === null) itm.perusahaan = 'zzzzzzzzz'
              return itm
            }).sort(function (a, b) {
              return _this.sortBarangs(a, b, 'jenis', 'perusahaan')
            })
            if (this.isAdmin) this.tmpItms.reverse()
          }
        }
        this.pushBarangsItems()

        this.showLoading = false
        if (!(this.barangItems === null || this.barangItems === undefined || this.barangItems.length === 0)) {
          this.kategoriLoading = false
        }

        this.kategoriLoading = false
      },
      filterBarangItems (_val) {
        this.tmpItms = []
        var _this = this
        var barangsCari = []
        if (_val === null || _val === undefined) _val = this.kataCari
        _val.map((filter) => {
          if (this.kategori.all) {
            barangsCari = [...this.barangsFavorit]
          } else {
            barangsCari = [...this.barangs]
          }
          this.tmpItms = barangsCari.filter((itm) => itm.nama.toLowerCase().includes(filter.toLowerCase())).map((itm) => {
            if (itm.jenis === undefined || itm.jenis === null) itm.jenis = 'zzzzzzzzz'
            if (itm.perusahaan === undefined || itm.perusahaan === null) itm.perusahaan = 'zzzzzzzzz'
            return itm
          }).sort(function (a, b) {
            return _this.sortBarangs(a, b, 'jenis', 'perusahaan')
          })
          if (this.isAdmin) this.tmpItms.reverse()
          this.pushBarangsItems()
          this.showLoading = false
          this.kategoriNama = 'Pencarian'
        })
      }
    },
    watch: {
      barangs () {
        if (!this.onCari) {
          this.updateBarangItems()
        } else {
          this.filterBarangItems()
        }
      },
      barangsFavorit () {
        if (!this.onCari) {
          this.updateBarangItems()
        } else {
          this.filterBarangItems()
        }
      },
      kategori (_itm) {
        this.onCari = false
        this.kategoriLoading = true
        window.scrollTo(0, 48)
        this.kategoriNama = _itm.nama
        this.updateBarangItems()
        if (this.isAdmin) {
          this.kategorisItems = this.kategoris
        }
      },
      kategoris () {
        this.kategorisItems = this.kategoris
      },
      isLoading (_val) {
        if (!_val && this.getKategorisSnapshotsId !== null) {
          if (this.getKategorisSnapshotsId.stop) this.showLoading = false
        }
      },
      kataCari (_val) {
        this.onCari = true
        window.scrollTo(0, 48)
        if (!this.getKategorisSnapshotsId.stop) {
          this.queryNewBarangs()
        }
        this.filterBarangItems(_val)
      }
    },
    computed: {
      ...mapGetters([
        'isLoading',
        'kategoris',
        'kategori',
        'getKategorisSnapshotsId',
        'kategorisSnapshots',
        'favorit',
        'barangs',
        'barangsFavorit',
        'barangsBeli',
        'barangsBeliJumlah',
        'barangsBeliTotalHarga',
        'kemasan',
        'isAdmin',
        'kataCari',
        'queryLimit'
      ])
    },
    created () {
      this.$store.commit('initBarangsBeli')
      window.addEventListener('scroll', this.handleScroll)
      this.updateBarangItems()
      window.scrollTo(0, 48)
      if (this.kemasan === null || this.kemasan === undefined) {
        this.$store.commit('setKemasan', {harga: 0, nama: ''})
      }
      if (this.isAdmin) {
        this.kategorisItems = this.kategoris
      }
    }
  }
</script>