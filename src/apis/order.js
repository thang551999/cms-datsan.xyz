import request from '@/utils/request'

export function getOrderOwner() {
  return request.get('owner/order')
}

export function getReportOwner() {
  return request.get('admin/order/report-order')
}

export function getOrderAdmin() {
  return request.get('admin/order')
}
