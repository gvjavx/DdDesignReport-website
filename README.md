# DdDesignReport-website

Website dokumentasi [DdDesignReport](https://github.com/gvjavx/DdDesignReport). Satu halaman statis (`index.html`), tanpa build step.

## Melihat secara lokal

Galeri dan demo butuh web server (bukan `file://`):

```sh
npx serve
```

## Setelah library berubah

```sh
node sync.js                      # library di ../DdDesignReport
node sync.js /path/ke/DdDesignReport
```

Script ini menyalin `designer.js`, font bundel, dan template siap pakai dari library, lalu mencetak ulang setiap template ke `previews/` (HTML dan PDF) dengan binary `ddreport` yang sesungguhnya. Binary diambil dari `DDREPORT_BIN`, atau di-build otomatis dengan Go.

`designer.js`, `template.schema.json`, `llms.txt`, `fonts/`, `templates/`, dan `previews/` adalah hasil `sync.js`; jangan diubah dengan tangan. Isi dokumentasi ada di `index.html`.

## Contoh di panduan

Setiap kotak contoh di panduan berasal dari satu file di `examples/` (template dan data, seperti body `POST /render`). `sync.js` mencetaknya ke `previews/examples/`, dan halaman menampilkan hasil cetak itu di atas JSON-nya, jadi gambar dan kode tidak bisa berbeda. Contoh baru: tambahkan `examples/<id>.json`, jalankan `node sync.js`, lalu taruh `<div class="example" data-example="<id>"></div>` di `index.html`.
