import {request} from '@/utils/request'

/**
 * 接口请求
 */
export function apiTest() {
  return request({
    url: '/meeting/rooms/roomstorage',
    method: 'GET'
  })
}
