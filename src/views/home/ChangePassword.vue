<template>
  <div>
    <v-alert type="error" :value="!!errorMessage"> {{ errorMessage }}</v-alert>
    <v-card>
      <v-card-title>Change Password</v-card-title>
      <v-card-text>
        <v-form ref="password" v-model="valid">
          <h3 class="pb-5 pt-5">Verification</h3>
          <password-field v-model="pw" label="Your current password" required></password-field>
          <h3 class="pb-5 pt-5">Password Update</h3>
          <password-field label="New password" v-model="new_pw" :rules="new_pw_rules"></password-field>
          <v-text-field 
            type="password" 
            label="Confirm password"
            :rules="confirm_pw_rules"
            >
          </v-text-field>
          <v-btn color="primary" block :disabled="!valid" :loading="loading" @click="updatePassword">Update Password</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PasswordField from '../../components/PasswordField.vue'
export default {
  components: { PasswordField },
  name: 'ChangePassword',
  data(){
    return {
      pw: '',
      new_pw: '',
      new_pw_rules: [v => v?.length > 10 || 'password must over 10 length'],
      confirm_pw: '',
      confirm_pw_rules: [v => v === this.new_pw || 'the password is mismatch' ],
      errorMessage: '',
      valid: false,
      loading: false
    }
  },
  methods: {
    ...mapActions(['postUpdatePassword']),
    updatePassword(){
      this.loading = true
      this.postUpdatePassword({pw: this.pw, new_pw: this.new_pw})
      .then(() => {
        this.$refs.password.reset()
        this.$emit('notify', 'The password has been updated.')
      })
      .catch(err => this.errorMessage = err.response.data.message)
      .finally(() => this.loading = false)
    }
  }
}
</script>

<style>

</style>