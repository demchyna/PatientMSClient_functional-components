import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./PatientItem.css"

const PatientItem = ({patient, ...props}) => {

    const [active, setActive] = useState("");

    return (
        <li id="patient-item" className="alert alert-secondary">
            <Link to={'/patient/' + patient.id + '/info'} >
                <div className="d-flex justify-content-between">
                    <div>
                        <span className="fs-4">{patient.firstName} {patient.lastName}</span><br/>
                        <time>{new Date(patient.birthday).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <i className={`fa fa-${patient.gender.toLowerCase()} fa-2x mt-3`} aria-hidden="true" />
                </div>

            </Link>
        </li>
    );
};

export default PatientItem;