<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">{{address ? 'Update webpage' : 'Add new webpage'}}</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <WebpageForm :address="address" :pageID="pageID"/>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <DeleteButton v-if="address" :pageID="pageID" ></DeleteButton>
              <button class="modal-default-button" @click="emitCloseEvent">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WebpageForm from "../components/WebpageForm.vue";
import DeleteButton from "../components/DeleteButton.vue";

@Options({
  components: {
    WebpageForm,
    DeleteButton
  },
  props: {
    address: {
      type: String
    },
    pageID: {
      type: String
    }
  },
  methods: {
    emitCloseEvent() {
      this.$emit("close")
    }
  }
})

export default class Modal extends Vue {}
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: test 10.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

#left-buttons {
  display: flex;
  flex-direction: row;
}

.modal-default-button {
  display: block;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

</style>