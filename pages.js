// The page of one ready-made template, written by sync.js to contoh/<id>.html:
// the printed result, downloads in PDF and Excel, and how to use it in an application.
const site = 'https://gvjavx.github.io/DdDesignReport-website/'

// names and descriptions come from template pull requests: never trusted as HTML
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

exports.page = (t, all) => {
  const name = esc(t.name), desc = esc(t.description), id = esc(t.id)
  const by = t.author ? `<p class="by">Template oleh ${t.url && /^https:\/\//.test(t.url) ? `<a href="${esc(t.url)}" rel="noopener">${esc(t.author)}</a>` : esc(t.author)}</p>` : ''
  const others = all.filter(o => o.id !== t.id).map(o => `<li><a href="${esc(o.id)}.html">${esc(o.name)}</a></li>`).join('')
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Contoh ${name}: template gratis PDF dan Excel · DdDesignReport</title>
<meta name="description" content="${desc} Unduh contohnya dalam PDF atau Excel, ubah di designer gratis di browser, lalu cetak dari aplikasi Anda.">
<link rel="canonical" href="${site}contoh/${id}.html">
<link rel="icon" type="image/svg+xml" href="../logo.svg">
<style>
  :root { --bg: #fff; --soft: #f5f7fb; --text: #162033; --muted: #5b667a; --line: #e3e8f0; --accent: #2457d6; --accent-text: #fff; --code-bg: #0f172a; --code-text: #e2e8f0; color-scheme: light }
  @media (prefers-color-scheme: dark) { :root { --bg: #0c111b; --soft: #121a28; --text: #e6ebf4; --muted: #9aa6ba; --line: #263247; --accent: #7aa2ff; --accent-text: #0c111b; --code-bg: #070b13; --code-text: #dbe4f3; color-scheme: dark } }
  * { box-sizing: border-box }
  body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif }
  .wrap { max-width: 980px; margin: 0 auto; padding: 0 16px }
  header { border-bottom: 1px solid var(--line); padding: 12px 0 }
  header a { color: var(--text); font-weight: 700; text-decoration: none; display: inline-flex; gap: 8px; align-items: center }
  h1 { font-size: clamp(26px, 5vw, 38px); line-height: 1.2; margin: 32px 0 8px }
  .lead { color: var(--muted); font-size: 18px; margin: 0 0 18px; max-width: 70ch }
  .by { color: var(--muted); font-size: 14px; margin: -10px 0 16px }
  .cta { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px }
  .btn { display: inline-flex; padding: 10px 18px; border-radius: 10px; font-weight: 700; text-decoration: none; border: 1px solid var(--line); background: var(--soft); color: var(--text) }
  .btn.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-text) }
  .sheet { background: var(--soft); border: 1px solid var(--line); border-radius: 14px; padding: 12px }
  iframe { width: 100%; height: min(80vh, 900px); max-height: min(80vh, 900px); border: 0; border-radius: 8px; background: #fff }
  h2 { margin: 40px 0 8px; font-size: 24px }
  pre { background: var(--code-bg); color: var(--code-text); padding: 14px 16px; border-radius: 10px; overflow-x: auto; font-size: 14px }
  ol li { margin-bottom: 6px }
  .others { columns: 2 180px; padding-left: 18px }
  a { color: var(--accent) }
  footer { border-top: 1px solid var(--line); margin-top: 48px; padding: 20px 0; color: var(--muted); font-size: 14px }
</style>
</head>
<body>
<header><div class="wrap"><a href="../"><img src="../logo.svg" alt="" width="26" height="26">DdDesignReport</a></div></header>
<main class="wrap">
  <h1>Contoh ${name}</h1>
  <p class="lead">${desc}</p>
  ${by}
  <div class="cta">
    <a class="btn primary" href="../?t=${id}#coba">Ubah di designer</a>
    <a class="btn" href="../previews/${id}.pdf" download>Unduh PDF</a>
    <a class="btn" href="../previews/${id}.xlsx" download>Unduh Excel</a>
    <a class="btn" href="../templates/${id}.json" download>Template JSON</a>
  </div>
  <div class="sheet"><iframe id="sheet" src="../previews/${id}.html" title="Hasil cetak ${name}"></iframe></div>
  <script>
    // the printed pages are as wide as the paper: shrink them to fit a phone
    const sheet = document.getElementById('sheet')
    const fit = () => { const d = sheet.contentDocument?.documentElement; if (d) { d.style.zoom = 1; const z = Math.min(1, sheet.clientWidth / d.scrollWidth); d.style.zoom = z; sheet.style.height = d.scrollHeight * z + 'px' } }
    sheet.onload = fit; addEventListener('resize', fit)
  </script>
  <p class="by" style="margin-top:8px">Pratinjau di atas adalah hasil cetak asli DdDesignReport dengan data contoh, bukan gambar.</p>

  <h2>Pakai di aplikasi Anda</h2>
  <ol>
    <li>Unduh <a href="../templates/${id}.json" download>${id}.json</a>. Isinya <code>template</code> dan <code>data</code> contohnya.</li>
    <li>Ubah tata letaknya di <a href="../?t=${id}#coba">designer</a>, atau pasang designer-nya di aplikasi Anda agar klien bisa mengubahnya sendiri.</li>
    <li>Cetak dari backend dengan data Anda sendiri: Go, Java, Kotlin, Node.js, atau PHP, Python, dan .NET lewat HTTP.</li>
  </ol>
<pre><code>ddreport -format pdf &lt; ${id}.json &gt; ${id}.pdf     # atau xlsx, xls, html, csv</code></pre>
  <p>Langkah lengkapnya ada di <a href="../#mulai">Mulai dalam 5 menit</a>. Butuh disesuaikan dengan format perusahaan Anda, atau dipasangkan sekalian? Lihat <a href="../#jasa">jasa</a>.</p>

  <h2>Template lain</h2>
  <ul class="others">${others}</ul>
</main>
<footer><div class="wrap">DdDesignReport, library reporting berlisensi MIT. <a href="https://github.com/gvjavx/DdDesignReport">GitHub</a></div></footer>
</body>
</html>
`
}

exports.sitemap = all => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}</loc></url>
${all.map(t => `  <url><loc>${site}contoh/${esc(t.id)}.html</loc></url>`).join('\n')}
</urlset>
`
