<template>
    <form v-on:submit.prevent autocomplete="on">
        <input :placeholder="placeholder" type="url" name="url" autocomplete="on" v-model="url" required>
        <button v-if="address" @click="updateWebPage" type="submit">Update</button>
        <button v-else @click="addWebPage" type="submit">Add</button>
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

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper();

@Options({
    props: {
        address: {
            type: String
        },
        testInterval: {
            type: String
        },
        pageID: {
            type: String
        }
    },
    data() {
        return {
            url: '',
            interval: ''
        };
    },
    computed: {
        placeholder() { 
            return this.address ? this.address : 'http://example.com';
        },
    },
    methods: {
        async addWebPage(){
            if(this.interval){
                try {
                    await axios.post('/pages', {address: this.url, testInterval: this.interval});
                    this.$toast.success("Page added")
                    this.url = '';
                    await this.$store.dispatch('loadPages');
                } catch (error) {
                    this.$toast.error("Error when adding page")
                }
            }
        },
        async updateWebPage() {
            try {
                await axios.update('/pages/' + this.pageID, {address: this.url, testInterval: this.interval});
                this.$toast.success("Page updated")
                await this.$store.dispatch('loadPages');
            } catch (error) {
                this.$toast.error("Error when updating page")
                
            }
        }
    }
})

export default class WebpageForm extends Vue {}
</script>

<style scoped>
  #radio-buttons {
    margin-top: 10px;
  }
</style>
