<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3 name="header">Result from GPSI measure</h3>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div v-if="loader">
                <LoadingSpinner />
              </div>
              <div v-else>
                <Chart :data="chartDataObject" />
              </div>
            </slot>
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

import AxiosHelper from "../helpers/AxiosHelper";
const axios = new AxiosHelper();

import Chart from "./DataChart.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

interface ChartData {
  names: string[];
  values: number[];
}

@Options({
  components: {
    Chart,
    LoadingSpinner,
  },
  props: {
    address: {
      type: String,
    },
  },
  data() {
    return {
      loader: true,
      measureResult: null,
      chartDataObject: null,
    };
  },
  methods: {
    emitCloseEvent() {
      this.$emit("close");
    },
  },
  async mounted() {
    this.loader = true;
    const result = await axios.post("/gpsi/measure", {
      addresses: [this.address],
    });
    if (result) {
      const resultData = result.data;
      let array: ChartData = {
        values: [],
        names: [],
      };
      array.values.push(resultData[0].totalScore);
      array.names.push(Object.keys(resultData[0])[0]);

      resultData[0].categories.forEach((element: any) => {
        array.values.push(element.score);
        array.names.push(element.title);
      });
      this.chartDataObject = array;
      // console.log(this.chartDataArray, "chart data array");
      // this.measureResult = await result.data;
      // console.log(array);
      this.loader = false;
    }
  },
})
export default class ModalGPSI extends Vue {}
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
  height: 600px;
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
}

.modal-body {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  height: 100%;
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

#result {
  display: flex;
  flex-direction: column;
}
</style>