import { apiUrl } from "../../../settings";


export const nativeLoginUrl = () => {
    return apiUrl + '/login/native';
};
export const RegisterUrl = () => {
    return apiUrl + '/register';
};
export const resetPasswordRequest = () => {
    return apiUrl + '/reset_password_request';
};
export const resetPasswordUrl = () => {
    return apiUrl + '/reset_password';
};