import React from 'react'
import { useSelector } from "react-redux"
import { useRouter } from 'next/router'

const withAuth = (Components) => {
  return (props) => {
    const router = useRouter()
    const token = useSelector((state) => state?.auth?.token?.token)
    React.useEffect(()=>{
      if(!token) {
        router.replace('/login')
      }
    }, [token])
    if(token) {
      return <Components {...props} />
    }
  }
}

export default withAuth
