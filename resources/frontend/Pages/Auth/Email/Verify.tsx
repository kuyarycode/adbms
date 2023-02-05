import React from 'react'
import Auth from '@/Shared/Layouts/PublicLayout'
import Logo from '@/Components/Logo'
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { ErrorBag, Inertia } from '@inertiajs/inertia';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

type VerifyProps = {}

type VerifyPageProps = {
    errors: ErrorBag,
    flash?: {
        message: string,
        success: boolean
    }
}

export default function VerifyPage({ }: VerifyProps) {
    const { flash, errors }: VerifyPageProps = usePage().props

    const [processing, setProcessing] = React.useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        Inertia.post(route('verification.send'), {}, {
            onBefore: () => {
                setProcessing(true)
            },
            onFinish: () => {
                setProcessing(false)
            }
        })
    }

    return (
        <Auth>
            <main className='px-4 pt-36'>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex justify-center items-center gap-x-1'>
                        <Logo size={40} color='text-blue-600/80' />
                        <span className='font-semibold tracking-wide'>ADBMS</span>
                    </div>
                    <p className='pb-5 text-center'>Please verify your email address</p>
                    {flash?.message &&
                        <div className={`mt-1 mb-5 text-sm ${flash.success ? 'text-green-600' : 'text-red-600'} text-center flex gap-x-2 justify-center items-center`}>
                            {flash.success ?
                                <HiCheckCircle size={22} className='text-green-500' /> :
                                <HiXCircle size={22} className='text-red-500' />}
                            <p>{flash.message}</p>
                        </div>}
                </div>
                <div className="mx-auto max-w-[25rem] flex justify-center items-center flex-col">
                    <form onSubmit={handleSubmit}>
                        <button
                            disabled={processing}
                            className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
                            Resend Email Verification
                        </button>
                    </form>
                    <InertiaLink href={route('logout')} method="post" as="button" className='text-center text-sm py-5 text-red-500 font-bold hover:text-red-700'>
                        Logout
                    </InertiaLink>
                </div>
            </main>
        </Auth>
    )
}
