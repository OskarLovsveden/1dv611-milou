<template>
  <div id="app" class="demo">
    <h1>Simple Form</h1>

    <form action="/dataCollectionLocation" method="post" autocomplete='on'>
      <div v-for="item in formItems" :key="item.id" class='form-item'>
        <label :for="item.id">{{ item.label }}: </label>
        <input :type="item.type" :id="item.id" :name="item.id" v-model="item.value">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props:{
      title: {
          type: String,
          required: true
      }
  },
   data() {
    return {
      formItems: [
        {
          label: 'Url',
          id: 'url',
          type: 'text',
          value: ''
        },
      ]
    };
  }
})
export default class AddWebpageForm extends Vue {}
</script>