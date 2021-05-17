<template>
    <div id="logo-container">
        <h1>Milou</h1>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class Logo extends Vue {}
</script>

<style scoped>

    #logo-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        color: white;
        background-color: rgb(238, 0, 0);
        text-transform: uppercase;
        padding: 40px 20px;
        border-radius: 10px;
        font-weight: 900;
    }
</style>