import {Navigate, Outlet} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import {useState, useEffect} from 'react'


function ProtectedRoute({children}) {
    const [isAuthorised, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post('/api/token/refresh/', { 
                refresh: refreshToken 
            });
             if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log('Error refreshing token:', error);
            setIsAuthorized(false);
        }

    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        }
        const decode = jwtDecode(token);
        const tokenExpiraition = decode.exp
        const now = Date.now() / 1000;

        if (tokenExpiraition < now) {
            await refreshToken();
            return
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorised === null) {
        return <div>Loading...</div>
    }

    return isAuthorised ? children : <Navigate to="/login" />
}

export default ProtectedRoute