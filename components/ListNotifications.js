import React from 'react'
import { ArrowDown, ArrowUp } from 'react-feather'
import http from '../helper/http'
import { useSelector } from 'react-redux'

const ListNotifications = () =>{
  const token = useSelector((state) => state?.auth?.token?.token)

  // Get List Transaction
  const [notifications, setNotifications] = React.useState([])
  React.useEffect(() => {
    getNotifications()
  }, [])
  const getNotifications = async () => {
    try {
      const response = await http(token).get('/transactions/notification?page=1&limit=5')
      setNotifications(response?.data?.results)
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <>
      {notifications?.map((notification, index) => {
        return(
          <div key={Number(index)} className='flex gap-3 bg-white shadow rounded py-3 pl-3 pr-10'>
            <div>
              {notification.type === 'CREDIT' ? <ArrowDown className='text-green-500'/> : <ArrowUp className='text-red-500'/>}
            </div>
            <div className='flex-1'>
              <p className=''>{notification.notes}</p>
              <p className='font-bold'>Rp{new Intl.NumberFormat('en-DE').format(notification.amount)}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ListNotifications
