<template>
  <TaskHeader :title="task.title" :group="group"/>
  <TaskBody :question="task.question" :description="task.description" />
  <TaskDefaultAnswerbar v-on:submit-answer="submitAnswer" :disabled="disableToAnswer" >
    <div class="taskAnswerbar">
      <InputNumber v-model="value" id="answer" input-id="integeronly" placeholder="Antwort" fluid locale="de-DE" :disabled="disableToAnswer"/>
    </div>
  </TaskDefaultAnswerbar>
</template>

<script lang="ts">
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import InputNumber from 'primevue/inputnumber'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'

interface Task {
  title: string
  description: string
  question: string
}

export default defineComponent({
  components: {
    TaskDefaultAnswerbar,
    TaskHeader,
    TaskBody,
    InputNumber,
  },
  emits: ['submitAnswer'],
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
    group: {
      type: Object as PropType<GroupInfo>,
      required: true,
    },
    disableToAnswer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: undefined as number | undefined,
    }
  },
  methods: {
    submitAnswer() {
      if (typeof this.value === 'number') {
        this.$emit('submitAnswer', [this.value.toString()])
      }
      console.log('Bitte gebe zuerst eine Antwort ein.')
    },
  },
})
</script>

<style scoped>
#answer {
  margin: 5px;
}
</style>
