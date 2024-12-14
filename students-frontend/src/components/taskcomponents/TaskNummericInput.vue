<template>
    <div id="solution">
        <InputNumber id="answer" input-id="integeronly" placeholder="Antwort" fluid locale="de-DE" />
    </div>
</template>

<style scoped>
    
    #solution {
        display: flex;
        justify-content: left;
        align-items: center;
        background-color: #ffffff66;
        height: inherit;
        border-bottom-left-radius: 12px;
    }

    #answer {
        margin: 5px;
    }


</style>

<script lang="ts" setup>
    import InputNumber from 'primevue/inputnumber';
</script>