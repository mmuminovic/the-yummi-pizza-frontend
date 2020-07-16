import React from 'react'
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import Homepage from './pages/Homepage'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/orders" component={() => <p>Orders</p>} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
