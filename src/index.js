import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import store from './store'
import './index.css'
import './styles/styles.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = 'http://localhost:8080'

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
