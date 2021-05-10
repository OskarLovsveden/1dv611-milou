<template>
    <li class="list-item">
       <button @click="showModal" class="url-button">{{address}}</button>
       <!-- <ChartModal /> -->
    </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ChartModal from '../components/ChartModal.vue'

@Options({
    components: {
        PageListItem,
        ChartModal
    },
    props:{
        address: {
            type: String,
            required: true
        }
    },
    methods: {
        showModal(e:any) {
            console.log(e.target)
        }
    }
})

export default class PageListItem extends Vue {}
</script>

<style scoped>
    .list-item {
        list-style: none;
    }
    .url-button {
        color: white;
        background-color: #7700ff;
        border: none;

    }
</style>