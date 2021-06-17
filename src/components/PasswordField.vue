<template>
  <v-text-field 
            v-model="text"
            :type="pw_show ? 'text' : 'password'" 
            :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="pw_show = !pw_show"
            @input="$emit('input', text)"
            :label="label"
            :rules="fieldRules"
            >
 </v-text-field>
</template>

<script>
export default {
    name: 'PasswordField',
    props: {
        value: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: 'Password'
        },
        rules: {
            type: Array,
            default: () => []
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            pw_show: false,
            text: ''
        }
    },
    computed: {
        fieldRules(){
            const requiredRule = v => !!v || 'this field is required'
            return this.required ? [requiredRule, ...this.rules] : this.rules
        }
    }
}
</script>

<style>

</style>