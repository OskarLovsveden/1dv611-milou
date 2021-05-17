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
    props: {
        pages: {
            type: Array,
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
