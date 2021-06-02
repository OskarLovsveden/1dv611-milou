<template>
  <li class="list-item">
    <button @click="toggleHistoryModal">{{ address }}</button>
    <HistoryGraphModal
      v-if="showHistoryModal"
      @close-history-modal="toggleHistoryModal"
      :address="address"
    />

    <font-awesome-icon class="edit-icon" @click="toggleEditModal" icon="edit" />
    <Modal
      v-if="showEditModal"
      @close="toggleEditModal"
      :address="address"
      :pageID="pageID"
    />
  </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "./modals/Modal.vue";
import HistoryGraphModal from "./modals/HistoryGraphModal.vue";

@Options({
  components: {
    PageListItem,
    Modal,
    HistoryGraphModal,
  },
  data() {
    return {
      showEditModal: false,
      showHistoryModal: false,
    };
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    pageID: {
      type: String,
    },
  },
  methods: {
    toggleEditModal() {
      this.showEditModal = !this.showEditModal;
    },
    toggleHistoryModal() {
      this.showHistoryModal = !this.showHistoryModal;
    },
  },
})
export default class PageListItem extends Vue {}
</script>

<style scoped>
.list-item {
  list-style: none;
}

.edit-icon {
  margin-left: 1rem;
  transition: 0.5s;
}

.edit-icon:hover {
  cursor: pointer;
  transform: scale(1.5);
}
</style>