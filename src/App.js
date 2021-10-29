import React from "react";
import PatientList from "./components/PatientList/PatientList";
import CreatePatient from "./components/CreatePatient/CreatePatient";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import PatientInfo from "./components/PatientInfo/PatientInfo";
import UpdatePatient from "./components/UpdatePatient/UpdatePatient";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {

    return (
        <div className="container-fluid px-xxl-5 px-xl-5 px-lg-4 px-md-3 pt-4">
            <div className="row">
                <BrowserRouter>
                    <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-5 col-sm-12 col-xs-12">
                        <Route exact path={[
                            '/',
                            '/patient/create',
                            '/patient/:id/update',
                            '/patient/:id/info'
                        ]} component={ PatientList } />
                    </div>
                    <Switch>
                        <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-7 col-sm-12 col-xs-12">
                            <Route exact path='/patient/:id/info' component={ PatientInfo } />
                            <Route exact path='/patient/create' component={ CreatePatient } />
                            <Route exact path='/patient/:id/update' component={ UpdatePatient } />
                            <Redirect to="/" />
                        </div>
                    </Switch>

                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
