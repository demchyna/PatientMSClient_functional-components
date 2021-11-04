import {createContext, useMemo, useState} from "react";
import RequestService from "../services/RequestService";
import {useHistory} from "react-router-dom";

const PatientsContext = createContext();

function PatientsProvider(props) {
    const [patients, setPatients] = useState([])
    const [isLoad, setLoad] = useState(false);
    const router = useHistory();

    const patientsCache = useMemo(() => {
        if (!isLoad) {
            RequestService.readAllPatients()
                .then(response => {
                    setPatients(response.data)
                    setLoad(true);
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
        return [patients, setPatients];
    }, [isLoad, patients, router]);

    return <PatientsContext.Provider value={patientsCache} {...props} />
}

export {PatientsProvider, PatientsContext}