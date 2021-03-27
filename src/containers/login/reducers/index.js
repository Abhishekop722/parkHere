export default (
    state = {
        loginLoader: false,
        loginPayload: {},
        RegisterPayload: {},
        loginResponse: {}
    },
    action
) => {
    switch (action.type) {
        case "NATIVE_LOGIN":
            return { ...state, loginPayload: action.payload, loginType: 'NATIVE_LOGIN' }
        case "NATIVE_REGISTER":
            return { ...state, RegisterPayload: action.payload, loginType: 'NATIVE_REGISTER' }
        case "SET_LOGIN_RESPONSE":
            return { ...state, loginResponse: action.payload }
        case "SHOW_LOGIN_LOADER":
            return { ...state, loginLoader: true }
        case "HIDE_LOGIN_LOADER":
            return { ...state, loginLoader: false }
        default:
            return state;
    }
};
