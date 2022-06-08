import React, { useState, useEffect } from 'react'
import {
    Button,
    Form,
    Input,
    notification,
    InputNumber,
    Spin,
    PageHeader
} from 'antd'
import {
    UploadOutlined,
    CloseCircleOutlined
} from "@ant-design/icons"
import { Routes, Route, Link, useNavigate } from "react-router-dom"


import * as actions from '../../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse, selectCreateState, selectUpdateState } from '../../../Store/Selectors/course'

const { TextArea } = Input

const CUCourse = ({ createCourse, selectDetailCourse, selectUpdateState, selectCreateState, updateCourse }) => {
    const [formModal] = Form.useForm()
    const [avatar, setAvatar] = useState()
    const [fileImg, setFileImg] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])
    useEffect(() => {
        if (selectCreateState) {
            formModal.resetFields()
        }
        if (selectUpdateState) {
            formModal.setFieldsValue({
                title: selectDetailCourse.title,
                description: selectDetailCourse.description,
                benefit: selectDetailCourse.benefit.join('\n'),
                image: selectDetailCourse.image,
                point: selectDetailCourse.point,
                field: selectDetailCourse.field,
            })
        }
    }, [selectUpdateState, selectCreateState])
    const onFinish = async (values) => {
        setLoading(true)
        if (selectCreateState) {

            const rep=await createCourse(values)
            if(rep.success){
                setLoading(false)
                handleCancel()
            }
        }
        if (selectUpdateState) {
            const newCourse = {
                _id: selectDetailCourse._id,
                data: values
            }
            const rep=await updateCourse(newCourse)
            if(rep.success){
                setLoading(false)
                handleCancel()
            }
        }
       
    }
    const handleCancel = () => navigate('/admin/course')
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = ""
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                baseURL = reader.result
                resolve(baseURL)
            }
        })
    }
    const handleFileInputChange = e => {
        const file = e.target.files[0]
        setFileImg(file)
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
        getBase64(e.target.files[0])
            .then(result => {
                formModal.setFieldsValue({
                    image: result
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    const [loading, setLoading] = useState(false)
    return (
        <div className='cuCourse'>
            <PageHeader
                    onBack={() =>navigate('/admin/course') }
                    title="Quay lại"
                    style={{
                        padding:'10px 0 '
                    }}
                >
                </PageHeader>

            {
                loading && (
                    <div className="loadingSpin">
                        <Spin size='large' />
                    </div>
                )
            }
            <Form
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={formModal}
            >
                <Form.Item
                    label='Tiêu đề'
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhậ tiêu đề!' }]}
                >
                    <Input size="large" placeholder="Tiêu đề" />
                </Form.Item>
                <Form.Item
                    label='Mô tả'
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input size="large" placeholder="Mô tả" />
                </Form.Item>
                <Form.Item
                    label='Điểm'
                    name="point"
                    rules={[{ required: true, message: 'Vui lòng nhập điểm!', type: 'number' }]}
                >
                    <InputNumber size="large" placeholder="Điểm" />
                </Form.Item>
                <Form.Item
                    label='Lĩnh vực'
                    name="field"
                    rules={[{ required: true, message: 'Vui lòng nhập lĩnh vực!' }]}
                >
                    <Input size="large" placeholder="Lĩnh vực" />
                </Form.Item>
                <Form.Item
                    label='Lợi ích'
                    name="benefit"
                    rules={[{ required: true, message: 'Vui lòng nhập lợi ích!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Tải lên">
                    <Input type="file" name="file" id="file" onChange={(e) => handleFileInputChange(e)} hidden />
                    <label htmlFor="file" style={{ border: '1px solid #dddddd', padding: '5px', cursor: 'pointer' }}>
                        <UploadOutlined />
                        Upload Image
                    </label>
                </Form.Item>
                <Form.Item
                    label='Url hình ảnh'
                    name="image"
                    rules={[{ required: true, message: 'Chưa có url!' }]}
                >
                    <Input disabled size="large" placeholder="Url hình ảnh" />
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset: 3,
                    span: 20,
                }}>
                    {avatar && <img src={avatar.preview} alt="" width="300px" />}
                    {
                        !selectCreateState && <img src={selectDetailCourse.image} alt="" width="300px" />
                    }
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 3,
                        span: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" >
                        {
                            (selectCreateState) ? 'Tạo' : "Cập nhật"
                        }
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectDetailCourse,
    selectCreateState,
    selectUpdateState
})
const mapDispatchToProps = (dispatch) => ({
    createCourse: (payload) => actions.createCourse(dispatch)(payload),
    updateCourse: (payload) => actions.updateCourseRequest(dispatch)(payload)

})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(CUCourse)