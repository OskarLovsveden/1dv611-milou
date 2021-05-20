<template>
    <form>
      <select @change="setDomain">
        <option value="">All</option>
        <option v-for="(domain, index) in domains" :key="index">{{domain}}</option>
      </select>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PageListItem from '../components/PageListItem.vue';

@Options({
    components: {
        PageListItem
    },
    methods: {
        setDomain(element: any) {
            this.$store.commit('SET_DOMAIN', element.target.value);
        }
    },
    computed: {
        domains() {
            const domains = this.$store.state.pages.list.map((p: any) => p.page.domain);
            return [...new Set(domains)];
        },
    }
})

export default class PageList extends Vue {}
</script>

<style scoped>

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    form select {
        width: 160px;
    }

</style>
