import React, {useEffect, useState} from 'react';
import PatientItem from "../PatientItem/PatientItem";
import RequestService from "../../RequestService/RequestService";
import {useHistory, useParams} from "react-router-dom";
import './PatientList.css';

const PatientList = (props) => {

    const [patients, setPatients] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const params = useParams();

    const router = useHistory();

    useEffect(() => {
        getAllPatients();
    }, [params.id, router.location.pathname]);

    function getAllPatients() {
        RequestService.readAllPatients()
            .then(response => {
                setPatients(response.data)
                if (router.location.pathname === "/") {
                    router.push({ pathname: '/patient/' +  response.data[0].id + '/info'});
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request.url);
                } else {
                    console.log("Unknown error!");
                }
            });
    }

    function addNewPatientHandler() {
        router.push({ pathname: '/patient/create' });
    }

    return (
        <div>
            <div className="d-inline-flex my-4 mx-2">
                <input type="search"  placeholder="Search..." value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                       className="form-control" id="patient-search-field"/>
                <button onClick={addNewPatientHandler} className="btn btn-success ms-2" id="patient-create-bnt">New Patient</button>
            </div>
            <ul className="no-list mx-3">
                {
                    patients
                        .filter(patient => searchValue === ''
                            || patient.firstName.includes(searchValue)
                            || patient.lastName.includes(searchValue))
                        .map(patient => {
                        return <PatientItem patient={patient} key={patient.id}/>
                    })
                }
            </ul>
        </div>
    );
};

export default PatientList;