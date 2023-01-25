/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React from 'react'
import { useSelector } from "react-redux"
import { useRouter } from 'next/router'

const authPrivate = (Components) => {
  return (props) => {
    const router = useRouter()
    const token = useSelector((state) => state?.auth?.token)
    React.useEffect(()=>{
      if(token) {
        router.replace('/home')
      }
    }, [token])
    if(!token) {
      return <Components {...props} />
    }
  }
}

export default authPrivate
