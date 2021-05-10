<template>
    <form>
      <select>
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
        pages: {
            type: Array,
        }
    },
    computed: {
            domains() {
                const domains = this.pages.map((p: any) => p.domain)
                return [...new Set(domains)]
            }
        }
    })

export default class PageList extends Vue {}
</script>

