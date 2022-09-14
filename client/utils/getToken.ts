import jwt_decode from "jwt-decode";

interface JWT {
    exp: string
    iat: string
    userId: string
}

const getToken = async (): Promise<JWT> => {
    const token: string = await localStorage.getItem('token');
    try {
        return jwt_decode(token)
    } catch(error) {
        return null
    }
}

export default getToken