'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { signin } from '@/state/actions/auth';
import { localStorageProvider } from '@/utils/method';
import { useRouter } from 'next/navigation';

const Page = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin(form));
  };


  useEffect(() => {
    const userData = localStorageProvider.getStorage('profile'); // example key
    if (userData) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="w-full md:w-1/2 p-8 sm:p-12">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 light:text-white">
        Next JS
      </a>
      <div className="rounded-lg">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white mb-6">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
              Your Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white"
              placeholder='Enter email'
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 light:bg-gray-700 light:border-gray-600 light:focus:ring-primary-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 light:text-gray-300">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-white hover:underline light:text-primary-500">
              Forgot password?
            </a>
          </div>

          <button type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800">
            Sign in
          </button>

          <p className="text-sm font-light text-gray-500 light:text-gray-400 mt-4">
            Don’t have an account yet? <Link href="/auth/register" className="font-medium text-primary-600 hover:underline light:text-primary-500">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
