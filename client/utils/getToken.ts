import jwt_decode from "jwt-decode";

export interface JWT {
    exp: string
    iat: string
    userId: string
}

const getToken = async (): Promise<JWT> => {
    try {
        const token: string = await localStorage.getItem('token');
        return jwt_decode(token)
    } catch(error) {
        return null
    }
}

export default getToken