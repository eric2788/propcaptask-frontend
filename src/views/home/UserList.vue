<template>
  <div>
    <v-alert :value="!!errorMessage" type="error"> {{ errorMessage }}</v-alert>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="15"
    disable-filtering
    :page.sync="page"
    :options.sync="sortOptions"
    :server-items-length="totalSize"
    :loading="loading"
    hide-default-footer
    must-sort
    loading-text="Fetching User Data..."
  >
     <template v-slot:[`item.registered`]="{ item }">
        <span>{{ formatDate(item.registered) }}</span>
      </template>
      <template v-slot:[`footer`]="{ props }">
          <div class="text-center pa-5">
            <v-pagination
              v-model="props.pagination.page"
              :length="props.pagination.pageCount"
              @input="jumpPage"
            ></v-pagination>
          </div>
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
      loading: false,
      totalSize: 0,
      totalPages: 0,
      page: 1,
      sortOptions: {
        sortBy: ['username'],
        sortDesc: [false]
      }
    }
  },
  methods: {
    ...mapActions(['getUsers']),

    refreshUserList(){
      this.loading = true
      this.getUsers({
        sortBy: this.sortOptions.sortBy,
        descending: this.sortOptions.sortDesc,
        page: this.page
      })
      .then(res => {
        this.items = res.users
        this.totalSize = res.size
        this.totalPages = res.totalPages
      })
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
    },
    jumpPage(page){
      if (this.page !== page){
        this.page = page
      }
    }
  },
  created(){
    this.refreshUserList()

    this.$watch('sortOptions', (options) => {
      this.sortOptions.sortBy = options.sortBy
      this.sortOptions.sortDesc = options.sortDesc
      this.page = options.page
      this.refreshUserList()
    })
  }
}
</script>

<style>

</style>