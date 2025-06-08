import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useErrorHandler() {
  const route = useRoute()
  const errorText = ref<string>('')
  const showError = ref(false)

  const isThereError = computed(() => showError.value && errorText.value.length)

  const setError = (message: string) => {
    errorText.value = message
    showError.value = true
  }

  const closeError = () => (showError.value = false)

  watch(route, async () => {
    closeError()
    if (route.query.message === 'requiredAuth') {
      setError('Нужно сначала войти')
    }
  })

  onMounted(() => {
    if (route.query.message === 'requiredAuth') {
      setError('Нужно сначала войти')
    }
  })

  return {
    errorText,
    isThereError,
    closeError,
    setError,
  }
}
