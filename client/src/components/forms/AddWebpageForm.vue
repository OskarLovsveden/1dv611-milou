<template>
    <form v-on:submit.prevent autocomplete="on">
        <input :placeholder="placeholder" type="url" name="url" autocomplete="on" v-model="url" required>
        <button @click="addWebPage" type="submit">Add</button>
        <div id="radio-buttons">
          <span>Test interval: </span>
          <input type="radio" name="interval" value="Daily" v-model="interval" required>
          <label for="daily">Daily</label>
          <input type="radio" name="interval" value="Weekly" v-model="interval">
          <label for="weekly">Weekly</label>
          <input type="radio" name="interval" value="Monthly" v-model="interval">
          <label for="monthly">Monthly</label>
        </div>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import AxiosHelper from '../../helpers/AxiosHelper';
const axios = new AxiosHelper();

@Options({
    data() {
        return {
            url: '',
            interval: '',
            placeholder: 'http://example.com'
        };
    },
    methods: {
        async addWebPage(){
            if(this.interval){
                try {
                    await axios.post('/pages', {address: this.url, testInterval: this.interval});
                    this.$toast.success("Page added")
                    this.url = '';
                    await this.$store.dispatch('loadPages');
                    this.$store.commit('FLIP_ADD_WEBPAGE_FORM_MODAL');
                } catch (error) {
                    this.$toast.error("Error when adding page")
                }

            }
        }
    }
})

export default class AddWebpageForm extends Vue {}
</script>

<style scoped>
  #radio-buttons {
    margin-top: 10px;
  }
</style>
