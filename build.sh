#!/bin/bash
# Rebuild dist/index.html from the files in src/.
#   ./build.sh
# Needs: bash + python3. Nothing to install.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

{
  cat "$ROOT/src/10-head.html"
  echo '<style>'
  cat "$ROOT/src/20-styles.css"
  echo '</style>'
  cat "$ROOT/src/30-body-a.html" "$ROOT/src/31-body-b.html"
  echo "<script>"
  cat "$ROOT/src/40-app.js"
  echo "</script>"
} > "$ROOT/.assembled.html"

python3 - "$ROOT" << 'PY'
import json, sys
root = sys.argv[1]
html = open(root + '/.assembled.html').read()
man  = json.load(open(root + '/src/manifest.json'))['keep']
sub = {
  '__LOGO_PATH__': open(root + '/src/logo.txt').read().strip(),
  '__PORTRAIT__' : open(root + '/src/portrait.txt').read().strip(),
  '__AR_TABLE__' : json.dumps({k: round(v['w']/v['h'], 4) for k, v in man.items()}, separators=(',', ':')),
  '__XS_TABLE__' : json.dumps({k: 1 for k, v in man.items() if v.get('xs')}, separators=(',', ':')),
}
for k, v in sub.items():
    html = html.replace(k, v)

# the same skeleton the host wraps the page in, so local == live
SKIN = ('<!doctype html><html><head><meta charset=utf8>'
        '<meta name=viewport content="width=device-width,initial-scale=1">'
        '<style>:root{color-scheme:light}body{margin:0;padding:0;'
        'font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}'
        'img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}'
        '</style></head><body>\n')
open(root + '/dist/index.html', 'w').write(SKIN + html + '\n</body></html>')
print('built dist/index.html  %.0f KB' % (len(html) / 1024))
PY
rm -f "$ROOT/.assembled.html"
