<script lang="ts" setup>
import type Message from '~/models/Message'
import type Tag from '~/models/Tag'
import type User from '~/models/User'
import socket from '~/sockets/socket'
import { useChatStore } from '~/stores/chat'
import { events } from '~/enums'
import { firstToLast, isMessage, noMessages } from '~/utils/main/main'

// Use i18n
const { t } = useI18n()
// Use the chat store
const { chat, setChat } = useChatStore()
// The loading state
const isLoading = ref<boolean>(true)
// The chat div
const chatDiv = ref<HTMLDivElement>()

// Reset the chat when the chat is mounted
onMounted(() => {
  setChat([])
})

/**
 * Scroll to the bottom of the chat
 */
const scrollDown = () => {
  // If the chat is mounted, scroll down
  chatDiv.value && setTimeout(() => {
    chatDiv.value!.scrollTop = chatDiv.value!.scrollHeight
  }, 50)
}

/**
 * Socket event that is called everytime a socket event is trigered/received.
 */
socket.onAny(() => {
  // Autoscroll down
  scrollDown()
})

/**
 * Add the tag object of welcome to the chat.
 * @param {User} user - The user instance.
 */
socket.off(events.server.WELCOME).on(events.server.WELCOME, (user: User) => {
  const newTag: Tag = {
    _id: user.id,
    message: t('tag.welcome.body', { username: user.username }),
  }
  chat.push(newTag)
})

/**
 * Set the stored messages to the chat.
 * @param {Message[]} data - The stored messages.
 */
socket.off(events.server.LOAD_MESSAGES).on(events.server.LOAD_MESSAGES, (data: Message[]) => {
  // Set the stored messages to the list
  chat.push(...data)
  // Put the welcome message to the end of the chat
  firstToLast(chat)
  // Set the loading state to false
  isLoading.value = false
})

/**
 * Add the saved message to the chat.
 * @param {Message} data - The stored message.
 */
socket.off(events.server.SAVED_MESSAGE).on(events.server.SAVED_MESSAGE, (data: Message) => {
  if (!isLoading.value) {
    // Add the message to the chat after it has been stored
    chat.push(data)
  }
})
</script>

<template>
  <div
    id="chat"
    ref="chatDiv"
    class="max-h-lg overflow-y-scroll px-5 mb-10"
    lg="px-10"
  >
    <p v-if="noMessages(isLoading, chat)">
      {{ t('text.chat.no-messages') }}
    </p>
    <Loader v-if="isLoading" role="loader" />
    <div v-for="message in chat" :key="message._id" class="flex my-3">
      <Message v-if="isMessage(message)" :data="message" />
      <Tag v-else :data="message" />
    </div>
  </div>
</template>
