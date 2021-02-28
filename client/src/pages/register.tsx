import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Inputgroup from '../components/InputGroup';

export default function Home() {
  const [state, setState] = useState({ username: '', password: '', email: '' });
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInput = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post('/auth/register', state);
      console.log('result', result);
    } catch (error) {
      setErrors(error.response.data);
    }
    setState({ username: '', password: '', email: '' });
  };
  return (
    <div className='flex'>
      <Head>
        <title>Register</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div
        className='w-40 h-screen bg-center bg-cover'
        style={{ backgroundImage: "url('/images/bgBricks.jpg')" }}
      ></div>
      <div className='flex flex-col justify-center pl-6'>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>Sign up</h1>
          <p className='mb-10 text-xs'>
            By continuing, you agree to our <a>User Agreement</a> and{' '}
            <a>Privacy Policy</a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <input
                type='checkbox'
                onChange={() => setAgreement(!agreement)}
                checked={agreement}
                className='mr-1 cursor-pointer'
                id='agreement'
              />
              <label htmlFor='agreement' className='text-xs cursor-pointer'>
                I agree to get emails about cool stuff
              </label>
            </div>
            <Inputgroup
              className='mb-2'
              value={state.email}
              setValue={handleInput}
              placeholder='Email'
              error={errors.email}
              type='email'
              name='email'
            />
            <Inputgroup
              setValue={handleInput}
              type='text'
              name='username'
              value={state.username}
              className='mb-2'
              placeholder='Username'
              error={errors.username}
            />
            <Inputgroup
              setValue={handleInput}
              type='text'
              name='password'
              value={state.password}
              className='mb-4'
              placeholder='Password'
              error={errors.password}
            />
            <button
              onClick={handleSubmit}
              className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded'
            >
              Sign up
            </button>
          </form>
          <small>
            Already have an account ?
            <Link href='/login'>
              <a className='ml-1 text-blue-500 uppercase'>Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
