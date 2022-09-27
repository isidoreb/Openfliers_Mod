<template lang="html">
  <tr class="pilote">
    <td class="pilote-name">
      <a :href="link" target="_blank">{{ pilote.id }}-{{ pilote.pilote }}</a>
    </td>
    <td class="duree">
      {{ duree }}
    </td>
    <td v-if="pilote.over" class="aeronefs reductions">
      <ul>
        <li
          v-for="(valRed, avion) in pilote.reductions"
          :key="avion"
          class="aeronef"
        >
          {{ avion }}
          <span class="duree reduction">
            {{ ((9 * valRed) / 60).toFixed(2) }}
          </span>
          <span class="duree">
            {{ `${(valRed / 60) ^ 0}` + 'h' + ('0' + (valRed % 60)).slice(-2) }}
          </span>
        </li>
      </ul>
    </td>
    <td v-else class="aeronefs">
      <ul>
        <li
          v-for="(valeur, aeronef) in pilote.aeronefs"
          :key="aeronef"
          class="aeronef"
        >
          {{ aeronef }}
          <span v-if="pilote.duree >= 1200" class="duree reduction">
            {{ ((9 * valeur) / 60).toFixed(2) }}
          </span>
          <span class="duree">
            {{ `${(valeur / 60) ^ 0}` + 'h' + ('0' + (valeur % 60)).slice(-2) }}
          </span>
        </li>
      </ul>
    </td>
    <td class="commentaire">
      <span v-if="pilote.over" class="reduction depassement">
        {{ depassementMnt }}
      </span>
    </td>
    <td class="commentaire">
      <span v-if="pilote.over" class="depassement">
        {{ depassementStr }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Pilote',
  props: {
    pilote: {
      type: Object,
      required: true
    },
    index: {
      type: String,
      required: true
    }
  },
  computed: {
    link() {
      return `https://openflyers.com/acbb/index.php?menuAction=admin_add_modify_user&menuParameter=${this.pilote.id}&menuParameterBis=last_name&menuParameter3=G`
    },
    depassementStr() {
      const n = this.pilote.duree - 1200
      return `Remise 9€ ${(n / 60) ^ 0}` + 'h' + ('0' + (n % 60)).slice(-2)
    },
    depassementMnt() {
      const n = this.pilote.duree - 1200
      return (n * (9 / 60)).toFixed(2)
    },
    duree() {
      const n = this.pilote.duree
      return `${(n / 60) ^ 0}` + 'h' + ('0' + (n % 60)).slice(-2)
    }
  }
}
</script>

<style lang="scss" scoped>
.pilote {
  .pilote-name {
    width: 25%;
  }
  .duree {
    text-align: center;
    width: 10%;
  }
  .depassement {
    float: right;
    background-color: rgb(137, 218, 137);
  }
  .vols {
    width: 15%;
    text-align: center;
  }
  .reduction {
    // width: 35%;
    font-weight: bold;
  }
  .reduction::after {
    content: ' €';
  }
  .aeronefs {
    width: 35%;
    .duree {
      width: 35%;
      float: right;
      text-align: right;
    }
    li:nth-child(even) > span.reduction {
      background-color: rgb(214, 226, 160);
    }
    li:nth-child(odd) > span.reduction {
      background-color: rgb(218, 176, 137);
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    li:nth-child(even) {
      background-color: rgb(173, 216, 206);
    }
    li:nth-child(odd) {
      background-color: rgb(137, 218, 137);
    }
  }
}
</style>
