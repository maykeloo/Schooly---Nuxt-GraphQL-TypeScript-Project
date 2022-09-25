import { Ref } from 'vue'

interface SearchPayload {
      isVisible: Ref<boolean>,
      toggleVisible: () => void
}

const useSearchComponent = (): SearchPayload => {
      const isVisible = useState("isVisible", () => false)

      const toggleVisible = (): void => {
            isVisible.value = !isVisible.value
      }
      return {
            isVisible,
            toggleVisible
      }
}

export default useSearchComponent