<template>
  <div>
    <div height="auto">
      <h1 style="text-align:center;">Remise 20 heures</h1>
      <ol class="no-print">
        <li>
          Avant de commencer la procédure, il faut que tous les vols soient
          validés afin d'éviter tout risque de doublon
        </li>
        <li>
          Aller sur la page "Rapport personalisés" dans OpenFlyer:
          <a
            href="https://openflyers.com/acbb/index.php?menuAction=admin_list_report&menuParameter=customer"
            target="_blank"
          >
            ici
          </a>
        </li>
        <li>
          Sélectionnez la période du premier janvier de l'année en cours jusqu'à
          la date du jour. Selectionnez "Pilotes 20h - nouvelle procédure" et
          tout en bas de la page "Exporter dans un fichier CSV" et soyez
          patients...
        </li>
        <li>Importez le fichier</li>
        <li>Traitez le fichier</li>
        <li>Imprimez la page</li>
        <li>Faites les écritures correspondantes</li>
        <li>Ajouter pilote 20h dans son statut pilote</li>
      </ol>
    </div>
    <Calcul />
    <hr class="separator" />
  </div>
</template>

<script>
import Calcul from '@/components/Calcul'

export default {
  components: {
    Calcul
  }
}
</script>

<style lang="scss">
.separator {
  margin: 3em 0;
  border-color: lightgray;
  border-width: 0.5px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
