import React from 'react'
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import {User, Mail, Lock, Eye, EyeOff} from 'react-feather'
import { useRouter } from "next/router"
import http from '../helper/http'
import {useDispatch} from 'react-redux'
import { loginUser } from '../redux/reducers/auth'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
import authPrivate from '../components/hoc/authPrivate'
YupPassword(Yup)

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .password()
    .min(8, 'Min length 8')
    .minLowercase(1, 'Lowercase 1')
    .minUppercase(1, 'Uppercase 1')
    .minSymbols(1, 'Symbols 1')
    .minNumbers(1, 'Numbers 1'),
});

const SignUp = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [firstName, setFirstName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [eyePassword, setEyePassword] = React.useState(true)

  const cb = () => {
    router.push('/phone-number')
  }

  const register = async (value) => {
    try {
      const {data} = await http().post('/auth/register', value)
      const token = data?.results?.token
      dispatch(loginUser({token}))
      cb()
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <>
    <Head>
      <title>Sign Up | LetsPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="relative hidden md:block flex-[55%] bg-primary h-screen px-28 py-5">
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-0 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="1" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-3 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="0.5" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <h1 className="relative font-bold text-4xl text-white mb-10">LetsPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='relative w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">LetsPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in LetsPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="relative flex-[45%] bg-orange-50 md:pl-16 md:pr-36 md:py-10 overflow-y-scroll h-screen">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-4xl text-primary">LetsPay</h1>
        </div>
        <div className="bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Sign Up</h3>
          <p>Create your account to access LetsPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
          <p>Transfering money is eassier than ever, you can access LetsPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        </div>
        <Formik initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(value) => register(value)}>
          {({errors, touched}) => (
          <Form >
            <div onChange={() => setFirstName(true)} className={`flex gap-5 pb-3 border-b-2 ${firstName ? ' border-primary' : ''}`}>
              <User className={firstName ? 'text-primary' : 'text-slate-300'} />
              <Field type='text' name='firstName' placeholder='Enter your firtsname' className="flex-1 bg-transparent focus:outline-none"/>
            </div>
            {errors.firstName && touched.firstName ? (
             <div className='text-red-500 text-sm'>{errors.firstName}</div>
           ) : null}
            <div onChange={() => setLastName(true)} className={`flex gap-5 pb-3 mt-8 border-b-2 ${lastName ? ' border-primary' : ''}`}>
              <User className={lastName ? 'text-primary' : 'text-slate-300'} />
              <Field type='text' name='lastName' placeholder='Enter your lastsname' className="flex-1 bg-transparent focus:outline-none"/>
            </div>
            {errors.lastName && touched.lastName ? (
             <div className='text-red-500 text-sm'>{errors.lastName}</div>
            ) : null}
            <div onChange={() => setEmail(true)} className={`flex gap-5 pb-3 mt-8 border-b-2 ${email ? ' border-primary' : ''}`}>
              <Mail className={email ? 'text-primary' : 'text-slate-300'} />
              <Field type='text' name='email' placeholder='Enter your email' className="flex-1 bg-transparent focus:outline-none"/>
            </div>
            {errors.email && touched.email ? <div className='text-red-500 text-sm'>{errors.email}</div> : null}
            <div onChange={() => setPassword(true)} className={`flex gap-5 pb-3 mt-8 border-b-2 ${password ? ' border-primary' : ''}`}>
              <Lock className={password ? 'text-primary' : 'text-slate-300'}  />
              <Field type={eyePassword ? 'password' : 'text'} name='password' placeholder='Enter your password' className="flex-1 bg-transparent focus:outline-none"/>
              {eyePassword ? <Eye onClick={() => setEyePassword(false)} className={password ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={() => setEyePassword(true)} className={password ? 'text-primary' : 'text-slate-300'}  />}
            </div>
            {errors.password && touched.password ? <div className='text-red-500 text-sm'>{errors.password}</div> : null}
            <div className="flex justify-center items-center w-full h-8 py-14">
              <button type='submit' className={`w-full bg-primary text-white font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm text-white`}>Sign Up</button>
            </div>
          </Form>
          )}
        </Formik>
        <div className="text-center">
          <p>Already have an account? Let&apos;s <Link href='/login' className="text-primary cursor-pointer hover:font-bold">Login</Link></p>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default authPrivate(SignUp)
