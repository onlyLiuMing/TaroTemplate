import Request from '../../utils/request'
const apiRequest = new Request('index');

export const testApi = (data)=>{
  return apiRequest.query({})
}
