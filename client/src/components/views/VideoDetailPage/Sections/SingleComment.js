import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import Axios from 'axios';
import { useSelector } from 'react-redux'
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        const commentVariables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', commentVariables).then((res) => {
            if (res.data.success) {
                console.log('savecomment1', res.data)
                props.refreshFunction(res.data.result)
                setCommentValue('');
            } else {
                alert('코멘트 저장에 실패했습니다.')
            }
        })
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                content={<p> {props.comment.content}</p>}
                avatar={<Avatar src={props.comment.writer.image} />}
            />
            {OpenReply && <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>}

        </div>
    )
}

export default SingleComment
