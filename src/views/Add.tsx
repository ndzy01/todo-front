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

export default function Add() {
  return (
    <div className="Add">
      <Form
        {...layout}
        onFinish={(values) => {
          console.log(values.content)
          apiP('/save', 'POST', {
            content: values.content,
          }).then((res) => {
            message.success('Todo was successfully added')
            history.push({ pathname: '/' })
          })
        }}
      >
        <Form.Item
          label="Add todo"
          name="content"
          rules={[{ required: true, message: 'Please edit the content' }]}
        >
          <Input />
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
