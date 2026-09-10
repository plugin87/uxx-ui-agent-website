#!/usr/bin/env python3
"""Build public/theme.css from tokens/*.json.

Colours come from the kit's own scripts/build_tokens.mjs; the scale layer
(space, type, radius, motion) is read straight out of the same token files so
there is exactly one source of truth. Do not hand-edit public/theme.css.
"""
import json, subprocess, sys, re

def flat(d, prefix=''):
    out = {}
    for k, v in d.items():
        if k.startswith('$'):
            continue
        if isinstance(v, dict):
            if '$value' in v:
                out[prefix + k] = v['$value']
            else:
                out.update(flat(v, prefix + k + '-'))
    return out

def load(name):
    return json.load(open('tokens/%s.json' % name))

colors = subprocess.run(['node', 'scripts/build_tokens.mjs'],
                        capture_output=True, text=True, check=True).stdout
# the dark block must be able to theme a subtree, not only the document root
colors = colors.replace(':root[data-theme="dark"]', '[data-theme="dark"]')

lines = []
def emit(prefix, values, fmt=str):
    for k, v in values.items():
        # a dot is not a legal character in a custom-property name
        name = k.split('-', 1)[1].replace('.', '-')
        lines.append('  --%s%s: %s;' % (prefix, name, fmt(v)))

sp = flat({'scale': load('spacing')['scale']})
emit('space-', {k: v for k, v in sp.items()}, str)

ty = load('typography')
emit('text-', flat({'fontSize': ty['fontSize']}))
emit('weight-', flat({'fontWeight': ty['fontWeight']}))
emit('leading-', flat({'lineHeight': ty['lineHeight']}))
emit('tracking-', flat({'letterSpacing': ty['letterSpacing']}))

bo = load('borders')
emit('radius-', flat({'radius': bo['radius']}))
emit('border-', flat({'width': bo['width']}))

sz = load('sizing')
emit('control-', flat({'control': sz['control']}))
emit('icon-', flat({'icon': sz['icon']}))

bp = load('breakpoints')
emit('container-', flat({'container': bp['container']}))

mo = load('motion')
emit('duration-', flat({'duration': mo['duration']}))
for k, v in flat({'easing': mo['easing']}).items():
    if isinstance(v, list):
        lines.append('  --ease-%s: cubic-bezier(%s);' % (k.split('-', 1)[1], ', '.join(str(n) for n in v)))

# families: the template ships Articulat CF, the kit's sans slot points at it here
fam = flat({'fontFamily': ty['fontFamily']})
lines.append('  --font-sans: "Articulat CF", %s;' % ', '.join(fam['fontFamily-sans'][1:]))
lines.append('  --font-mono: %s;' % ', '.join('"%s"' % f if ' ' in f else f for f in fam['fontFamily-mono']))
lines.append('  --font-pixel: Silkscreen, Chicago, var(--font-mono);')

# runtime state written by public/reveal.js. Declared with resting values so
# the theme stays the single place every var() a component uses is defined.
lines.append('  --reveal-i: 0;')
lines.append('  --wall-shift: 0px;')

scale = ':root {\n' + '\n'.join(lines) + '\n}\n'
open('public/theme.css', 'w').write(colors.rstrip() + '\n\n' + scale)
print('public/theme.css written:', len(colors.splitlines()) + len(lines) + 3, 'lines')
