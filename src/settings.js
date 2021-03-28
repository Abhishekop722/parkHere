import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv()
export const getIpAddressUrl = "https://api.ipify.org/?format=json"
export const apiUrl = env.REACT_APP_API_URL || "https://web-park-here.herokuapp.com"
export const getToken = () => {
    let headerObj = {
        'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
    return headerObj
}
export const DateFormat = 'DD MMM YYYY'
export const DateTimeFormat = 'DD/MM/YYYY HH:mm:ss'