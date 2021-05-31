<template>
  <div id="direct-measure">
    <form @submit.prevent="submitForm" autocomplete="on">
      <div class="form-group">
        <input
          placeholder="http://example.com"
          type="url"
          name="url"
          autocomplete="on"
          v-model="form.url"
          required
        />
      </div>
      <button type="submit">Measure page</button>
    </form>
    <ModalGPSI v-if="showModal" @close="toggleModal" :address="form.url" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ModalGPSI from "./ModalGPSI.vue";

@Options({
  components: {
    ModalGPSI,
  },
  methods: {
    async submitForm() {
      this.toggleModal();

      // this.loader = true;
      // const result = await axios.post("/gpsi/measure", { addresses: [this.form.url] })
      // if (result) {
      //   this.loader = false
      //   this.measureResult = await result.data
      // }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
  data() {
    return {
      showModal: false,
      form: {
        url: null,
      },
      errors: [],
    };
  },
})
export default class DirectSearch extends Vue {}
</script>

<style scoped>
#direct-measure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
}

form {
  display: flex;
  flex-direction: row;
}

form input {
  margin-right: 10px;
}
</style>
