import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Card, Avatar, Icon } from 'antd'
import Axios from 'axios'
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;


function SubscriptionPage() {
    const [Video, setVideo] = useState([])

    useEffect(() => {
        const variables = {
            userFrom: localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos', variables).then(res => {
            if (res.data.success) {
                console.log('subscribedVideos', res.data);
                setVideo(res.data.videos)

            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, [])

    const renderCards = Video.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col key={index} lg={6} md={8} xs={24}>

            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>

            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description="" />
            <span>{video.writer.name}</span><br />
            <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createAt).format("MMM Do YY")}</span>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommended</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default SubscriptionPage
