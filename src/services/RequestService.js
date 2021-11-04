import axios from "axios";

export default class RequestService {
    static async readAllPatients() {
        return await axios.get('https://patient-webapi.herokuapp.com/patients/');
    }

    static async readPatientById(id) {
        return await axios.get('https://patient-webapi.herokuapp.com/patients/' + id);
    }

    static async createPatient(patient) {
        return await axios.post('https://patient-webapi.herokuapp.com/patients/', patient, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async readAllCommentsByPatientId(id) {
        return await axios.get('https://patient-webapi.herokuapp.com/comments/patients/' + id);
    }

    static async updatePatient(patient) {
        return await axios.put('https://patient-webapi.herokuapp.com/patients/', patient, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async deletePatient(id) {
        return await axios.delete('https://patient-webapi.herokuapp.com/patients/' + id);
    }

    static async createComment(comment) {
        return await axios.post('https://patient-webapi.herokuapp.com/comments/', comment, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async updateComment(comment) {
        return await axios.put('https://patient-webapi.herokuapp.com/comments/', comment, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async deleteComment(id) {
        return await axios.delete('https://patient-webapi.herokuapp.com/comments/' + id);
    }
}