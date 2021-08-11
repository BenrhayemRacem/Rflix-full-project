import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {HashRouter  , Switch, Route} from "react-router-dom";
import {Home} from "../../pages/home/Home";
import {Login} from "../../pages/login/Login";
import {Register} from "../../pages/register/Register";
import {SingleMovie} from "../../pages/singleMovie/SingleMovie";
import {Navbars} from "../navbar/Navbar";
import {Explore} from "../../pages/explore/Explore";


function App() {



    return (
        <>

<HashRouter>
    <Navbars/>
    <Switch>
        <Route exact path ="/">
            <Home/>
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path ="/register">
            <Register/>
        </Route>
        <Route path="/explore">
            <Explore/>
        </Route>
        <Route path="/movie/:id">
            <SingleMovie/>
        </Route>
    </Switch>
</HashRouter>
        </>

    );
}

export default App;
