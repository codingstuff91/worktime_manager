<template>
	<div class="container mt-5">
        <section>
            <div class="columns  is-centered">
                <h1 class="title mb-4">Compteur présence SEMAINE</h1>
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
                    <b-radio v-model="heures_semaine"
                        name="name"
                        native-value="38">
                        Technicien ou cadre forfait jour (7h36/jour => 38h mini)
                    </b-radio>                    
                    <b-radio v-model="heures_semaine"
                        name="name"
                        native-value="35">
                        Stagiaire (7h/jour => 35h maxi)
                    </b-radio>
                </div>
            </div>
			<div class="columns is-centered">
				<div class="column is-one-quarter mt-5">
					<b-field label="Lundi" label-position="on-border">
						<b-input v-model.lazy="lundi" @input="formatHour(lundi, 'lundi')"></b-input>
					</b-field>

					<b-field label="Mardi" label-position="on-border">
						<b-input v-model.lazy="mardi" @input="formatHour(mardi, 'mardi')"></b-input>
					</b-field>


					<b-field label="Mercredi" label-position="on-border">
						<b-input v-model.lazy="mercredi" @input="formatHour(mercredi, 'mercredi')"></b-input>
					</b-field>

					<b-field label="Jeudi" label-position="on-border">
						<b-input v-model.lazy="jeudi" @input="formatHour(jeudi, 'jeudi')"></b-input>
					</b-field>

					<b-button type="is-primary" class="my-4" @click="calculTotalHeures">Calcul heures restantes</b-button>

					<b-field label="Vendredi" label-position="on-border">
						<b-input v-model.lazy="vendredi" @input="formatHour(vendredi, 'vendredi')"></b-input>
					</b-field>
				</div>
			</div>

        </section>
	</div>
</template>

<script>
export default {
  name: 'compteurSemaine',
  data() {
    return {
      lundi: null,
      mardi : null,
      mercredi : null,
      jeudi : null,
      vendredi : null,
	  heures_semaine : 38,
	  total_minutes : 0
    }
  },
  watch: {
	  heures_semaine(newValue, oldValue) {
		  if(this.lundi && this.mardi && this.mercredi && this.jeudi) {
			  this.calculTotalHeures()
		  }
	  }
  },
  computed: {
	heures_semaine_minutes() {
		return this.heures_semaine * 60
	},
	heures_lundi() {
        if(this.lundi.length === 5) {
            var time = this.lundi.split(":")
            return (time[0] * 60) + parseInt(time[1])
        }
	},
	heures_mardi() {
        if(this.mardi.length === 5) {
            var time = this.mardi.split(":")
            return (time[0] * 60) + parseInt(time[1])
        }
	},
	heures_mercredi() {
        if(this.mercredi.length === 5) {
            var time = this.mercredi.split(":")
            return (time[0] * 60) + parseInt(time[1])
        }
	},
	heures_jeudi() {
        if(this.jeudi.length === 5) {
            var time = this.jeudi.split(":")
            return (time[0] * 60) + parseInt(time[1])
        }
	},

  },
  methods: {
    formatHour (value, key) {
        let inputVal = value
        if (inputVal.length === 4) {
            if (!isNaN(inputVal[0]) && !isNaN(inputVal[1]) && !isNaN(inputVal[2]) && !isNaN(inputVal[3])) {
                console.log(inputVal[0] + inputVal[1] + ':' + inputVal[2] + inputVal[3])
                const newVal = inputVal[0] + inputVal[1] + ':' + inputVal[2] + inputVal[3]
                this[key] = newVal
            }
        }
    },
	calculTotalHeures(){
		if(this.lundi && this.mardi && this.mercredi && this.jeudi) {
			this.total_minutes = 0

			this.total_minutes = this.heures_lundi + this.heures_mardi + this.heures_mercredi + this.heures_jeudi
			console.log("total heures semaine", this.total_minutes);

			let reste_minutes_a_faire = this.heures_semaine_minutes - this.total_minutes
			console.log("total minutes restantes", reste_minutes_a_faire);

			let heures_restantes = Math.floor(reste_minutes_a_faire / 60)
			let minutes_restantes = reste_minutes_a_faire - (heures_restantes * 60)

			this.vendredi = new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 }).format(heures_restantes) + ":" + new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 }).format(minutes_restantes)
		}
	}
  }
}
</script>

<style lang="css">


</style>
