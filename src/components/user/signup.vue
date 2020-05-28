<template>
    <v-container>
        <v-row justify="center" v-if="error">
            <v-col 
                cols="10"
                lg="6"
                md="7"
                sm="8"
            >
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col 
                cols="10"
                lg="6"
                md="7"
                sm="8"
            >
                <v-card class="pa-5">
                    <v-card-title>
                        <h3>Sign Up...</h3>
                    </v-card-title>
                    <v-form
                    @submit.prevent="submit"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >

                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="pwd"
                        :counter="15"
                        :rules="pwdRules"
                        label="Password"
                        type="password"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="cnfpwd"
                        :counter="15"
                        :rules="[cnfpwdRules]"
                        label="Confirm password"
                        type="password"
                        required
                        ></v-text-field>
                        <v-row justify="end" class="mt-5">
                            <v-btn
                            class="mr-5"
                            @click="reset"
                            >
                            Reset
                            </v-btn>

                            <v-btn
                            :loading="loading"
                            :disabled="!valid"
                            class="mr-4"
                            @click="submit"
                            >
                            SignUp
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
      valid: true,
      email: '',
      pwd: '',
      cnfpwd: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      pwdRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 15 characters',
      ],
    }),
    computed: {
        cnfpwdRules() {
            return this.cnfpwd !== this.pwd ? 'Password do not match!' : true
        },
        user () {
            return this.$store.getters.user
        },
        error () {
            return this.$store.getters.error
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
      submit () {
        if(this.email == null || this.pwd == null || this.cnfpwd == null) {
          return false
        }else {
            this.$store.dispatch('signUp', {email: this.email, password: this.pwd})
        }
      },
      reset () {
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      },
      onDismissed() {
        console.log('Dismissed alert!')
        this.$store.dispatch('clearError')
      }
    },
  }
</script>

