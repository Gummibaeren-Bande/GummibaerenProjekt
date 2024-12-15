<template>
    <div id="mainDiv">
        <Title />
        <TaskDescribtion />
        <TaskNummericAnswerbar />
    </div>

</template>

<style>
    #mainDiv {
        width: 80vw; /* Makes the Div 80% of the ViewPort. This width will be inheritet by all child Components. So it devines the Displayed width. */
    }

</style>

<script setup lang="ts">
    import Title from './taskcomponents/TaskTitle.vue';
    import TaskDescribtion from './taskcomponents/TaskDescribtion.vue';
    import TaskNummericAnswerbar from './taskcomponents/TaskNummericAnswerbar.vue';
</script>
