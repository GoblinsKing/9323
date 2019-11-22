import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ResetGlobalstyle } from './style.js';
import { IconGlobalstyle } from './statics/iconfont/iconfont.js';
import store from './store/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Course from './pages/Course';
import Login from './pages/Login';
import Search from './pages/Search';
import Detail from './pages/Detail';
import More from './pages/More';


class App extends Component {

	render() {

		return (
            <Fragment>
                <ResetGlobalstyle />
                <IconGlobalstyle />
                <Provider store={store}>
                    <Fragment>
                        <BrowserRouter> 
                            <Fragment>
                                <Header />
                                <Switch>
                                    <Route path='/login'  exact component={Login}></Route>
                                    <Route path='/search'  exact component={Search}></Route>
                                    <Route path='/' exact component={Home}></Route>
                                    <Route path='/:id' exact component={Course}></Route>
                                    <Route path='/:id/:detail' exact component={Detail}></Route>
                                    <Route path='/:id/:detail/:more' exact component={More}></Route>
                                </Switch>
                                <Footer />
                            </Fragment>
                        </BrowserRouter>
                    </Fragment>
                </Provider>
            </Fragment>
		)
    }  
}


export default App;


