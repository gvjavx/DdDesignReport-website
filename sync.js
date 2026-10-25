// Brings the website in line with the library. Run it after every library change:
//   node sync.js [path to DdDesignReport]
// It copies the designer, the bundled fonts, the ready-made templates, the template JSON Schema and
// llms.txt (the guide for LLMs, at the site's root), and renders each template
// to previews/<id>.html and previews/<id>.pdf with the real ddreport binary.
// The binary comes from DDREPORT_BIN, or is built from the library with Go.
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const lib = path.resolve(process.argv[2] || path.join(__dirname, '..', 'DdDesignReport'))
const site = __dirname

let bin = process.env.DDREPORT_BIN
if (!bin) {
  bin = path.join(os.tmpdir(), 'ddreport-site' + (process.platform === 'win32' ? '.exe' : ''))
  execFileSync('go', ['build', '-o', bin, './cmd/ddreport'], { cwd: lib, stdio: 'inherit' })
}

fs.copyFileSync(path.join(lib, 'designer', 'designer.js'), path.join(site, 'designer.js'))
fs.copyFileSync(path.join(lib, 'logo.svg'), path.join(site, 'logo.svg'))
fs.copyFileSync(path.join(lib, 'designer', 'template.schema.json'), path.join(site, 'template.schema.json'))
fs.copyFileSync(path.join(lib, 'llms.txt'), path.join(site, 'llms.txt'))
fs.rmSync(path.join(site, 'templates'), { recursive: true, force: true })
fs.rmSync(path.join(site, 'previews'), { recursive: true, force: true })
fs.rmSync(path.join(site, 'fonts'), { recursive: true, force: true })
fs.cpSync(path.join(lib, 'fonts'), path.join(site, 'fonts'), { recursive: true }) // the demo designer draws the bundled fonts
fs.cpSync(path.join(lib, 'designer', 'templates'), path.join(site, 'templates'), { recursive: true })
fs.mkdirSync(path.join(site, 'previews'))

const index = JSON.parse(fs.readFileSync(path.join(site, 'templates', 'index.json'), 'utf8'))
for (const entry of index) {
  const { template, data } = JSON.parse(fs.readFileSync(path.join(site, 'templates', entry.id + '.json'), 'utf8'))
  for (const format of ['html', 'pdf']) {
    const out = execFileSync(bin, ['-format', format], { input: JSON.stringify({ template, data }), maxBuffer: Infinity })
    fs.writeFileSync(path.join(site, 'previews', `${entry.id}.${format}`), out)
  }
  // the page needs the paper size to scale the preview
  entry.width = template.page.width
  entry.height = template.page.height
}
fs.writeFileSync(path.join(site, 'previews', 'index.json'), JSON.stringify(index, null, 2) + '\n')
console.log(`synced designer.js, the schema, llms.txt, fonts and ${index.length} templates from ${lib}`)
