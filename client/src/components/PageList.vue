<template>
    <div>
        <ul v-for="page in pages" :key="page.id">
            <PageListItem :address="page.address"/>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PageListItem from "../components/PageListItem.vue";
import AxiosHelper from "../helpers/AxiosHelper"

const axios = new AxiosHelper();

@Options({
    components: {
        PageListItem
    },
    data() {
        return {
            // TEMP DATA
            pages: []
            // TEMP DATA
        }
    },
    async mounted() {
        const data = await axios.get('/pages')
        // console.log(data)

        this.pages = data
    }
})

export default class PageList extends Vue {}
</script>
