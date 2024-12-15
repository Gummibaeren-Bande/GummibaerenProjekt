<template>
    <div id="mainDiv">
        <TaskTitle />
        <TaskBody />
        <TaskNummericAnswerbar />
    </div>

</template>

<style>
    #mainDiv {
        width: 80vw; /* Makes the Div 80% of the ViewPort. This width will be inheritet by all child Components. So it devines the Displayed width. */
    }

</style>

<script setup lang="ts">
    import TaskTitle from './taskcomponents/TaskTitle.vue';
    import TaskBody from './taskcomponents/TaskBody.vue';
    import TaskNummericAnswerbar from './taskcomponents/TaskNummericAnswerbar.vue';

</script>
