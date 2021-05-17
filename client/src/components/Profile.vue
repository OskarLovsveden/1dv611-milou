<template>
  <div>
    <div id="measurepage">
      <DirectSearch />
    </div>
    <div class="addwebpage">
      <div class="domain-menu">
        <DomainSelector :domains="domains" @domain-selected="setDomain"/>
        <button id="show-modal" @click="toggleModal">Add new webpage</button>
      </div>
      <Modal v-if="showModal" @close="toggleModal"/>
      <PageList :pages="pagesToShow" @close="toggleModal"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DirectSearch from "../components/DirectSearch.vue";
import DomainSelector from "../components/DomainSelector.vue";
import PageList from "../components/PageList.vue";
import Modal from "../components/Modal.vue";

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper();


@Options({
    components: {
        DomainSelector,
        DirectSearch,
        PageList,
        Modal
    },
    mounted() {
        this.getPages();
    },
    data() {
        return {
            pages: [],
            domain: null,
            showModal: false
        };
    },
    methods: {
        async getPages() {
            const response = await axios.get('/pages');
            this.pages = response.data;
        },
        setDomain(value: string) {
            this.domain = value;
        },
        toggleModal() {
            this.showModal = !this.showModal;
            this.getPages();
        }
    },
    computed: {
        domains() {
            const domains = this.pages.map((p: any) => p.page.domain);
            return [...new Set(domains)];
        },
        pagesToShow() {
            if (this.domain) {
                return this.pages.filter((p: any) => p.page.domain === this.domain);
            }

            return this.pages;
        }
    }
})

export default class Profile extends Vue {}
</script>

<style scoped>
  .addwebpage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .domain-menu {
    display: flex;
    flex-direction: row;
  }

  .domain-menu form {
    margin-right: 10px;
  }

</style>