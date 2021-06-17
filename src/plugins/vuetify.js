import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { 
    VCardTitle
 } from "vuetify/lib/components"
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.purple.darken2
            }
        }
    },
    components: {
        VCardTitle
    }
});
