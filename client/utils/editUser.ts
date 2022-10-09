import { useMutation } from "@vue/apollo-composable";
import { EDIT_MAIL, EDIT_NAME, EDIT_PASSWORD } from "~~/api/mutations";

export const editName = () => {
      const { mutate, loading, error, onDone } = useMutation(EDIT_NAME);
      return {
            mutate,
            loading,
            error,
            onDone
      }
}

export const editEmail = () => {
      const { mutate, loading, error, onDone } = useMutation(EDIT_MAIL);
      return {
            mutate,
            loading,
            error,
            onDone
      }
}

export const editPassword = () => {
      const { mutate, loading, error, onDone } = useMutation(EDIT_PASSWORD);
      return {
            mutate,
            loading,
            error,
            onDone
      }
}

