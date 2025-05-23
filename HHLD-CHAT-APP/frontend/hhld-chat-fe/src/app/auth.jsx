'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './zustand/useAuthStore';

const Auth = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { authName, updateAuthName } = useAuthStore();

    const UpdateUserName = (e) => {
        setUsername(e.target.value);
    }
    const UpdatePassword = (e) => {
        setPassword(e.target.value);
    }
    const signUpFunc = async (event) => {
        event.preventDefault();


        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}:5001/auth/signup`, {
                username: username,
                password: password
            }, {
                withCredentials: true //to allow browser to set cookie
            })

            if (res.data.message === "Username already exists") {
                alert('Username already exists');
            } else {
                updateAuthName(username);
                router.replace('/chat')
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                console.log("Bad Request: ", error.response.data.message);
                alert("Bad Request: " + error.response.data.message);
            } else {
                console.log("Error in signup function: ", error.message);
            }
        }
    }

    const logInFunc = async (event) => {
        event.preventDefault();


        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}:5001/auth/login`, {
                username: username,
                password: password
            }, {
                withCredentials: true //to allow browser to set cookie
            })
            updateAuthName(username);
            router.replace('/chat')
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response?.data?.message);
                alert(error.response?.data?.message);
            } else {
                console.log("Error in login function: ", error.message);
            }
        }
    }







    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-3xl font-bold tracking-wide text-white bg-gradient-to-r from-amber-600 to-yellow-500 py-3 px-4 rounded-lg shadow-md inline-block whitespace-nowrap mx-auto">
                    Welcome to CHIT-CHAT
                </h1>

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">User Name</label>
                        <div className="mt-2">
                            <input type="username"
                                name="username"
                                id="username"
                                autoComplete="username"
                                value={username}
                                onChange={UpdateUserName}
                                required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input type="password" name="password" id="password" autoComplete="current-password" required
                                value={password}
                                onChange={UpdatePassword}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className='flex'>
                        <button type="submit" onClick={signUpFunc} className="m-3 flex w-1/2 justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Sign up</button>
                        <button type="submit" onClick={logInFunc} className="m-3 flex w-1/2 justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Log in</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default Auth