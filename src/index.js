import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Store, { history } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import * as serviceWorker from './serviceWorker';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { ReduxProvider } from './layouts/context';
import { SnackbarProvider } from 'notistack';
import Colors from './utils/color'
const { store, persistor } = Store()
const target = document.getElementById('root')


const Root = (props) => {
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width:800px)');

  useEffect(() => {
    dispatch({ type: 'SET_MOBILE', payload: isMobile })

  }, [isMobile])
  const redux = useSelector(state => state.theme)

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: Colors.primaryColorMain,
        dark: Colors.siderMenuColor
      },
      secondary: {
        main: Colors.containerBackground
      },
      success: {
        main: '#15a28d'
      },
      error: {
        main: '#fe496d'
      },
      warning: {
        main: '#eac301'
      },
      info: {
        main: '#146eb5'
      },
      base: {
        main: Colors.siderMenuColor
      }
    },
    typography: {
      fontFamily: `"Poppins", "sans-serif"`,
      fontWeightLight: 200,
      fontWeightRegular: 200,
      fontWeightMedium: 200,
      h3: {
        fontSize: '32px'
      },
      h4: {
        fontSize: '28px'
      },
      h5: {
        fontSize: '24px'
      },
      h6: {
        fontSize: '18px'
      },
      subtitle2: {
        fontSize: '16px'
      },
      caption: {
        fontSize: '12px'
      }
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: Colors.siderMenuColor
        }
      },
      MuiSelect: {
        select: {
          "&:focus": {
            backgroundColor: 'unset'
          }
        }
      },
      MuiListItemIcon: {
        root: {
          minWidth: '30px',
          margin: '0 10px 0 0'
        }
      },
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: "jjnkj",
            boxShadow: '0 0 5px -1px #000'
          }
        }
      },
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          color: "#828282"
        }
      },
      MuiList: {
        padding: {
          paddingTop: 0,
          paddingBottom: 0
        }
      },
      MuiTableContainer: {
        root: {
          position: 'relative',
          zIndex: 0
        }
      },
      MuiFormControl: {
        root: {
          width: '100%'
        }
      },
      MuiTypography: {
        body1: {
          whiteSpace: 'break-spaces'
        }
      },
      MuiCard: {
        root: {
          overflow: 'unset'
        }
      },
      MuiInputBase: {
        input: {
          '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
          },
        },
      },
      MuiSkeleton: {
        root:{
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider value={redux}>
        <App />
      </ReduxProvider>
    </ThemeProvider>

  )
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnack={1}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Root />
        </SnackbarProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider >,
  target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();