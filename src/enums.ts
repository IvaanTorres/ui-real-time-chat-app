export const locales = {
  ENGLISH: 'English',
  GERMAN: 'Deutsch',
  SPANISH: 'Español',
  FRENCH: 'Français',
  ITALIAN: 'Italiano',
  RUSSIAN: 'Русский',
  JAPONEASE: '日本',
  PORTUGUESE: 'Português',
}

export const routes = {
  HOME: '/',
  LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
}

export const layouts = {
  DASHBOARD: 'dashboard',
  AUTH: 'auth',
  NOT_FOUND: 404,
}

export const events = {
  client: {
    MESSAGE: 'client:message',
  },
  server: {
    WELCOME: 'server:welcome',
    USER_CONNECTION: 'server:user-connection',
    USER_DISCONNECTION: 'server:user-disconnection',
    SAVED_MESSAGE: 'server:saved-message',
    LOAD_MESSAGES: 'server:load-messages',
    USERS: 'server:users',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    CONNECT_ERROR: 'connect_error',
  },
}
