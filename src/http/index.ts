import service from './service'

const apiP = (url: any, method: any, data: any) => {
  return service({
    url,
    method,
    data,
  })
}

export default apiP
