# 20 Heures

Traitement de fichier CSV pour aéroclub ACBB

[![Netlify Status](https://api.netlify.com/api/v1/badges/72b345cc-e173-4ae8-879a-7dc54cd779bb/deploy-status)](https://app.netlify.com/sites/acbb/deploys)

## Algo initial

```
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const BORNE = '02:00'
const separator = ';'
const headers = false
const AERONEF = 0
const PILOTEID = 3
const PILOTENAME = 5
const PILOTEPRENOM = 4
const DUREEDEVOL = 14

const toMinutes = (dureeString) => {
  const hm = dureeString.split(':').map( Number )
  return (hm[0]*60) + hm[1]
}
const pilotes = {}

fs.createReadStream('../data.csv')
  .pipe(csv({ separator, headers }))
  .on('data', (row) => {
    const piloteId = row[PILOTEID]
    if (piloteId !== '142') {
      const duree = toMinutes(row[DUREEDEVOL])
      const pilote = `${row[PILOTEPRENOM]} ${row[PILOTENAME]}`
      const aeronef = row[AERONEF]
      let ligne = pilotes[piloteId]
      if (ligne === null || ligne === undefined) {
        ligne = {
          id: piloteId,
          pilote: '',
          vols: 0,
          duree: 0,
          over: false,
          aeronefs: {}
        }
      }
      let vol = ligne.aeronefs[aeronef]
      if (vol === null || vol === undefined) {
        vol = 0
      }
      ligne.duree += duree
      ligne.vols++
      vol += duree
      ligne.pilote = pilote
      ligne.aeronefs[aeronef] = vol
      if (ligne.duree > toMinutes(BORNE)) {
        ligne.over = true
      }
      pilotes[ligne.id] = ligne
    }
  })
  .on('end', () => {
    let i = 0
    const res = []
    for(p in pilotes) {
      const pilote = pilotes[p]
      if (pilote.over) {
        i++
        res.push(pilote)
      }
    }
  })
```

## Build Setup

``` bash
# Use Node version specified in nvmrc
$ nvm use

# Install dependencies
$ yarn

# Build Nuxt app
$ yarn build

# Serve Nuxt app and Netlify functions at localhost:8888
$ netlify dev

# Generate static project
$ yarn generate
```
