import React, {useState} from 'react';
import RequestService from "../../services/RequestService";
import "./CommentItem.css"

const CommentItem = ({comment, remove, ...props}) => {

    const [isVisible, setVisible] = useState(true);
    const [newComment, setNewComment] = useState(comment);

    function editCommentHandler() {
        setVisible(false);
    }

    function saveCommentHandler() {
        setVisible(true);
        console.log(comment);

        RequestService.updateComment(newComment)
            .then(response => setNewComment(response.data))
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

    function deleteCommentHandler() {
        RequestService.deleteComment(newComment.id)
            .then(response => {
                remove(newComment);
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

    function cancelCommentHandler() {
        setNewComment(newComment)
        setVisible(true);
    }

    return (
        <li className="alert alert-light d-flex justify-content-between">
            <div id="comment-item" className="flex-grow-1">
                {
                    isVisible
                        ? <div>
                            <time className="fs-5">{new Date(comment.createdAt).toLocaleDateString("en-US",
                                {hour12: false, year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </time>
                            <p className="pt-2 mb-0">{newComment.text}</p>
                        </div>
                        : <div>
                            <time className="fs-5">{new Date(comment.createdAt).toLocaleDateString("en-US",
                                {hour12: false, year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </time><br/>
                            <textarea className="form-control mt-2" value={newComment.text}
                                      onChange={(e) => {setNewComment({...newComment, text: e.target.value})}} />
                        </div>
                }
            </div>
            <div id="comment-btn">
                {
                    isVisible
                        ? <div>
                              <button onClick={editCommentHandler} className="btn btn-primary btn-sm ms-3">Edit</button>
                              <button onClick={deleteCommentHandler} className="btn btn-danger btn-sm ms-1">Delete</button>
                          </div>
                        : <div>
                              <button onClick={saveCommentHandler} className="btn btn-success btn-sm ms-3">Save</button>
                              <button onClick={cancelCommentHandler} className="btn btn-warning btn-sm ms-1">Cancel</button>
                          </div>
                }
            </div>
        </li>
    );
};

export default CommentItem;