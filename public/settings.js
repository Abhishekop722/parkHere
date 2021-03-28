import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv()
export const getIpAddressUrl = "https://api.ipify.org/?format=json"
export const apiUrl = env.REACT_APP_API_URL || "https://PHB-backend-dev.herokuapp.com"
export const getToken = () => {
    // return ({ 'headers': { 'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDE0NzI4NjQsInVzZXItZGF0YSI6eyJpZCI6ImhpLmhpbWFuc2h1MTRAZ21haWwuY29tIiwibmFtZSI6IkhpbWFuc2h1In19.emiOWCZEmpWXAWrwtTF8R8Y5h0O1euEzfZyOptd25mw" } })
    return ({ 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
}
export const DateFormat = 'DD MMM YYYY'
export const DateTimeFormat = 'DD/MM/YYYY HH:mm:ss'
export const loginCallBackOriginUrl = apiUrl
export const assetRoutePath = '/asset/'
export const areaChartRange = [
    {
        label: '7D',
        value: '7d'
    },
    {
        label: '1M',
        value: '1m'
    },
    {
        label: '6M',
        value: '6m'
    },
    // {
    //     label: 'YTD',
    //     value: 'ytd'
    // },
    {
        label: '1Y',
        value: 'monthly'
    },
    {
        label: '5Y',
        value: '5y'
    },
    {
        label: 'Max',
        value: 'yearly'
    }
]
export const barChartRange = [
    {
        label: 'Monthly',
        value: 'monthly'
    },
    {
        label: 'Yearly',
        value: 'yearly'
    }
]