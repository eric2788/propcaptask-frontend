<template>
  <v-main class="login-bg align-center">
    <v-container class="text-center white--text">
      <v-row align="center" justify="center" class="mb-5">
        <h3>You must Authenticate to do that.</h3>
      </v-row>
      <v-row align="center" justify="center">
        <v-alert :value="!!errorMessage" type="error" min-width="400" max-width="700"> {{ errorMessage }}</v-alert>
      </v-row>
      <v-row align="center" justify="center">
        <v-card color="white" max-width="700" min-width="400">
          <v-card-text>
            <v-tabs v-model="tab" @change="onFormChange">
              <v-tab>Login</v-tab>
              <v-tab>Register</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item @keyup.enter="enterLogin">
                  <v-form ref="login">
                   <v-text-field 
                    label="Username" 
                    v-model="login_form.username">
                   </v-text-field>
                   <password-field v-model="login_form.password"></password-field>
                   <v-btn block color="primary white--text" :disabled="!loginNotEmpty" :loading="loading" @click="login">Login</v-btn>
                  </v-form>
                </v-tab-item>
                <v-tab-item @keyup.enter="enterRegister">
                  <v-form v-model="valid" ref="register">
                   <v-text-field 
                      label="Email" 
                      type="email"
                      :rules="emailRules"
                      v-model="register_form.email">
                    </v-text-field>
                   <v-text-field 
                      label="Username" 
                      counter="15"
                      :rules="usernameRules"
                      v-model="register_form.username">
                   </v-text-field>
                   <password-field 
                      v-model="register_form.password"
                      :rules="passwordRules"
                   ></password-field>
                   <v-text-field 
                      label="Confirm password" 
                      type="password"
                      :rules="confirmPasswordRules"
                      v-model="register_form.confirm_password"
                      >
                   </v-text-field>
                   <v-btn block color="primary white--text" :disabled="!valid" :loading="loading" @click="register" @keyup.enter="register">Register</v-btn>
                  </v-form>
                </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
import PasswordField from '../components/PasswordField.vue'
export default {
  components: { PasswordField },
  name: 'Login',
  data() {
    const requiredRule =  v => !!v || 'this field is required'
    return {
      tab: '',
      valid: false,
      login_form: {
        username: '',
        password: ''
      },
      register_form: {
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      },
      emailRules: [
        requiredRule,
        v => /[\b+\w+]+@[\b+\w+]+\.[\b+\w+]+/.test(v) || 'not a valid email format'
      ],
      usernameRules: [
        requiredRule,
        v => v?.length > 5 || 'Username must over 5 length',
        v => v?.length < 15 || 'Username must not over 15 length',
        v => /^[\d+\w+]+$/.test(v) || 'Username must contain only english and number'
      ],
      passwordRules: [
        requiredRule,
        v => v?.length > 10 || 'password must over 10 length'
      ],
      requiredRule,
      loading: false,
      errorMessage: ''
    }
  },
  computed: {
    confirmPasswordRules(){
      return [
        this.requiredRule,
        v => v === this.register_form.password || 'The password is mismatch'
      ]
    },
    loginNotEmpty(){
      return !!this.login_form.username && !!this.login_form.password
    }
  },
  methods: {
    ...mapActions(['postLogin', 'postRegister']),
    onFormChange(tab){
      if (tab == 1){
        this.$refs.login?.reset()
        this.$refs.login?.resetValidation()
      }else{
         this.$refs.register?.reset()
         this.$refs.register?.resetValidation()
      }
    },
    login(){
        this.process(async () => {
          await this.postLogin(this.login_form)
          this.$router.replace('/')
        })
    },
    register(){
        this.process(async () => {
          await this.postRegister(this.register_form)
          this.$router.replace('/')
        })
    },
    enterLogin(){
      if (this.loginNotEmpty && !this.loading) this.login()
    },
    enterRegister(){
      if (this.valid && !this.loading) this.register()
    },
    async process(handle){
      this.loading = true
        try {
          await handle()
        }catch(err){
          this.errorMessage = err.response.data.message
        }finally{
          this.loading = false
        }
    }
  }
}
</script>

<style>
  .login-bg {
    background: linear-gradient(0.15turn, #741bda, #2012eb);
  }
</style>
