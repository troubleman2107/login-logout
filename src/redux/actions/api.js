import {api} from '../../utils/helpers';
import { setAccessToken, logOut, setUserInfo } from '../../utils/helpers/auth';


export const setUser = (data) => {
    return {
        type: 'SET_USER',
        data,
    };
};


export const fetchRegister = async (
    data,
    onSuccess,
    onFailure,
) => {
    return async (dispatch) => {
        try {
            const res = await api.register(data);
            setAccessToken(res?.data?.token)
            setUserInfo(res?.data)
            if (onSuccess) {
                dispatch(setUser(res?.data))
                onSuccess(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err;
                if (onFailure) {
                    onFailure(res?.data);
                }
            }
        }
    };
};

export const fetchLogin = async (
    data,
    onSuccess,
    onFailure,
) => {
    return async (dispatch) => {
        try {
            const res = await api.login(data);
            setAccessToken(res?.data?.token)
            setUserInfo(res?.data)
            if (onSuccess) {
                dispatch(setUser(res?.data))
                onSuccess(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err;
                if (onFailure) {
                    onFailure(res?.data);
                }
            }
        }
    };
};

export const fetchLogout = async (
    token
) => {
    return async (dispatch) => {
        try {
            const res = await api.logout(token);
            logOut();
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err;
            }
        }
    };
};