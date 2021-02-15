import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentCount, setChildCommentCount] = useState(0);
    useEffect(() => {
        let commentCount = 0;
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentCount++
            }
            setChildCommentCount(commentCount)
        })
    }, [])


    const renderReplyComment = (parentCommentId) => {
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={props.videoId} />
                        <ReplyComment commentLists={props.comments} postId={props.videoId} parentCommentId={comment._id} />
                    </div>

                }
            </React.Fragment>
        ))
    }

    return (
        <div>

            {ChildCommentCount > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}>
                    View {ChildCommentCount} more coment(s)
               </p>
            }
            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
