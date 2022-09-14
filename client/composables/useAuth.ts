const useAuth = () => {
    const isLogged = async () => {
        const isLoggedState = useState("logged", () => false)
        if(process.client) {
            await localStorage.getItem("token") === null 
                ? isLoggedState.value = false
                : isLoggedState.value = true
            return !!isLoggedState.value
        }
    }

    return {
        isLogged
    }
}

export default useAuth

