import React, { useState, useEffect } from 'react'
import { Card, Pagination, Typography } from 'antd'
import apiP from '../http'

const { Paragraph } = Typography

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
        <Card key={todo.todoId} title={todo.modifyTime} className="m-card">
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
