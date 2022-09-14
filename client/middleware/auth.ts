export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isLogged: il } = useAuth()
    const isLogged = await il()
    if(!isLogged && isLogged != undefined) {
        return navigateTo("/signin")
    } 
})