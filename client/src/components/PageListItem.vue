<template>
    <li class="list-item">
        <button id="show-modal" @click="toggleModal">{{address}}</button>
        <Modal v-if="showModal" @close="toggleModal" :address="address" :pageID="pageID"/>
    </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Modal from '../components/Modal.vue';

@Options({
    components: {
        PageListItem,
        Modal
    },
    data() {
        return {
            showModal: false
        };
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
            this.showModal = !this.showModal;
            this.$emit('close');
            }
    },
    // computed: {
    //     showModal () {
    //         return this.$store.state.modal.editWebpage
    //     }
    // }
})

export default class PageListItem extends Vue {}
</script>

<style scoped>
    .list-item {
        list-style: none;
    }
</style>