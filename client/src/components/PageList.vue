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
// import axios from 'axios'

@Options({
    components: {
        PageListItem
    },
    data() {
        return {
            // TEMP DATA
            pages: [
                {
                    address: 'http://google.se',
                    id: '1'
                }, 
                {
                    address: 'http://facebook.se',
                    id: '2'
                }
            ]
            // TEMP DATA
        }
    },
    // async mounted() {
    //     console.log('test')
     
    //     const response = await axios('/pages')
    //     this.pages = response
    // }
})

export default class PageList extends Vue {}
</script>
