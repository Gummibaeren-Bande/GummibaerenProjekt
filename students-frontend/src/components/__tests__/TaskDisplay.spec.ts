// students-frontend/src/components/__test__/test_TaskDisplay.vue
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import TaskDisplay from '../TaskDisplay.vue'
import TaskTitle from '../taskcomponents/TaskTitle.vue'
import TaskInfoBar from '../taskcomponents/TaskInfoBar.vue'
import TaskBody from '../taskcomponents/TaskBody.vue'
import TaskNummericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue'

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

  it('renders TaskBody component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskBody).exists()).toBe(true)
  })

  it('renders TaskNummericAnswerbar component', () => {
    const wrapper = mount(TaskDisplay, { global: globalConfig })
    expect(wrapper.findComponent(TaskNummericAnswerbar).exists()).toBe(true)
  })
})
