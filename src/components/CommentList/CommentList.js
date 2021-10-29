import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import RequestService from "../../RequestService/RequestService";
import CommentItem from "../CommentItem/CommentItem";
import "./CommentList.css"

const CommentList = () => {
    const params = useParams();

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        text: '',
        createdAt: '',
        patientId: 0
    })

    useEffect(() => {
        getAllCommentsByPatientId(params.id);
    }, [params.id]);

    function getAllCommentsByPatientId(id) {
        RequestService.readAllCommentsByPatientId(id)
            .then(response => setComments(response.data))
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

    function createCommentHandler(event) {
        event.preventDefault();

        const newComment = {
            ...comment,
            createdAt: new Date().toISOString(),
            patientId: params.id
        }

        RequestService.createComment(newComment)
            .then(response => {
                setComments([...comments, response.data]);
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

    function removeComment(comment) {
        setComments(comments.filter(c => c.id !== comment.id));
    }

    return (
        <div>
            <p className="fs-3 ms-4">Comments:</p>
            <div className="alert alert-secondary pb-0">
                <ul id="comment-list" className="no-list">
                    {
                        comments.map(comment => {
                            return <CommentItem comment={comment} remove={removeComment} key={comment.id}/>
                        })
                    }
                </ul>
            </div>
            <div className="alert alert-secondary">
                <form id="comment-form" className="d-flex form-floating">
                    <textarea className="form-control" id="floatingTextarea" placeholder="Leave a comment here" name="text" value={comment.text}
                            onChange={(e) => setComment({...comment, text: e.target.value})} />
                    <label htmlFor="floatingTextarea">Leave a comment here...</label>
                    <button onClick={createCommentHandler} className="btn btn-success ms-2">Add</button>
                </form>
            </div>

        </div>

    );
};

export default CommentList;