<template>
    <div id="body">
        <TaskDescribtion />
        <TaskQuestion />
    </div>
</template>

<style scoped>

    #body {
        background-color: #ffffff66;
        height: 60vh;
        width: inherit;
        color: black;
        text-align: left;
        font-size: large;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }

</style>

<script setup lang="ts">
    import TaskDescribtion from './TaskDescribtion.vue';
    import TaskQuestion from './TaskQuestion.vue';
</script>