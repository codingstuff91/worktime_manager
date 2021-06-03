<template>
	<div class="container mt-5 px-6">
        <section>
            <div class="columns is-centered">
                <h1 class="title mb-4">Compteur présence JOUR</h1>
            </div>
            <div class="columns is-centered is-vcentered">
                <b-notification
                    type="is-danger"
                    has-icon
                    aria-close-label="Close notification">
                    Rassurez vous !! Cette application ne stocke aucune donnée utilisateur !!
                </b-notification>
            </div>
            <div class="columns is-centered my-4">
                <div class="block">
                    <b-radio v-model="heures_jour"
                        name="name"
                        native-value="456">
                        Technicien ou cadre forfait jour (7h36 => 456 min)
                    </b-radio>                    
                    <b-radio v-model="heures_jour"
                        name="name"
                        native-value="420">
                        Stagiaire (7h => 420 min)
                    </b-radio>
                </div>
            </div>
            <div class="columns is-centered my-2">
                <div class="column">
					<b-field label="Heure début journée" label-position="on-border">
						<b-input v-model.lazy="heure_debut" @input="formatHour(heure_debut, 'heure_debut')"></b-input>
					</b-field>

					<b-field label="Heure début pause midi" label-position="on-border">
						<b-input v-model.lazy="heure_debut_pause" @input="formatHour(heure_debut_pause, 'heure_debut_pause')" @blur="calcul_heures_matin"></b-input>
					</b-field>

					<b-field label="Heure fin pause midi" label-position="on-border">
						<b-input v-model.lazy="heure_fin_pause" @input="formatHour(heure_fin_pause, 'heure_fin_pause')" @blur="calcul_temps_pause"></b-input>
					</b-field>
                    
                    <b-button type="is-success" class="mb-4" @click="calcul_heure_fin_journee">Calculer fin journée théorique</b-button>

					<b-field label="Heure fin journée théorique" label-position="on-border">
						<b-input v-model.lazy="heure_depart_theorique" disabled></b-input>
					</b-field>
                </div>
				<div class="column">
					<table>
						<thead>
							<tr>
								<th class="has-background-primary has-text-white px-4 text-center">Présence Matin</th>
								<th class="has-background-primary has-text-white px-4 text-center">Durée pause midi (minutes)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="has-text-centered">{{ tranform_calcul_heures_matin }}</td>
								<td class="has-text-centered">{{ duree_pause_midi }}</td>
							</tr>
						</tbody>

					</table>
				</div>
            </div>
        </section>
	</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'compteurJour',
  data() {
    return {
      heure_debut: null,
      heure_debut_pause : null,
      heure_fin_pause : null,
      duree_travail_matin : null,
      duree_pause_midi : null,
      heures_restantes :  null,
      heure_depart_theorique : null,
      heures_jour : 456
    }
  },
  watch: {
      heures_jour(newValue, oldValue) {
          if(this.heure_debut && this.heure_debut_pause && this.heure_fin_pause && this.duree_travail_matin){
              this.calcul_heure_fin_journee()
          }
      }
  },
  methods: {
    calcul_temps_pause() {
        this.duree_pause_midi = moment.duration(this.heure_fin_pause_tranform.diff(this.heure_debut_pause_transform)).minutes() +  moment.duration(this.heure_fin_pause_tranform.diff(this.heure_debut_pause_transform)).hours() * 60

        if(this.duree_pause_midi <= 45){
            let complement_pause = 45 - this.duree_pause_midi
            this.heure_fin_pause = this.heure_fin_pause_tranform.add(complement_pause, "m").format("h:m")
        }
    },
    calcul_heures_matin() {
        console.log("event lancé");
        this.duree_travail_matin = moment.duration(this.heure_debut_pause_transform.diff(this.heure_debut_transform)).hours() * 60 + moment.duration(this.heure_debut_pause_transform.diff(this.heure_debut_transform)).minutes()
    },
    calcul_heure_fin_journee(){
      let duree_travail_apres_midi = this.heures_jour - this.duree_travail_matin
      let heure_fin_dej = this.heure_fin_pause.split(":")
      let heure_fin_dej_finale = moment({hour : heure_fin_dej[0], minutes : heure_fin_dej[1]}).add(duree_travail_apres_midi, 'm')
      this.heure_depart_theorique = heure_fin_dej_finale.hours() + ":" + new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 }).format(heure_fin_dej_finale.minutes())
    },
    formatHour (value, key) {
        let inputVal = value
        if (inputVal.length === 4) {
            if (!isNaN(inputVal[0]) && !isNaN(inputVal[1]) && !isNaN(inputVal[2]) && !isNaN(inputVal[3])) {
                console.log(inputVal[0] + inputVal[1] + ':' + inputVal[2] + inputVal[3])
                const newVal = inputVal[0] + inputVal[1] + ':' + inputVal[2] + inputVal[3]
                this[key] = newVal
            }
        }
    }
  },
  computed: {
    heure_debut_transform() {
        if(this.heure_debut.length === 5) {
            var time = this.heure_debut.split(":")
            return moment({hour : time[0], minute : time[1]})
        }
    },
    heure_debut_pause_transform(){
        if(this.heure_debut_pause.length === 5) {
            var time = this.heure_debut_pause.split(":")
            return moment({hour : time[0], minute : time[1]})      
        }
    },
    heure_fin_pause_tranform(){
        if(this.heure_fin_pause.length === 5) {
            var time = this.heure_fin_pause.split(":")
            return moment({hour : time[0], minute : time[1]})
        }
    },
	tranform_calcul_heures_matin(){
		return moment.duration(this.duree_travail_matin, "m").hours() + "h" + moment.duration(this.duree_travail_matin, "m").minutes()
	}
  }
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
