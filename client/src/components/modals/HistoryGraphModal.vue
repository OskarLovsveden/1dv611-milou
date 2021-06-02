<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">{{ address }}</slot>
          </div>

          <div class="modal-body">
            <iframe class="chart" :src="iFrameSrc" frameborder="0"></iframe>
          </div>

          <div class="modal-footer">
            <slot name="footer">
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
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitCloseEvent(): void {
      this.$emit("close-history-modal");
    },
  },
  computed: {
    iFrameSrc(): string {
      return `${process.env.VUE_APP_BASE_URL}/graphs?address=${this.address}`;
    },
  },
})
export default class Modal extends Vue {}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}

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
  width: 70rem;
  height: 50rem;
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
  height: 90%;
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