import React from "react";
// import axios from 'axios'

const CommentList = (props) => {
    const {postId, comments} = props
    // const [comments, setComments] =useState([])

    // const fetchData = async () =>{
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    // useEffect(()=>{
    //     fetchData()
    // },[])

    const renderedComments = comments.map(comment => {
        let content
        switch (comment.status) {
            case 'pending':
                content = "This comment is awaiting moderation"
                break;
            case 'rejected':
                content = "This comment has been rejected"
                 break;
            default:
                content = comment.content;
                break;
        }
        // if (comment.status === 'approved'){
        //     content = comment.content;
        // }
        // if (comment.status === 'pending'){
        //     content = "This comment is awaiting moderation"
        // }
        // if (comment.status === 'rejected') {
        //     content = 'This comment has been rejected'
        // }
        return <li key={comment.id}>{content}</li>
    })
    return (
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList