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
            await axios.delete('/pages/' + this.pageID);
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