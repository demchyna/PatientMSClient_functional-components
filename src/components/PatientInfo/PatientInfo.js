import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import RequestService from "../../RequestService/RequestService";
import CommentList from "../CommentList/CommentList";

const PatientInfo = (props) => {

    const [patient, setPatient] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        birthday: '',
        gender: '',
        country: '',
        state: '',
        address: ''
    });

    const params = useParams();

    useEffect(() => {
        RequestService.readPatientById(params.id)
            .then(response => setPatient(response.data))
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request.url);
                } else {
                    console.log("Unknown error!");
                }
            });
    }, [params.id]);

    const router = useHistory();

    function editPatientHandler() {
        router.push({ pathname: '/patient/' + patient.id + '/update' });
    }

    function deletePatientHandler() {
        RequestService.deletePatient(params.id)
            .then(response => router.push({ pathname: '/'}))
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

    function getYearsOld(birthday) {
        let ageDiffInMs = Date.now() - new Date(birthday);
        let ageDate = new Date(ageDiffInMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <div className="row my-4">
            <div className="col-xxl-4 col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12 pe-4">
                <div>
                    <div className="d-flex justify-content-between mx-4">
                        <span className="fs-3">{patient.firstName} {patient.lastName}</span>
                        <span className="fs-5 mt-1">{getYearsOld(patient.birthday)} years old</span>
                    </div>
                    {/*<hr/>*/}

                    <div className="alert alert-secondary mt-3">
                        <div className="alert alert-light d-flex fs-5">
                            <ul className="no-list pe-3 mb-1">
                                <li>Date of Birth:</li>
                                <li>Sex:</li>
                                <li>Country:</li>
                                <li>State:</li>
                                <li>Address:</li>
                            </ul>
                            <ul className="no-list fst-italic pe-3 mb-1">
                                <li>{new Date(patient.birthday).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                <li className="text-lowercase">{patient.gender}</li>
                                <li>{patient.country}</li>
                                <li>{patient.state}</li>
                                <li>{patient.address}</li>
                            </ul>
                        </div>
                        {/*<hr/>*/}
                        <div className="mt-4">
                            <button onClick={editPatientHandler} className="btn btn-primary w-25 me-3">Edit</button>
                            <button onClick={deletePatientHandler} className="btn btn-danger w-25">Delete</button>
                        </div>
                    </div>


                </div>
            </div>
            <div className="col-xxl-8 col-xl-7 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <CommentList />
            </div>
        </div>
    );
}

export default PatientInfo;