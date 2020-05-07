import React, { useState, useEffect } from 'react'
import {
  Card,
  Pagination,
  Typography,
  Tooltip,
  Button,
  message,
  Modal,
} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import apiP from '../http'

const { Paragraph } = Typography
const { confirm } = Modal

export default function Finish() {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    apiP('/finishPage', 'POST', {
      page: page,
    }).then((res) => {
      setTodos(res.data.data)
      setMaxPage(res.data.totalCount)
    })
  }, [page])

  return (
    <div className="Finish">
      {todos.map((todo: any) => (
        <Card
          key={todo.todoId}
          title={todo.modifyTime}
          extra={
            <span>
              {' '}
              <Tooltip title="delete">
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    confirm({
                      title: 'Are you sure delete this todo?',
                      icon: <ExclamationCircleOutlined />,
                      content: 'This will delete the todo completely',
                      okText: 'Yes',
                      cancelText: 'No',
                      onOk() {
                        apiP('/delete', 'POST', {
                          todoId: todo.todoId,
                        }).then((res1) => {
                          message.success('This todo has been deleted')
                          apiP('/finishPage', 'POST', {
                            page: page,
                          }).then((res2) => {
                            setTodos(res2.data.data)
                            setMaxPage(res2.data.totalCount)
                          })
                        })
                      },
                      onCancel() {},
                    })
                  }}
                />
              </Tooltip>
            </span>
          }
          className="m-card"
        >
          <Paragraph>{todo.content}</Paragraph>
          <p>--- Founded in：{todo.createTime}</p>
        </Card>
      ))}
      <p className="centerF">
        <span className="centerS">
          {' '}
          <Pagination
            current={page}
            onChange={(page: any) => {
              setPage(parseInt(page))
            }}
            total={maxPage}
          />
        </span>
      </p>
    </div>
  )
}
