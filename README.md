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
