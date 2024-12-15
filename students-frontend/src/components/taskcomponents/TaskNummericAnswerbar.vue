<template>
    <div id="AnswerBar">
        <TaskNummericInput />
        <TaskAnswerbutton />
    </div>
</template>

<style scoped>

    #AnswerBar {
        display: grid;
        grid-template-columns: 4fr 1fr;
        width: inherit;
        height: auto;
        border-bottom-left-radius: 12px;
    }

</style>

<script lang="ts" setup>
    import TaskAnswerbutton from './TaskAnswerbutton.vue';
    import TaskNummericInput from './TaskNummericInput.vue';
</script>
