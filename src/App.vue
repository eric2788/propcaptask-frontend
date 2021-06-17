<template>
  <v-app>
    <router-view @notify="openSnackBar($event)"/>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data(){
    return {
      snackbar: false,
      message: '',
      timeout: 5000,
    }
  },

  methods: {
    openSnackBar(message){
        this.message = message
        this.snackbar = true
    }
  }
};
</script>
