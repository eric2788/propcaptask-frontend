<template>
  <div>
    <v-alert :value="!!errorMessage" type="error"> {{ errorMessage }}</v-alert>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :loading="loading"
    loading-text="Fetching User Data..."
  >
     <template v-slot:[`item.registered`]="{ item }">
        <span>{{ formatDate(item.registered) }}</span>
      </template>
  </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserList',

  data(){
    return {
      headers: [
        { text: 'Username', align: 'start', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Registeration time', value: 'registered' }
      ],
      items: [],
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['fakeLoadUsers']),

    loadUsersToTable(){
      this.loading = true
      this.fakeLoadUsers()
      .then(res => this.items = res)
      .catch(err => {
        console.error(err)
        this.errorMessage = err.message
      })
      .finally(() => this.loading = false)
    },
    formatDate(registered){
      const [date, timeS] = registered.split("T")
      const [time, ] = timeS.split('.')
      return `${date} at ${time}`
    }
  },
  created(){
    this.loadUsersToTable()
  }
}
</script>

<style>

</style>