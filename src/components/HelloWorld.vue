<template>
	<div class="container">
        <section>
			<form action="" @submit.prevent>
            <div class="columns">
                <div class="column is-one-quarter">
					<b-field label="Heure début journée">
						<b-input v-model.lazy="heure_debut"></b-input>
					</b-field>

					<b-field label="Heure début pause midi">
						<b-input v-model.lazy="heure_debut_pause" @blur="calcul_heures_matin"></b-input>
					</b-field>

					<b-field label="Heure fin pause midi">
						<b-input v-model.lazy="heure_fin_pause" @blur="calcul_temps_pause"></b-input>
					</b-field>

					<b-field label="Heure fin journée">
						<b-input v-model.lazy="heure_depart_theorique"></b-input>
					</b-field>
                </div>
				<div class="column auto">
					<h2 class="subtitle has-text-info">Tableau récapitulatif</h2>
					<table>
						<thead>
							<tr>
								<th class="has-background-primary has-text-white px-4">Présence Matin</th>
								<th class="has-background-primary has-text-white px-4">Durée pause midi (minutes)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{{ tranform_calcul_heures_matin }}</td>
								<td>{{ duree_pause_midi }}</td>
							</tr>
						</tbody>

					</table>
				</div>
            </div>
			</form>
        </section>
	</div>
</template>

<script>
import moment from 'moment'

const TIME_PER_DAY = 456 // 7h36 minutes

export default {
  name: 'HelloWorld',
  data() {
    return {
      heure_debut: null,
      heure_debut_pause : null,
      heure_fin_pause : null,
      duree_travail_matin : null,
      duree_pause_midi : null,
      heures_restantes :  null,
      heure_depart_theorique : null,
    }
  },
  methods: {
    calcul_temps_pause() {
      this.duree_pause_midi = moment.duration(this.heure_fin_pause_tranform.diff(this.heure_debut_pause_transform)).minutes() +  moment.duration(this.heure_fin_pause_tranform.diff(this.heure_debut_pause_transform)).hours() * 60

      if(this.duree_pause_midi <= 45){
        let complement_pause = 45 - this.duree_pause_midi
        this.heure_fin_pause = this.heure_fin_pause_tranform.add(complement_pause, "m").format("h:m")
      }

      this.calcul_heure_fin_journee()
    },
    calcul_heures_matin() {
      this.duree_travail_matin = moment.duration(this.heure_debut_pause_transform.diff(this.heure_debut_transform)).hours() * 60 + moment.duration(this.heure_debut_pause_transform.diff(this.heure_debut_transform)).minutes()
    },
    calcul_heure_fin_journee(){
      let duree_travail_apres_midi = TIME_PER_DAY - this.duree_travail_matin
      let heure_fin_dej = this.heure_fin_pause.split(":")
      let heure_fin_dej_finale = moment({hour : heure_fin_dej[0], minutes : heure_fin_dej[1]}).add(duree_travail_apres_midi, 'm')
      this.heure_depart_theorique = heure_fin_dej_finale.hours() + ":" + heure_fin_dej_finale.minutes()
    }
  },
  computed: {
    heure_debut_transform() {
      var time = this.heure_debut.split(":")
      return moment({hour : time[0], minute : time[1]})
    },
    heure_debut_pause_transform(){
      var time = this.heure_debut_pause.split(":")
      return moment({hour : time[0], minute : time[1]})      
    },
    heure_fin_pause_tranform(){
      var time = this.heure_fin_pause.split(":")
      return moment({hour : time[0], minute : time[1]})        
    },
	tranform_calcul_heures_matin(){
		return moment.duration(this.duree_travail_matin, "m").hours() + "h" + moment.duration(this.duree_travail_matin, "m").minutes()
	}
  },
  mounted () {
	console.log("test", moment.duration(TIME_PER_DAY, "m"));;
  },
}
</script>

<style lang="css">

table{
	margin-left: auto;
	margin-right: auto;
}

table th{
	padding: 10px;
	border: 2px solid black;
}

table td{
	padding: 10px;
	border: 2px solid black;
}

</style>
