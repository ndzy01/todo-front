import React, { useState, useEffect } from 'react'
import { Button, Card, Tooltip, Pagination, message, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import apiP from '../http'

const { Paragraph } = Typography

export default function Home() {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    apiP('/page', 'POST', {
      page: page,
    }).then((res) => {
      setTodos(res.data.data)
      setMaxPage(parseInt(res.data.totalCount))
    })
  }, [page])

  return (
    <div className="Home">
      {todos.map((todo: any) => (
        <Card
          key={todo.todoId}
          title={todo.createTime}
          extra={
            <span>
              {' '}
              <Tooltip title="finish">
                <Button
                  shape="circle"
                  icon={<CheckOutlined />}
                  onClick={() =>
                    apiP('/finish', 'POST', {
                      todoId: todo.todoId,
                    }).then((res1) => {
                      message.success('Congratulations on completing a todo')
                      apiP('/page', 'POST', {
                        page: page,
                      }).then((res2) => {
                        setTodos(res2.data.data)
                        setMaxPage(res2.data.totalCount)
                      })
                    })
                  }
                />
              </Tooltip>
            </span>
          }
          className="m-card"
        >
          <Paragraph
            editable={{
              onChange: (str) => {
                apiP('/edit', 'POST', {
                  todoId: todo.todoId,
                  content: str,
                }).then((res1) => {
                  message.success('Todo was successfully edited')
                  apiP('/page', 'POST', {
                    page: page,
                  }).then((res2) => {
                    setTodos(res2.data.data)
                    setMaxPage(res2.data.totalCount)
                  })
                })
              },
            }}
          >
            {todo.content}
          </Paragraph>
          <p>--- Last modified time：{todo.modifyTime}</p>
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
