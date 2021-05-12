<template>
    <li class="list-item">
        <button id="show-modal" @click="toggleModal">{{address}}</button>
        <Modal v-if="showModal" @close="toggleModal" :address="address" :pageID="pageID"/>
    </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Modal from '../components/Modal.vue'

@Options({
    data() {
        return {
            showModal: false
        }
    },
    components: {
        PageListItem,
        Modal
    },
    props:{
        address: {
            type: String,
            required: true
        },
        pageID: {
            type: String
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
            this.$emit("close")
        }
    }
})

export default class PageListItem extends Vue {}
</script>

<style scoped>
    .list-item {
        list-style: none;
    }

    #show-modal {
        display: inline-block;
        color: #000;
        text-decoration: none;
        background: none;
        border: none;
    }

    #show-modal::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: red;
        transition: width .3s;
    }

    #show-modal:hover::after {
        width: 100%;
    }
</style>