import React from 'react'
import Auth from '@/Shared/Layouts/PublicLayout'
import Logo from '@/Components/Logo'
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { ErrorBag } from '@inertiajs/inertia';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

type LoginProps = {}
type LoginPageProps = {
    errors: ErrorBag,
    flash?: {
        message: string,
        success: boolean
    }
}

export default function LoginPage({ }: LoginProps) {

    const { flash, errors: ErrorPage }: LoginPageProps = usePage().props

    const { data, setData, post, errors, setError, processing } = useForm({
        email: 'dev@reynaldorayan.app',
        password: 'password',
        remember: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('login'))
    }

    const handleChangeEmail = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("email", input.value)
    }

    const handleChangePassword = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("password", input.value)
    }

    const handleChangeRemember = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("remember", Boolean(input.value))
    }

    return (
        <Auth>
            <main className='px-4 pt-36'>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex justify-center items-center gap-x-1'>
                        <Logo size={40} color='text-blue-600/80' />
                        <span className='font-semibold tracking-wide'>ADBMS</span>
                    </div>
                    <p className='pb-5 text-center'>Please sign in your account</p>
                    {flash?.message &&
                        <div className={`mt-1 text-sm ${flash.success ? 'text-green-600' : 'text-red-600'} text-center flex gap-x-2 justify-center items-center`}>
                            {flash.success ?
                                <HiCheckCircle size={22} className='text-green-500' /> :
                                <HiXCircle size={22} className='text-red-500' />}
                            <p>{flash.message}</p>
                        </div>}
                </div>
                <div className="mx-auto max-w-[25rem]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className={`mb-1 block text-sm font-medium text-gray-700 after:content-['*'] after:pl-1 after:text-red-500`}>
                                Email
                            </label>
                            <input
                                value={data.email}
                                onChange={handleChangeEmail}
                                disabled={processing}
                                type="email"
                                id="email"
                                className={`block w-full rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                                placeholder="you@email.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <InertiaLink href={route('password.request')} className='text-sm float-right text-blue-500 hover:text-blue-700'>
                                Forget password
                            </InertiaLink>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-gray-700 after:content-['*'] after:pl-1 after:text-red-500">
                                Password
                            </label>
                            <input
                                value={data.password}
                                onChange={handleChangePassword}
                                disabled={processing}
                                type="password"
                                id="password"
                                className={`block w-full rounded-md ${errors.password ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                                placeholder="Password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                value={data.remember.toString()}
                                onChange={handleChangeRemember}
                                disabled={processing}
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium text-gray-700 select-none">
                                Remember me
                            </label>
                        </div>
                        <button
                            disabled={processing}
                            className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
                            Submit
                        </button>

                        <InertiaLink href={route('register')} className='text-sm ml-5 text-blue-500 hover:text-blue-700'>
                            Create account
                        </InertiaLink>
                    </form>
                </div>
            </main>
        </Auth>
    )
}
