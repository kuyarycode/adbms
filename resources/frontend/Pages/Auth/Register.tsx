import React from 'react'
import Auth from '@/Shared/Layouts/PublicLayout'
import Logo from '@/Components/Logo'
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import route from 'ziggy-js';

type RegisterProps = {}

export default function RegisterPage({ }: RegisterProps) {

    const props = usePage().props

    const { data, setData, post, errors, setError, processing } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    React.useEffect(() => {
        const { email, password, first_name, last_name } = props.errors
        setError('first_name', first_name)
        setError('last_name', last_name)
        setError('email', email)
        setError('password', password)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('register'))
    }

    const handleChangeFirstName = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("first_name", input.value)
    }

    const handleChangeLastName = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("last_name", input.value)
    }


    const handleChangeEmail = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("email", input.value)
    }

    const handleChangePassword = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("password", input.value)
    }

    const handleChangePasswordConfirmation = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData("password_confirmation", input.value)
    }

    return (
        <Auth>
            <main className='px-4 pt-12'>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex justify-center items-center gap-x-1'>
                        <Logo size={40} color='text-blue-600/80' />
                        <span className='font-semibold tracking-wide'>ADBMS</span>
                    </div>
                    <p className='pb-5 text-center'>Fill this form and sign up</p>
                </div>
                <div className="mx-auto max-w-[25rem]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="first_name"
                                className={`mb-1 block text-sm font-medium text-gray-700 after:content-['*'] after:pl-1 after:text-red-500`}>
                                First Name
                            </label>
                            <input
                                value={data.first_name}
                                onChange={handleChangeFirstName}
                                disabled={processing}
                                id="first_name"
                                type="text"
                                className={`block w-full rounded-md ${errors.first_name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                                placeholder="eg. Juan"
                            />
                            {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className={`mb-1 block text-sm font-medium text-gray-700 after:content-['*'] after:pl-1 after:text-red-500`}>
                                Last Name
                            </label>
                            <input
                                value={data.last_name}
                                onChange={handleChangeLastName}
                                disabled={processing}
                                id="last_name"
                                type="text"
                                className={`block w-full rounded-md ${errors.last_name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                                placeholder="eg. Dela Cruz"
                            />
                            {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
                        </div>
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
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="mb-1 block text-sm font-medium text-gray-700 after:content-['*'] after:pl-1 after:text-red-500">
                                Re-type Password
                            </label>
                            <input
                                value={data.password_confirmation}
                                onChange={handleChangePasswordConfirmation}
                                disabled={processing}
                                type="password"
                                id="password_confirmation"
                                className={`block w-full rounded-md ${errors.password_confirmation ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                                placeholder="Password"
                            />
                            {errors.password_confirmation && <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>}
                        </div>
                        <button
                            disabled={processing}
                            className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
                            Submit
                        </button>

                        <InertiaLink href={route('login')} className='text-sm ml-5 text-blue-500 hover:text-blue-700'>
                            Back to log in
                        </InertiaLink>

                        {props.errors && <div className='pb-20'></div>}
                    </form>
                </div>
            </main>
        </Auth>
    )
}
