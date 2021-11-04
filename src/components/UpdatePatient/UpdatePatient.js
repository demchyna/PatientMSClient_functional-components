import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import RequestService from "../../services/RequestService";
import {PatientsContext} from "../../contexts/ParientsContext";

const UpdatePatient = (props) => {

    const [patients, setPatients] = useContext(PatientsContext);
    const params = useParams();
    const [patient, setPatient] = useState(patients.find(p => p.id === Number(params.id)));
    const router = useHistory();

    function updatePatientHandler(event) {
        event.preventDefault();
        RequestService.updatePatient(patient)
            .then(response => {
                patients[patients.findIndex(p => p.id === patient.id)] = patient;
                setPatients(patients);
                router.push({ pathname: '/patient/' +  response.data.id + '/info'});
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

    function cancelPatientHandler() {
        router.push({ pathname: '/patient/' +  patient.id + '/info'});
    }

    return (
        <div className="row mt-4 mx-5">
            <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-12 col-sm-12 col-xs-12">
                <p className="fs-3">{patient.firstName} {patient.lastName}</p>
                <hr/>
                <form >
                    <label htmlFor="first-name" className="form-label">First Name:</label>
                    <input id="first-name" name="first-name" type="text" className="form-control" value={patient.firstName}
                           onChange={(e) => setPatient({...patient,  firstName: e.target.value})} required /><br/>

                    <label htmlFor="last-name" className="form-label">Last Name:</label>
                    <input id="last-name" name="last-name" type="text" className="form-control" value={patient.lastName}
                           onChange={(e) => setPatient({...patient,  lastName: e.target.value})} required /><br/>

                    <label htmlFor="birthday" className="form-label">Date of Birth:</label>
                    <input id="birthday" name="birthday" type="date" className="form-control" value={patient.birthday}
                           onChange={(e) => setPatient({...patient,  birthday: e.target.value})} required /><br/>

                    <label htmlFor="gender" className="form-label">Sex:</label>
                    <select id="gender" name="gender" className="form-control"  value={patient.gender}
                            onChange={(e) => setPatient({...patient,  gender: e.target.value})}>
                        <option disabled value="">Select sex...</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select><br/>

                    <label htmlFor="country" className="form-label">Country:</label>
                    <input id="country" name="country" type="text" className="form-control" value={patient.country}
                           onChange={(e) => setPatient({...patient,  country: e.target.value})} required /><br/>

                    <label htmlFor="state" className="form-label">State:</label>
                    <input id="state" name="state" type="text" className="form-control" value={patient.state}
                           onChange={(e) => setPatient({...patient,  state: e.target.value})} required /><br/>

                    <label htmlFor="address" className="form-label">Address:</label>
                    <input id="address" name="address" type="text" className="form-control" value={patient.address}
                           onChange={(e) => setPatient({...patient,  address: e.target.value})}required /><br/>

                    <button className="btn btn-primary w-25" onClick={updatePatientHandler}>Update</button>
                    <button className="btn btn-warning w-25 ms-3" onClick={cancelPatientHandler}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePatient;