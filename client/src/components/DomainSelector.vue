<template>
    <form>
      <select @change="emitDomain">
        <option value="">All</option>
        <option v-for="domain in domains" :key="domain.id">{{domain}}</option>
      </select>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PageListItem from "../components/PageListItem.vue";

@Options({
    components: {
        PageListItem
    },
    props: {
        domains: {
            type: Array,
        }
    },
    methods: {
        emitDomain(element: any) {
            this.$emit("domain-selected", element.target.value)
        }
    }
})

export default class PageList extends Vue {}
</script>

