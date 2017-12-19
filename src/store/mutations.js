let mutations = {
  setLoading (state, payload) {
    state.isLoading = payload
  },
  clearError (state) {
    state.isError = null
    state.error = null
    state.errorMessage = null
  },
  setError (state, payload) {
    state.isError = true
    state.error = payload
    if (payload.code === 'auth/wrong-password') {
      state.errorMessage = 'Sandi / Kata Kunci Salah'
    } else if (payload.code === 'auth/user-disabled') {
      state.errorMessage = 'Pengguna telah diblokir'
    } else if (payload.code === 'auth/invalid-email') {
      state.errorMessage = 'Email tidak benar'
    } else if (payload.code === 'auth/user-not-found') {
      state.errorMessage = 'Pengguna tidak ditemukan'
    } else if (payload.code === 'auth/weak-password') {
      state.errorMessage = 'Sandi terlalu lemah'
    } else if (payload.code === 'auth/requires-recent-login') {
      state.errorMessage = 'Sesi Admin memerlukan login kembali.'
    } else if (payload.code === 'PERMISSION_DENIED') {
        // ignore error because of permission_denied
      state.error = null
    } else {
      state.errorMessage = {code: payload.code, message: payload.message}
    }
  },
  setDataAdmin (state, payload) {
    state.dataAdmin = payload
  },
  setKategoris (state, payload) {
    state.kategoris = payload
  },
  setKategori (state, payload) {
    state.kategori = payload
  },
  setKategorisSnapshots (state, payload) {
    state.kategorisSnapshots = payload
  },
  pushKategorisSnapshots (state, payload) {
    if (state.kategorisSnapshots === null || state.kategorisSnapshots === undefined) {
      state.kategorisSnapshots = []
    }
    if (state.kategorisSnapshots.length === 0) {
      state.kategorisSnapshots.push(payload)
    } else {
      if (state.kategorisSnapshots.filter((snap) => snap.id === payload.id).length > 0) {
        var elementPos = state.kategorisSnapshots.map((x) => { return x.id }).indexOf(payload.id)
        state.kategorisSnapshots[elementPos].snapshot = payload.snapshot
        state.kategorisSnapshots[elementPos].stop = payload.stop
      } else {
        state.kategorisSnapshots.push(payload)
      }
    }
  },
  clearKategorisSnapshotsId (state) {
    if (state.kategorisSnapshots !== null && state.kategorisSnapshots !== undefined) {
      var elementPos = state.kategorisSnapshots.map((x) => { return x.id }).indexOf(state.kategori.id)
      state.kategorisSnapshots[elementPos] = {}
    }
  },
  pushKategoris (state, payload) {
    state.kategoris.push(payload)
  },
  setKemasans (state, payload) {
    state.kemasans = payload
  },
  pushKemasans (state, payload) {
    state.kemasans.push(payload)
  },
  setKemasan (state, payload) {
    state.kemasan = payload
  },
  setBarangs (state, payload) {
    state.barangs = payload
  },
  setBarangsFavorit (state, payload) {
    state.barangsFavorit = payload
  },
  pushBarangsFavorit (state, payload) {
    state.barangsFavorit.push(payload)
  },
  setBarangsLastSnapshot (state, payload) {
    state.barangsLastSnapshot = payload
  },
  pushBarangs (state, payload) {
    if (state.barangs === null || state.barangs === undefined) state.barangs = []
    if (state.barangs.length === 0) state.barangs.push(payload)
    else {
      if (state.barangs.filter((itm) => itm.id === payload.id).length === 0) {
        state.barangs.push(payload)
      }
    }
  },
  setBarangsBeli (state, payload) {
    state.barangsBeli = payload
  },
  addBarangsBeli (state, payload) {
    var jml = 0
    var harga = 0
    if (state.barangsBeli !== null && state.barangsBeli !== undefined) {
      var elementPos = state.barangsBeli.map((x) => { return x.id }).indexOf(payload.id)
      if (payload.jumlah > 0) {
        if (elementPos >= 0) {
          state.barangsBeli[elementPos].jumlah = payload.jumlah
        } else if (elementPos < 0) state.barangsBeli.push(payload)
      } else if (elementPos >= 0) {
        state.barangsBeli.splice(elementPos, 1)
      }
      state.barangsBeli.map((barang) => {
        if (barang.jumlah > 0) {
          jml++
          harga += barang.jumlah * barang.harga
        }
      })
    }
    state.barangsBeliJumlah = jml
    state.barangsBeliTotalHarga = harga
  },
  updateBarangsBeli (state) {
    var jml = 0
    var harga = 0
    if (state.barangsBeli !== null && state.barangsBeli !== undefined) {
      if (state.barangsBeli.length > 0) {
        state.barangsBeli.map((barang) => {
          if (barang.jumlah > 0) {
            jml++
            harga += barang.jumlah * barang.harga
          }
        })
      }
    }
    state.barangsBeliJumlah = jml
    state.barangsBeliTotalHarga = harga
  },
  setOrderId (state, payload) {
    state.orderId = payload
  },
  setOrderCheck (state, payload) {
    state.orderCheck = payload
  },
  setOrders (state, payload) {
    state.orders = payload
  },
  pushOrders (state, payload) {
    if (state.orders === null || state.orders === undefined) state.orders = []
    state.orders.push(payload)
  },
  setBarangsBeliJml (state, payload) {
    state.barangsBeli[payload.index].jumlah = payload.item.jumlah
  },
  deleteBarangsBeli (state, payload) {
    state.barangsBeli.splice(payload.start, payload.count)
  },
  initBarangsBeli (state) {
    if (state.barangsBeli === null || state.barangsBeli === undefined) {
      state.barangsBeli = []
      state.barangsBeliJumlah = 0
      state.barangsBeliTotalHarga = 0
    }
  },
  initKategori (state) {
    if (state.kategori === null || state.kategori === undefined) {
      state.kategori = state.favorit
    }
  },
  clearBarangsBeli (state) {
    state.barangsBeli = []
    state.barangsBeliJumlah = 0
    state.barangsBeliTotalHarga = 0
  },
  setPemesan (state, payload) {
    state.pemesan = payload
  },
  setIdToken (state, payload) {
    state.IdToken = payload
  },
  setCurrentUser (state, payload) {
    state.currentUser = payload
  },
  setKataCari (state, payload) {
    state.kataCari = payload
  }
}

export default mutations
