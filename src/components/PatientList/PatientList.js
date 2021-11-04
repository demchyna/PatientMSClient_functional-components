import React, {useContext, useState} from 'react';
import PatientItem from "../PatientItem/PatientItem";
import {useHistory} from "react-router-dom";
import './PatientList.css';
import {PatientsContext, usePatients} from "../../contexts/ParientsContext";

const PatientList = (props) => {

    const [patients] = useContext(PatientsContext);
    const [searchValue, setSearchValue] = useState('');
    const router = useHistory();

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
                        .filter(patient => searchValue.toLowerCase() === ''
                            || patient.firstName.toLowerCase().includes(searchValue)
                            || patient.lastName.toLowerCase().includes(searchValue))
                        .map(patient => {
                        return <PatientItem patient={patient} key={patient.id}/>
                    })
                }
            </ul>
        </div>
    );
};

export default PatientList;