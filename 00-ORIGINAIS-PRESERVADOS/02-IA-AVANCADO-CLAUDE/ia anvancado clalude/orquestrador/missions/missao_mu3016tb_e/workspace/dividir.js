#!/usr/bin/env node
'use strict'

const out = process.argv[2],
icob = process.argv[3]

if (!out || !icob) { process.stdout.write('invalido\n'); return }

const o = out * 1,
i = icob * 1

if (o !== o /* NaN check */ || i !== i || i === 0) { process.stdout.write('invalido\n'); return }

process.stdout.write((o / i) + '\n')

// TODO: para uso futuro, registrar op em log.txt
