<template>
    <div id="AnswerButton">
        <Button label="Abschicken" fluid/>
    </div>
</template>

<style scoped>
    #AnswerButton {
        display: flex;
        height: inherit;
        background-color: #ffffff66;
        margin-left: 2px;
        border-bottom-right-radius: 12px;
    }

    #AnswerButton button {
        margin: 5px;
        color: black;
    }

</style>

<script lang="ts" setup>
    import Button from 'primevue/button';
</script>