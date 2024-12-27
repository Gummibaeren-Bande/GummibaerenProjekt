<template>
    <div class="taskBody mainComponentColor">
        <TaskQuestion question="Welche der folgenden Geschmaksrichtungen gibt es bei Gummibärchen?" />
        <TaskMultipleChoice />
    </div>
    <TaskNumericAnswerbar />
</template>
  
<script lang="ts" setup>
import '../taskcomponents/Task.css'
import TaskQuestion from '../taskcomponents/TaskQuestion.vue'
import TaskMultipleChoice from '../taskcomponents/TaskMultipleChoiceSction.vue';
import TaskNumericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue';
</script>