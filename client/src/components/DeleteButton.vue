<template>
    <button v-if="pageID" @click="doDelete">
        Delete
    </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper();

@Options({
    props: {
        pageID: {
            type: String,
            required: true
        }
    },
    methods: {
        async doDelete() {
            try {
                await axios.delete('/pages/' + this.pageID);
                await this.$store.dispatch('loadPages');
                this.$store.commit('FLIP_EDIT_DELETE_WEBPAGE_FORM_MODAL');
            } catch (error) {
                // ...
            }
        }
    }
})

export default class DeleteButton extends Vue {}
</script>

<style scoped>

button {
  display: block;
  margin-right: 0.3rem;
}

</style>