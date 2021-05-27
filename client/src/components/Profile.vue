<template>
  <div>
    <div id="measurepage">
      <DirectSearch />
    </div>
    <div class="addwebpage">
      <div class="domain-menu">
        <DomainSelector/>
        <button id="show-modal" @click="toggleModal">Add new webpage</button>
      </div>
      <Modal v-if="showModal" @close="toggleModal"/>
      <PageList />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DirectSearch from "../components/DirectSearch.vue";
import DomainSelector from "../components/DomainSelector.vue";
import PageList from "../components/PageList.vue";
import Modal from "../components/Modal.vue";

@Options({
    components: {
        DomainSelector,
        DirectSearch,
        PageList,
        Modal
    },
    async mounted() {
        await this.getPages();
    },
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        async getPages() {
            await this.$store.dispatch('loadPages');
        },
        toggleModal() {
          this.showModal = !this.showModal;
        }
    }
})

export default class Profile extends Vue {}
</script>

<style scoped>
  .addwebpage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .domain-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .domain-menu form {
    margin-right: 10px;
  }

</style>