<template>
    <form v-on:submit.prevent autocomplete="on">
        <input :placeholder="address" type="url" name="url" autocomplete="on" v-model="url" required>
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

import AxiosHelper from '../../helpers/AxiosHelper';
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
    methods: {
        async updateWebPage() {
            try {
                console.log(this.pageID);
                await axios.update('/pages/' + this.pageID, {address: this.url, testInterval: this.interval});
                this.$toast.success("Page updated")
                await this.$store.dispatch('loadPages');
                this.$store.commit('FLIP_EDIT_DELETE_WEBPAGE_FORM_MODAL');
            } catch (error) {
                this.$toast.error("Error when updating page")
                
            }
        }
    }
})

export default class EditWebpageForm extends Vue {}
</script>

<style scoped>
  #radio-buttons {
    margin-top: 10px;
  }
</style>
