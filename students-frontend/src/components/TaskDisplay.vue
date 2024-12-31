<template>
  <RightWrongOverlay :is-right="isCorrect" :visible="isRigthWrongOverlayVisible" v-on:weiter="weiter" />
  <div class="mainComponent mainDivSize">
    <NumericTask 
      v-if="currentTask.taskType===TaskType.NUMERIC" 
      v-on:submit-answer="submitAnswer"
      :task="currentTask"
      :group="group" />
    <MultipaleChoiceTask 
      v-if="currentTask.taskType===TaskType.MULTIPLE_CHOICE" 
      v-on:submit-answer="submitAnswer"
      :task="task3" 
      :group="group" />
  </div>
</template>

<script lang="ts" setup>
import RightWrongOverlay from './taskcomponents/RightWrongOverlay.vue'
import './taskcomponents/Task.css'
import MultipaleChoiceTask from './taskviews/MultipaleChoiceTask.vue'
import NumericTask from './taskviews/NumericTask.vue'
import { defineComponent } from 'vue'
</script>

<script lang="ts">

enum TaskType {
  NUMERIC,
  MULTIPLE_CHOICE
}

interface Task {
  title: string
  description: string
  question: string
  lsg: number | string
  taskType: TaskType
  isCorrectd(givenAnswer: string): boolean
}

export default defineComponent({
  data() {
    return {
      taskCatalog: [] as Task[],
      currentTask: task1 as Task,
      isCorrect: false as boolean,
      isRigthWrongOverlayVisible: false as boolean,
      group: {
        groupname: 'Teddybären',
        finishedTasks: 1,
        increaseFinishedTasks() {
          this.finishedTasks++
        }
      }
    }
  },
  methods: {
    submitAnswer(givenAnswer: string[]) {
      console.log('Gegeben Antwor ist: ' + givenAnswer[0])
      this.isCorrect = this.currentTask.isCorrectd(givenAnswer[0])
      if (this.isCorrect) {
        console.log('Richtige Antwort')
      } else {
        console.log('Flachse Antwort')
      }
      this.isRigthWrongOverlayVisible = true
    },
    weiter() {
      this.isRigthWrongOverlayVisible = false
      if (this.isCorrect) {
        this.group.increaseFinishedTasks()
        this.nextTask()
        this.isCorrect = false
      }
    },
    nextTask() {
      if (JSON.stringify(this.currentTask) === JSON.stringify(task1)) {
        this.currentTask = task2
      } else if (JSON.stringify(this.currentTask) === JSON.stringify(task2)) {
        this.currentTask = task3
      } else {
        this.currentTask = task1
      }
    },
  },
})

const task1 = {
  title: 'Gummibärchen Verteilung',
  description:
    'In einer Gummibärchenpackung gibt es ingesamt 256 Gummibärchen. Diese sollen jetzt auf Tom, Alice, Jonas, Friedrich, Tabea, Michi, Lisa und Felix aufgeteilt werden.',
  question: 'Wie viele Gummibärchen bekommt jeder?',
  lsg: 32,
  taskType: TaskType.NUMERIC,
  isCorrectd(givenAnswer: string): boolean {
    return givenAnswer === this.lsg.toString()
  }
}

const task2 = {
  title: 'Gummibärchen Verteilung',
  description:
    'In einer Gummibärchenpackung gibt es ingesamt 256 Gummibärchen. Diese sollen jetzt auf Tom, Alice, Jonas, Friedrich, Tabea, Michi, Lisa und Felix aufgeteilt werden. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus. Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
  question: 'Wie viele Gummibärchen bekommt jeder?',
  lsg: 32,
  taskType: TaskType.NUMERIC,
  isCorrectd(givenAnswer: string): boolean {
    return givenAnswer === this.lsg.toString()
  }
}

const task3 = {
  title: 'Gummibärchen Verteilung',
  description: '',
  question: 'Welche der folgenden Geschmacksrichtungen gibt es typischerweise bei Gummibärchen?',
  answerOptions: [
    { label: 'A) Erdbeere, Zitrone, Himbeere, Orange, Apfel und Ananas', value: 'option1' },
    { label: 'B) Banane, Kirsche, Mango, Pfirsich, Limette und Maracuja', value: 'option2' },
    { label: 'C) Vanille, Schokolade, Zimt, Kokos, Pfefferminze und Brombeere', value: 'option3' },
    { label: 'D) Wassermelone, Kiwi, Heidelbeere, Passionsfrucht, Pflaume und Grapefruit', value: 'option4'}
  ],
  lsg: 'option1',
  taskType: TaskType.MULTIPLE_CHOICE,
  isCorrectd(givenAnswer: string): boolean {
    return givenAnswer === this.lsg
  }
}
</script>