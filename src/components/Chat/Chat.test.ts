/* eslint-disable @typescript-eslint/no-unused-vars */
// import type Message from '~/models/Message'

import type { TestingPinia } from '@pinia/testing'
import { createTestingPinia } from '@pinia/testing'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import Chat from './Chat.vue'
import { useUserStore } from '~/stores/user'

let pinia: TestingPinia

beforeAll(() => {
  // Remove the warning messages
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  // Create pinia instance
  pinia = createTestingPinia({
    initialState: {
      user: { name: 'John Doe' },
    },
  })
})

describe('socket io events', () => {
  let wrapper: VueWrapper
  const global = {
    plugins: [pinia],
  }

  beforeEach(() => {
    wrapper = mount(Chat, { global })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.resetAllMocks()
  })

  test('should show the loading message', () => {
    const user = useUserStore()
    user.name = 'John Doe'

    expect(wrapper.find('[role="loader"]').text()).toBe('Loading messages...')
  })
})
