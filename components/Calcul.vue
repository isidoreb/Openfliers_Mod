<template>
  <div>
    <div v-if="!showLoad">
      <h2>Importer le fichier</h2>
      <label label="file">
        <input id="file" ref="file" type="file" @change="handleFileUpload" />
      </label>
      <button type="primary" @click="submitFile">
        Traiter le fichier...
      </button>
    </div>
    <div v-if="processing">
      Traiement en cours
    </div>
    <p v-if="error" style="color:red;">
      <strong>Erreur {{ error.status }}</strong>
    </p>
    <Resultat v-if="response != ''" :elements="response" />
  </div>
</template>

<script>
import Resultat from './Resultat'
export default {
  name: 'Calcul',
  components: {
    Resultat
  },
  data() {
    return {
      processing: false,
      file: '',
      response: '',
      showLoad: false,
      error: null
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    submitFile() {
      this.processing = true
      this.showLoad = true
      this.response = ''
      this.error = null
      if (typeof window.FileReader !== 'function') {
        this.error = []
        this.error.push('Le navigateur ne permet pas le traitement local.')
      }
      const input = this.file
      if (!input) {
        if (!this.error) this.error = []
        this.error.push('Le navigateur ne permet pas le traitement des objets')
        this.response = ''
      }
      const fr = new FileReader()
      fr.onload = this.chargementTermine
      fr.readAsText(input)
    },
    chargementTermine(event) {
      this.processing = true
      this.response = ''
      console.log('event :', event)
      const res = this.$calcul(event.target.result, {
        separator: ';'
      })
      this.processing = false
      this.response = res
    }
  }
}
</script>
