import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentsView from '../StudentsView.vue'
import { io, Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:3000/students')

describe('StudentsView.vue', () => {
  it('should set groupIsSpecified to true and groupName correctly when a group is in the URL', () => {
    // Mock the window.location.href to include a group query parameter
    const mockURL = 'http://localhost/?group=TestGroup'
    vi.stubGlobal('window', { location: { href: mockURL } })

    // Mount the component with the required prop
    const wrapper = mount(StudentsView, {
      props: {
        socket: socket,
      },
    })

    // Invoke the method
    wrapper.vm.parseURLparams()

    // Assertions
    expect(wrapper.vm.groupIsSpecified).toBe(true)
    expect(wrapper.vm.groupName).toBe('TestGroup')
  })

  it('should set groupIsSpecified to false when no group is in the URL', () => {
    // Mock the window.location.href to exclude a group query parameter
    const mockURL = 'http://localhost/'
    vi.stubGlobal('window', { location: { href: mockURL } })

    // Mount the component with the required prop
    const wrapper = mount(StudentsView, {
      props: {
        socket: socket,
      },
    })

    // Invoke the method
    wrapper.vm.parseURLparams()

    // Assertions
    expect(wrapper.vm.groupIsSpecified).toBe(false)
    expect(wrapper.vm.groupName).toBe('')
  })

  it('should handle URLs with additional query parameters correctly', () => {
    // Mock the window.location.href with multiple query parameters
    const mockURL = 'http://localhost/?otherParam=value&group=AnotherGroup'
    vi.stubGlobal('window', { location: { href: mockURL } })

    // Mount the component with the required prop
    const wrapper = mount(StudentsView, {
      props: {
        socket: socket,
      },
    })

    // Invoke the method
    wrapper.vm.parseURLparams()

    // Assertions
    expect(wrapper.vm.groupIsSpecified).toBe(true)
    expect(wrapper.vm.groupName).toBe('AnotherGroup')
  })
})
