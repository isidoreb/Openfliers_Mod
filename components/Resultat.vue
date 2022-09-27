<template lang="html">
  <div class="resultat">
    <div v-if="showResults">
      <table>
        <tr>
          <th>Pilote</th>
          <th>Durée Totale</th>
          <th>Compte de débit</th>
          <th>Compte de crédit</th>
          <th>Commentaire du flux</th>
        </tr>
        <Pilote
          v-for="(item, index) in items"
          :key="index"
          :pilote="item"
          :index="index"
          class="aeronefs"
        />
      </table>
    </div>
    <div v-else>
      <h2>Aucun pilotes trouvé pour les critères requis</h2>
    </div>
  </div>
</template>

<script>
import Pilote from './Pilote'
export default {
  name: 'Resultat',
  components: {
    Pilote
  },
  props: {
    elements: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
    showResults() {
      const res = Object.keys(this.items).length
      return res > 0
    },
    items() {
      // return this.$filtrage(this.elements, item => item.over)
      const res = this.$filtrage(this.elements, item => item.duree >= 1200)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.resultat {
  width: 100%;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  tr:nth-child(even) {
    background-color: rgb(117, 248, 237);
  }
  tr:nth-child(odd) {
    background-color: rgb(224, 244, 255);
  }
}
</style>
