import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import Login from './views/Login/Login';
import PostList from './views/Posts/PostsList';
import PostDetails from './views/Posts/PostDetails';
import PostAdd from './views/Posts/AddPost';
import SeriesList from './views/Series/SeriesList';
import SeriesDetails from './views/Series/SeriesDetails';
import CategoryDetails from './views/Category/CategoryDetails';
import MainNav from './views/MainNav';
import HomePage from './views/HomePage';
import MainFooter from './views/MainFooter';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import ApiService from "./services/api.service";
import {TokenService} from "./services/token.service";
import UserProfile from './views/UserProfile/UserProfile';
import Register from './views/Register/Register';
ApiService.init(process.env.REACT_APP_API_URL);
if(TokenService.getToken()){
    ApiService.setHeader();
}

function App () {
    let isLoggedin = !!TokenService.getToken();
    return(
        <div>
            <Router>
                <MainNav/>

                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/posts/">
                        <PostList />
                    </Route>
                    <Route path="/posts/:slug">
                        <PostDetails />
                    </Route>

                    {!isLoggedin ? <Redirect to="/posts/" /> :
                        <Route exact path="/post/add">
                            <PostAdd />
                        </Route>
                    }
                    <Route path="/category/:slug">
                        <CategoryDetails />
                    </Route>
                    <Route exact path="/series/">
                        <SeriesList />
                    </Route>
                    <Route path="/series/:slug">
                        <SeriesDetails />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/Register">
                        <Register />
                    </Route>

                    <Route exact path="/profile">
                        <UserProfile />
                    </Route>

                </Switch>

                <MainFooter/>
            </Router>
            
        </div>
    );
}

// ========================================

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
