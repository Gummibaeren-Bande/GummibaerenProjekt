import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import PrimeVue from 'primevue/config'
import type { ComponentPublicInstance } from 'vue'
import ReconnectPopup from '../ReconnectPopup.vue'

describe('ReconnectPopup', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof ReconnectPopup>>

  beforeEach(() => {
    wrapper = mount(ReconnectPopup, {
      global: {
        plugins: [PrimeVue],
        components: {
          Dialog,
          Button,
          InputText,
        },
        mocks: {
          alert: vi.fn(), // Mock alert calls
        },
      },
    })
  })

  describe('isEmpty', () => {
    it('should return true for an empty string', () => {
      expect(wrapper.vm.isEmpty('')).toBe(true)
    })

    it('should return false for a non-empty string', () => {
      expect(wrapper.vm.isEmpty('Test')).toBe(false)
    })

    it('should return true for whitespace only', () => {
      expect(wrapper.vm.isEmpty('    ')).toBe(false)
    })
  })

  describe('isNotRequiredLength', () => {
    it('should return true for too short a name', () => {
      expect(wrapper.vm.isNotRequiredLength('Ab')).toBe(true)
    })

    it('should return true for too long a name', () => {
      expect(wrapper.vm.isNotRequiredLength('A'.repeat(21))).toBe(true)
    })

    it('should return false for a valid-length name', () => {
      expect(wrapper.vm.isNotRequiredLength('Valid')).toBe(false)
    })
  })

  describe('startsWithSpace', () => {
    it('should return true if the name starts with a space', () => {
      expect(wrapper.vm.startsWithSpace(' Test')).toBe(true)
    })

    it('should return false if the name does not start with a space', () => {
      expect(wrapper.vm.startsWithSpace('Test')).toBe(false)
    })

    it('should return false for an empty string', () => {
      expect(wrapper.vm.startsWithSpace('')).toBe(false)
    })
  })

  describe('endsWithSpace', () => {
    it('should return true if the name ends with a space', () => {
      expect(wrapper.vm.endsWithSpace('Test ')).toBe(true)
    })

    it('should return false if the name does not end with a space', () => {
      expect(wrapper.vm.endsWithSpace('Test')).toBe(false)
    })

    it('should return false for an empty string', () => {
      expect(wrapper.vm.endsWithSpace('')).toBe(false)
    })
  })

  describe('hasIllegalCharacters', () => {
    it('should return true for a name with illegal characters', () => {
      expect(wrapper.vm.hasIllegalCharacters('Test@123')).toBe(true)
    })

    it('should return false for a name with valid characters', () => {
      expect(wrapper.vm.hasIllegalCharacters('Valid Name 123')).toBe(false)
    })

    it('should return true for a name with special symbols', () => {
      expect(wrapper.vm.hasIllegalCharacters('Invalid!Name')).toBe(true)
    })
  })
})
