<template>
  <div class="home">

  <v-container>
    
    <v-row justify="center">
      <v-col 
        cols="10"
        lg="6"
        md="7"
        sm="8"
      >
        <v-card class="pa-5">
          <v-card-title>
            <h3>Add a new task</h3>
          </v-card-title>
          <v-form class="pa-5" ref="form" v-model="valid" lazy-validation>

            <v-text-field v-model="task" label="Task" prepend-icon="mdi-checkbox-marked-circle-outline" :rules="taskRules" :counter="50" required></v-text-field>

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }" >
                <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                  :rules="dateRule"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
            </v-menu>

            <v-menu
              ref="menu"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Time"
                  prepend-icon="mdi-clock"
                  readonly
                  v-on="on"
                  :rules="timeRule"
                  required
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu1"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
            
            <v-row justify="center">
              <v-btn 
                color="error"
                class="mx-4"
                @click="reset"
              >
                Reset
              </v-btn>

              <v-btn 
                :loading="loading"
                :disabled="!valid"
                color="success"
                @click="submit"
              >
                Add task
              </v-btn>
            </v-row>

          </v-form>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
    
  </div>
</template>


<script>
 
  export default {
    data: vm => ({
      valid: true,
      task: '',
      time: '',
      date: '',
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      menu1: false,
      taskRules: [
        v => !!v || 'Name is required',
        v => v.length <= 50 || 'Name must be less than 50 characters',
      ],
      dateRule: [
        v => !!v || 'Date is required',
      ],
      timeRule: [
        v => !!v || 'Time is required',
      ],
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      loading () {
        return this.$store.getters.loading
      }
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      submit() {

        if(this.task == null || this.date == null || this.time == null || this.task.length > 50) {
          return false
        } else {

          this.$store.dispatch('addtodo', {task: this.task, date: this.dateFormatted, time: this.time, status: 'ongoing'})
          this.$refs.form.reset()

        } 
      },
      reset() {
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      },
    },
  }
</script>