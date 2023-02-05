import ProtectedLayout from '@/Shared/Layouts/ProtectedLayout'
import Connection from '@/Types/Connection'
import { ErrorBag } from '@inertiajs/inertia'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { FiDatabase, FiPlusCircle } from 'react-icons/fi'
import { TbPlugConnected, TbPlugConnectedX } from 'react-icons/tb'
import route from 'ziggy-js'

type Props = {
    connections: Connection[]
}

type ConnectionsPageProps = {
    errors: ErrorBag,
    flash?: {
        message: string,
        success: boolean
    }
}

export default function Connections({ connections }: Props) {

    const { flash, errors: ErrorPage }: ConnectionsPageProps = usePage().props

    return (
        <ProtectedLayout>
            <main>
                <header className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-semibold'>Back-Up Connections</h1>
                    </div>
                    <InertiaLink
                        as='button'
                        href={route('connection.create')}
                        className={`flex items-center border border-gray-100 py-[.5rem] px-3 rounded bg-blue-500 text-white hover:bg-blue-700`}>
                        <FiPlusCircle />&nbsp;<span className='text-sm'>New</span>
                    </InertiaLink>
                </header>

                {flash?.message &&
                    <div className={`mt-1 py-4 rounded ${flash.success ? 'text-green-600 bg-green-50 ' : 'text-red-600'} text-center flex gap-x-2 justify-center items-center`}>
                        {flash.success ?
                            <AiOutlineCheckCircle size={22} className='text-green-500' /> :
                            <AiOutlineCloseCircle size={22} className='text-red-500' />}
                        <p>{flash.message}</p>
                    </div>}

                <section className='mt-2'>
                    <div className='gap-5 rounded-lg'>
                        <div className={`${connections.length > 0 && 'grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                            {connections.length < 1 ?
                                <div className='w-full shadow-sm flex justify-center items-center px-4 py-2 border border-gray-50 bg-gray-50 rounded-md min-h-[13vh] lg:min-h-[15vh]'>
                                    <div className='flex text-center flex-col'>
                                        <h2 className=' text-gray-700/90'>
                                            No connections setup yet
                                        </h2>
                                    </div>
                                </div>
                                : connections.map((connection, idx) => {
                                    return (
                                        <InertiaLink key={idx}
                                            href={route('connection.backups', { id: connection.id as string })}
                                            className='text-start' as="button">
                                            <div className='shadow-sm hover:bg-gray-100 flex justify-between items-center px-4 py-2 border border-gray-200 bg-gray-50 rounded-md min-h-[13vh] lg:min-h-[15vh]'>
                                                <div className='flex flex-col'>
                                                    <div>
                                                        {/* <h2 className='font-semibold text-gray-800'>
                                                            {connection.slug}
                                                        </h2> */}
                                                        <p className='text-gray-800 flex items-center gap-x-2 font-semibold'>
                                                            {connection.name}
                                                        </p>
                                                        <div className='flex items-center gap-x-1'>
                                                            <FiDatabase className='text-gray-500' /> {connection.mysqldb_name}
                                                        </div>
                                                        <p className='mt-1 text-gray-800 flex items-center text-sm'>
                                                            <strong>{connection.backups?.length}</strong>&nbsp;backups
                                                        </p>
                                                    </div>
                                                </div>
                                                {connection.connected?.success ?
                                                    <TbPlugConnected
                                                        size={50}
                                                        className='text-green-500/60'
                                                    /> :
                                                    <TbPlugConnectedX
                                                        size={50}
                                                        className='text-red-500/60'
                                                    />}


                                            </div>
                                        </InertiaLink>
                                    )
                                })}
                        </div>
                    </div>
                </section>
            </main>
        </ProtectedLayout>
    )
}
