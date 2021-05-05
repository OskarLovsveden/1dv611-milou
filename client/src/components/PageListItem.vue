<template>
    <li class="list-item">
       {{address}}
       <button>edit</button>
       <ChartModal />
       <button>delete</button>
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
    }
})

export default class PageListItem extends Vue {}
</script>

<style scoped>
    .list-item {
        list-style: none;
    }
</style>