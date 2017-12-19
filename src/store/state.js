let state = {
  dataAdmin: null,
  favorit: {id: 'favorit', nama: 'Favorit', all: true, icon: 'favorite'},
  naviRutes: [
    {nama: 'Barang', to: 'barang', keterangan: 'Halaman untuk mengedit Barang'},
    {nama: 'Kategori', to: 'kategori', keterangan: 'Halaman untuk mengedit Daftar Kategori'},
    {nama: 'Kemasan', to: 'kemasan', keterangan: 'Halaman untuk mengedit Daftar Kemasan'},
    {nama: 'Klien', to: 'utama', keterangan: 'Halaman untuk melihat dan mengedit halaman klien'},
    {nama: 'Data Admin', to: 'dataadmin', keterangan: 'Halaman untuk melihat dan mengedit data admin'},
    {nama: 'Pengiriman', to: 'kirim', keterangan: 'Halaman untuk mengecek pesanan dan melakukan pengiriman'}
  ],
  isLoading: null,
  isError: null,
  error: null,
  errorMessage: null,
  kategoris: null,
  kategorisSnapshots: null,
  kategori: null,
  barangs: null,
  barangsFavorit: null,
  barangsLastSnapshot: null,
  barangsBeli: null,
  barangsBeliJumlah: null,
  barangsBeliTotalHarga: null,
  orderCheck: null,
  orderId: null,
  orders: null,
  kemasans: null,
  kemasan: null,
  pemesan: null,
  IdToken: null,
  currentUser: null,
  kataCari: null,
  queryLimit: 12
}

export default state
