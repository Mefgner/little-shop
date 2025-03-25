import { defineStore } from 'pinia'
import { ref } from 'vue'

export type PopUpType = {
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  origin: string
}

export default defineStore('popup', () => {
  const popUpStack = ref<PopUpType[]>([])

  const addPopUp = (popUp: PopUpType) => {
    popUpStack.value.push(popUp)
  }

  const removePopUp = (popUp: PopUpType) => {
    popUpStack.value = popUpStack.value.filter((item) => item !== popUp)
  }

  const shiftPopUp = () => {
    return popUpStack.value.shift()
  }

  return {
    popUpStack,
    addPopUp,
    removePopUp,
    shiftPopUp,
  }
})
