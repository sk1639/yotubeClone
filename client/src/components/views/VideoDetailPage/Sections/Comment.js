import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from '../Sections/SingleComment'
import ReplyComment from '../Sections/ReplyComment'

function Comment(props) {
    const user = useSelector(state => state.user)
    const videoId = props.videoId
    const [commentValue, setcommentValue] = useState('')



    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value);

    }

    const onSubmit = (e) => {
        e.preventDefault();

        const commentVariables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId,
        }

        Axios.post('/api/comment/saveComment', commentVariables).then((res) => {
            if (res.data.success) {
                console.log('savecomment', res.data)
                props.refreshFunction(res.data.result)
                setcommentValue('');
            } else {
                alert('코멘트 저장에 실패했습니다.')
            }
        })



    }
    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />
            {/* Comments List */}

            {props.comments && props.comments.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={videoId} />
                        <ReplyComment parentCommentId={comment._id} commentLists={props.comments} postId={videoId} />
                    </React.Fragment>
                )
            ))}




            {/* Root Comments List */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
