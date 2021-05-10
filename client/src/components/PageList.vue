<template>
    <div v-if="pages.length > 0">
        <ul v-for="page in pages" :key="page.id">
            <PageListItem :address="page.address"/>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PageListItem from "../components/PageListItem.vue";

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper()

@Options({
    components: {
        PageListItem
    },
    props: {
        pages: {
            type: Array,
        }
    }
})

export default class PageList extends Vue {}
</script>

