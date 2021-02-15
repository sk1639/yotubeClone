import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios'

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }

    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }



    useEffect(() => {

        //좋아요 정보
        Axios.post('/api/like/getLiked', variable).then(res => {
            if (res.data.success) {
                console.log('Likes', res.data)
                // 좋아요 갯수
                setLikes(res.data.likes.length);
                // 내가 눌럿는가
                res.data.likes.map(like => {
                    if (like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert("Like 정보를 가져오지 못했습니다.")
            }
        })

        //싫어요 정보
        Axios.post('/api/like/getDisliked', variable).then(res => {
            if (res.data.success) {
                console.log('Dislikes', res.data)
                // 싫어요 갯수
                setDislikes(res.data.dislikes.length);
                // 내가 눌럿는가
                res.data.dislikes.map(dislike => {
                    if (dislike.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert("Dislike 정보를 가져오지 못했습니다.")
            }
        })



    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable).then(res => {
                if (res.data.success) {
                    setLikes(Likes + 1)
                    setLikeAction('liked')
                    if (DislikeAction !== null) {
                        setDislikeAction(null)
                        setDislikes(Dislikes - 1)
                    }
                } else {
                    alert("좋아요 실패")
                }
            })
        } else {
            Axios.post('/api/like/unLike', variable).then(res => {
                if (res.data.success) {
                    setLikes(Likes - 1)
                    setLikeAction(null)
                } else {
                    alert("좋아요 실패")
                }
            })
        }
    }

    const onDislike = () => {
        if (DislikeAction !== null) {
            Axios.post('/api/like/unDislike', variable).then(res => {
                if (res.data.success) {
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)

                } else {
                    alert("dislike 실패")
                }
            })


        } else {
            Axios.post('/api/like/upDislike', variable).then(res => {
                if (res.data.success) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')
                    if (LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                } else {
                    alert("좋아요 실패")
                }
            })

        }
    }



    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>

            <span key="commet-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? "filled" : "outlined"}
                        onClick={onDislike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
