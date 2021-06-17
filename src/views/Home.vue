<template>
  <v-main>
      <v-app-bar clipped-left dark color="primary white--text" app dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        Propcap Task
        <v-spacer></v-spacer>
        <v-btn :icon="isMobile" :color="isMobile ? 'white' : 'primary'" depressed :loading="loading" @click="logout">
          <v-icon>mdi-logout</v-icon>
          <span v-show="!isMobile">Logout</span>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
      >
      <v-list
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
             <v-list-item-icon>
               <v-icon small>mdi-account-multiple</v-icon>
             </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>list of users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
           <v-list-item to="/changepassword">
             <v-list-item-icon>
               <v-icon small>mdi-lock</v-icon>
             </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>change password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container class="pa-10">
      <router-view name="home" v-on="$listeners"></router-view>
    </v-container>
    <v-overlay 
          :value="loading"
          :z-index="5"
          :opacity="0.8"
    >
      <v-row justify="center" align="center">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </v-row>
    </v-overlay>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'Home',

    components: {
    },

    data(){
      return {
        drawer: !this.$vuetify.breakpoint.mobile,
        loading: false
      }
    },

    beforeMount(){
      console.log(`is mobile: ${this.$vuetify.breakpoint.mobile}`)
    },

    computed: {
      isMobile(){
        return this.$vuetify.breakpoint.mobile
      }
    },
    methods: {
      ...mapActions(['fakeLogout']),
      logout(){
        this.loading = true
        this.fakeLogout()
        .then(() => {
          this.$emit('notify', 'Logout Success')
        })
        .catch(err => {
          this.$emit('notify', `Logout Error: ${err.message}`)
        })
        .finally(() => {
          this.loading = false
          this.$router.push('/login')
        })
      }
    }
  }
</script>
