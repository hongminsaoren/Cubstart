import React, {useState} from "react";
import {Link} from "react-router-dom";

import Comment from "../components/Comment";
import "./App.css";

const post = {
    title: "Me at the beach :)",
    author: "Ddoski_123",
    image: "/assets/ddoskiBeach.jpeg",
    imageAlt: "post about beach"
}

function App() {
    const [inputValue, setInputValue] = useState(""); // currently typed text in the comment box
    const [comments, setComments] = useState([]);

    const addComment = () => {
        // If there's nothing in the comment box, don't do anything!
        if (inputValue === "") return;

        // We are using the spread syntax (...) to "expand" the comments array into
        // a new array that we are creating, with the addition of the new comment
        // See more at: https://www.w3schools.com/react/react_es6_spread.asp (if interested)
        const newComments = [...comments, inputValue];

        /* Task 2a: Update our state with the new comments array, and clear the comment input box. */
        /* YOUR CODE HERE */
        setComments(newComments)
    };

    return (
        <div className="App">
            <h3 className="App_postTitle">{post.title}</h3>
            <h4 className="App_author">{post.author}</h4>
            <img className="App_image" src={post.image} alt={post.imageAlt}/>

            <div className="App_commentsHeader">{comments.length || "No"} comment(s)</div>

            {comments.map((comment, index) => {
                /* Task 3: Use the <Comment> component to render each comment */
                /* YOUR CODE HERE */
                return <Comment key={index} text={comment}/>
            })}

            <input
                className="App_input"
                placeholder="Write a comment here..."
                value={inputValue}
                onChange={(event) => {
                    const newValue = event.target.value; // what the user has typed

                    /* Task 1: Fix input to make it so that we can type comments */
                    /* YOUR CODE HERE */
                    setInputValue(newValue)
                }}
            />

            <div>
                <button
                    className="App_primaryButton"
                    /* Task 2b: Use the function addComment() to make this button work */
                    /* YOUR CODE HERE */
                    onClick={addComment}
                >
                    Add Comment!
                </button>
            </div>

            <div>
                <Link to="/profile">
                    <button className="App_secondaryButton">Go To My Profile</button>
                </Link>
            </div>
        </div>
    );
}

export default App;
