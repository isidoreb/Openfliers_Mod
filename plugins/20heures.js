let pilotes = {}
const BORNE = '20:00'
const AERONEF = 0
const PILOTEID = 3
const PILOTEPRENOM = 4
const PILOTENAME = 5
const PROFILEID = 6
const TYPEVOL = 11
const DUREEDEVOL = 14
const TOEXCLUDE = 'Vol de service'

const toMinutes = dureeString => {
  const hm = dureeString.split(':').map(Number)
  return hm[0] * 60 + hm[1]
}

const traiterLigne = row => {
  const piloteId = row[PILOTEID]
  const tvol = row[TYPEVOL] || '---'
  if (tvol.includes(TOEXCLUDE)) return
  if (parseInt(row[PROFILEID]) > 1023) return
  if (piloteId === undefined) return
  if (piloteId !== '142') {
    const duree = toMinutes(row[DUREEDEVOL])
    const pilote = `${row[PILOTEPRENOM]} ${row[PILOTENAME]}`
    const aeronef = row[AERONEF]
    let ligne = pilotes[piloteId]
    if (ligne === null || ligne === undefined) {
      ligne = {
        id: piloteId,
        pilote: '',
        profil: row[PROFILEID],
        vols: 0,
        duree: 0,
        over: false,
        reduction: 0,
        aeronefs: {},
        reductions: {}
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
    if (ligne.duree >= toMinutes(BORNE)) {
      console.log('on passe les 20h00')
      const dureedevol = ligne.over ? duree : ligne.duree - toMinutes(BORNE)
      ligne.over = true
      let reduc = ligne.reductions[aeronef]
      if (reduc === null || reduc === undefined) {
        reduc = 0
      }
      reduc += dureedevol
      console.log(
        'pilote ',
        pilote,
        ', aeronefs ',
        ligne.aeronefs[aeronef],
        ', reductions ',
        ligne.reductions[aeronef],
        ', reduct ',
        reduc,
        ', duree',
        duree,
        ', total',
        ligne.duree
      )
      ligne.reduction += reduc
      ligne.reductions[aeronef] = reduc
    }
    pilotes[ligne.id] = ligne
  }
}

const calcul = (fichier, options) => {
  pilotes = {}
  const lignes = fichier.split('\n')
  // traitement de la premiere ligne
  // if (options.headers) {
  // Extraction du header
  // const headers = lignes[0].split(options.separator)
  // suppression de la ligne
  lignes.shift()
  // }
  lignes.forEach(row => {
    const ligne = row.split(options.separator)
    traiterLigne(ligne)
  })
  return pilotes
}

const filtrage = (obj, predicate) => {
  return Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})
}

export default ({ app }, inject) => {
  inject('calcul', calcul)
  inject('filtrage', filtrage)
}
