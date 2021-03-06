import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import type { TestingPinia } from '@pinia/testing'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import Dashboard from '~/pages/dashboard/index.vue'
import { useUserStore } from '~/stores/user'
import { messages } from '~/modules/i18n'
import { routes } from '~/enums'
import { user } from '~/__mocks__/user'

let pinia: TestingPinia
// Define the router
const router = { push: () => {} }
// Mock the router by importing the router from the vue-router module
vi.mock('vue-router', () => ({
  useRouter: () => router,
}))

beforeAll(() => {
  // Remove the warning messages
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  // Create pinia instance
  pinia = createTestingPinia({
    initialState: {
      user: { name: user.username },
    },
  })
})

describe('<Dashboard />', () => {
  let wrapper: VueWrapper
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  })
  const global = {
    plugins: [pinia, i18n],
    mocks: {
      $router: router,
    },
  }

  beforeEach(() => {
    wrapper = mount(Dashboard, { global })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.resetAllMocks()
  })

  test('should mount', () => {
    // The component should exists
    expect(Dashboard).toBeTruthy()
    // The component should be mounted
    expect(wrapper).toBeTruthy()
  })

  test('should logout', async() => {
    const user = useUserStore()
    const logoutAction = vi.spyOn(router, 'push')

    await wrapper.find('button').trigger('click')

    expect(logoutAction).toHaveBeenCalledWith(routes.LOGIN)
    expect(logoutAction).toHaveBeenCalledTimes(1)

    expect(user.name).toBe('')
  })
})
