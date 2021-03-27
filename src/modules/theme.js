const initialState = {
  collapsed: false,
  navTheme: 'dark',
  isMobile: false,
  maxSideMenuWidth: 280,
  minSideMenuWidth: 280,
  navBarHeight: 75,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_SIDEBAR_COLLAPSED':
      return {
        ...state,
        collapsed: !state.collapsed
      }
    case 'SET_MOBILE':
      return {
        ...state,
        isMobile: action.payload
      }

    default:
      return state
  }
}
