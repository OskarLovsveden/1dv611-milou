<template>
    <div v-if="pages.length > 0">
        <ul v-for="(item, index) in pages" :key="index">
            <PageListItem :address="item.page.address" :pageID="item.page._id" @close="closeModal"/>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PageListItem from '../components/PageListItem.vue';

@Options({
    components: {
        PageListItem
    },
    computed: {
        pages () {

        if (this.$store.state.pages.domain) {
            return this.$store.state.pages.list.filter((p: any) => p.page.domain === this.$store.state.pages.domain);
        }

        return this.$store.state.pages.list;
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
})

export default class PageList extends Vue {}
</script>

<style scoped>
    ul {
        margin: 0;
        margin-top: 15px;
        padding: 0;
    }
</style>
