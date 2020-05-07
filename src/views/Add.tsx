import React from 'react'
import { Button, Input, message, Form } from 'antd'
import apiP from '../http'
import { createHashHistory } from 'history'

const history = createHashHistory()
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 18 },
}
const addFinish = (values: any) => {
  apiP('/save', 'POST', {
    content: values.content,
  }).then((res) => {
    message.success('Todo was successfully added')
    history.push({ pathname: '/' })
  })
}

export default function Add() {
  return (
    <div className="Add">
      <Form {...layout} onFinish={(values) => addFinish(values)}>
        <Form.Item
          label="Add todo"
          name="content"
          rules={[{ required: true, message: 'Please edit the content' }]}
        >
          <Input.TextArea  autoSize={{ minRows: 2, maxRows: 8}}  />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
