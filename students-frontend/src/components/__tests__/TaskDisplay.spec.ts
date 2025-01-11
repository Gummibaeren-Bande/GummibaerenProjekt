// students-frontend/src/components/__test__/test_TaskDisplay.vue
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import TaskDisplay, { TaskType } from '../TaskDisplay.vue'
import TaskTitle from '../taskcomponents/TaskHeader/TaskTitle.vue'
import TaskInfoBar from '../taskcomponents/TaskHeader/TaskInfoBar.vue'
import TaskDescription from '../taskcomponents/TaskBodyParts/TaskDescription.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import TaskQuestion from '../taskcomponents/TaskBodyParts/TaskQuestion.vue'
import TaskMultipleChoiceSection from '../taskcomponents/TaskBodyParts/TaskMultipleChoiceSection.vue'
import TaskAnswerbutton from '../taskcomponents/TaskAnswerbarParts/TaskAnswerbutton.vue'
import MultipaleChoiceTask from '../taskviews/MultipaleChoiceTask.vue'
import NumericTask from '../taskviews/NumericTask.vue'

const globalConfig = {
  plugins: [PrimeVue],
  components: {
    InputText,
    InputNumber,
  },
}

describe('TaskDisplay.vue', () => {
  it('renders TaskDisplay component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders TaskTitle component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskTitle).exists()).toBe(true)
  })

  it('renders TaskInfoBar component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskInfoBar).exists()).toBe(true)
  })

  it('renders InputNumber component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(InputNumber).exists()).toBe(true)
  })

  it('renders TaskDescription component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskDescription).exists()).toBe(true)
  })

  it('renders TaksBody component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskBody).exists()).toBe(true)
  })

  it('renders TaskQuestion component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskQuestion).exists()).toBe(true)
  })

  it('renders TaskAnswerbutton component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskAnswerbutton).exists()).toBe(true)
  })

  it('renders NumericTask component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(NumericTask).exists()).toBe(true)
  })

  it('renders MultipaleChoiceTask component', () => {
    const wrapper = mount(TaskDisplay, {
      global: globalConfig,
      data() {
        return {
          currentTask: {
            title: 'Gummibärchen Verteilung',
            description: '',
            question:
              'Welche der folgenden Geschmacksrichtungen gibt es typischerweise bei Gummibärchen?',
            answerOptions: [
              {
                label: 'A) Erdbeere, Zitrone, Himbeere, Orange, Apfel und Ananas',
                value: 'option1',
              },
              {
                label: 'B) Banane, Kirsche, Mango, Pfirsich, Limette und Maracuja',
                value: 'option2',
              },
              {
                label: 'C) Vanille, Schokolade, Zimt, Kokos, Pfefferminze und Brombeere',
                value: 'option3',
              },
              {
                label: 'D) Wassermelone, Kiwi, Heidelbeere, Passionsfrucht, Pflaume und Grapefruit',
                value: 'option4',
              },
            ],
            lsg: 'option1',
            taskType: TaskType.MULTIPLE_CHOICE,
            isCorrectd(givenAnswer: string): boolean {
              return givenAnswer === this.lsg
            },
          },
        }
      },
    })
    expect(wrapper.findComponent(MultipaleChoiceTask).exists()).toBe(true)
  })

  it('renders TaskMultipleChoiceSection component', () => {
    const wrapper = mount(TaskDisplay, {
      global: globalConfig,
      data() {
        return {
          currentTask: {
            title: 'Gummibärchen Verteilung',
            description: '',
            question:
              'Welche der folgenden Geschmacksrichtungen gibt es typischerweise bei Gummibärchen?',
            answerOptions: [
              {
                label: 'A) Erdbeere, Zitrone, Himbeere, Orange, Apfel und Ananas',
                value: 'option1',
              },
              {
                label: 'B) Banane, Kirsche, Mango, Pfirsich, Limette und Maracuja',
                value: 'option2',
              },
              {
                label: 'C) Vanille, Schokolade, Zimt, Kokos, Pfefferminze und Brombeere',
                value: 'option3',
              },
              {
                label: 'D) Wassermelone, Kiwi, Heidelbeere, Passionsfrucht, Pflaume und Grapefruit',
                value: 'option4',
              },
            ],
            lsg: 'option1',
            taskType: TaskType.MULTIPLE_CHOICE,
            isCorrectd(givenAnswer: string): boolean {
              return givenAnswer === this.lsg
            },
          },
        }
      },
    })
    expect(wrapper.findComponent(TaskMultipleChoiceSection).exists()).toBe(true)
  })
})
