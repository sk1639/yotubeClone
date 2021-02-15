import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import SideVideo from './Sections/SideVideo'
import Axios from 'axios'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'


function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable).then(res => {
            if (res.data.success) {
                console.log(res.data);
                setVideoDetail(res.data.videoDetail)
            } else {
                alert("비디오 정보 가져오기 실패")
            }
        })

        Axios.post('/api/comment/getComment', variable).then(res => {
            if (res.data.success) {
                console.log('getComments', res.data)
                setComments(res.data.comments)
            } else {
                alert('코멘트 정보를 가져오기 실패')
            }
        })

    }, [])

    const refreshFunction = (newComents) => {
        setComments(Comments.concat(newComents))
    }


    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                        <List.Item actions={[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, subscribeButton]}>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description} />
                        </List.Item>

                        {/* comments */}
                        <Comment refreshFunction={refreshFunction} postId={videoId} comments={Comments} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )

    } else {
        return (
            <div>...Loading</div>
        )
    }

}

export default VideoDetailPage
