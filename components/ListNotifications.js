import React from 'react'
import { ArrowDown, ArrowUp } from 'react-feather'
import http from '../helper/http'
import { useSelector } from 'react-redux'
import { Oval } from  'react-loader-spinner'

const ListNotifications = () =>{
  const token = useSelector((state) => state?.auth?.token)

  // Get List Transaction
  const [notifications, setNotifications] = React.useState([])
  React.useEffect(() => {
    getNotifications()
  }, [])
  const getNotifications = async () => {
    try {
      const response = await http(token).get('/transactions/notification?page=1&limit=5')
      console.log(response?.data?.results?.length)
      setNotifications(response?.data)
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <>
     {!notifications?.results && <div className='w-32 flex justify-center'>
        <Oval
          height={25}
          wdivth={25}
          color="#FF5F00"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#fACEB6"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
      </div>}
      {notifications?.results?.length &&
      <div className='flex flex-col gap-3'>
        {notifications?.results?.map((notification, index) => {
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
          })
        }
      </div>}
      {notifications?.results?.length < 1 &&
      <div className='w-32'>
        <p className='text-center'>No results</p>
      </div>}
    </>
  )
}

export default ListNotifications
