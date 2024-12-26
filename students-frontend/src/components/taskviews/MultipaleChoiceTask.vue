<template>
    <div class="body">
        <TaskQuestion question="Welche der folgenden Geschmaksrichtungen gibt es bei Gummibärchen?" />
        <TaskMultipleChoice />
    </div>
    <TaskNumericAnswerbar />
</template>
  
<script lang="ts" setup>
import TaskQuestion from '../taskcomponents/TaskQuestion.vue'
import TaskMultipleChoice from '../taskcomponents/TaskMultipleChoice.vue';
import TaskNumericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue';
</script>