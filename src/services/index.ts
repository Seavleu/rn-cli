import { getToken } from '@/utils/storage'
import axios, { AxiosInstance } from 'axios'

const _axiosConfig = {
  baseURL: 'https://api.sunq.co.kr',
  timeout: 10000
}

const axiosInstance: AxiosInstance = axios.create(_axiosConfig)

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) {
      config.headers['Authorization'] = token
    }

    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data)

export const post = (url: string, { arg }: { arg: any }) =>
  axiosInstance.post(url, arg).then((res) => res.data)

export const upload = (url: string, { arg }: { arg: any }) =>
  axiosInstance
    .post(url, arg, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => res.data)

export const put = (url: string, { arg }: { arg: any }) =>
  axiosInstance.put(url, arg).then((res) => res.data)

export const del = (url: string, { arg }: { arg: any }) =>
  axiosInstance.delete(url, { params: arg }).then((res) => res.data)
