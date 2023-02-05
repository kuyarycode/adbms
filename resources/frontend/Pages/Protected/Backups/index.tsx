import ProtectedLayout from '@/Shared/Layouts/ProtectedLayout'
import React from 'react'
import { FiDelete, FiDownload, FiEdit, FiMail, FiTrash } from 'react-icons/fi'
import moment from "moment"
import Connection from '@/Types/Connection'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import route from 'ziggy-js'
import Backup from '@/Types/Backup'
import Pagination from './Pagination'
import { ErrorBag } from '@inertiajs/inertia'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

export type PaginationLink = {
    url: string
    label: string
    active: boolean
}

type Props = {
    connection: Connection,
    backups: {
        data: Backup[]
        links: PaginationLink[]
    }
}

type BackupsPageProps = {
    errors: ErrorBag,
    flash?: {
        message: string,
        success: boolean
    }
}


export default function Backups({ backups, connection }: Props) {

    const [data, setData] = React.useState<Backup[]>([])

    React.useEffect(() => {
        setData(backups.data)
    }, [])

    const { flash, errors: ErrorPage }: BackupsPageProps = usePage().props

    return (
        <ProtectedLayout>
            <main>
                <header className='flex justify-between items-center'>
                    <div className='flex gap-x-2 flex-wrap'>
                        <h1 className='font-semibold'>
                            {connection.name}
                        </h1>
                        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${connection.enabled ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${connection.enabled ? 'bg-green-600' : 'bg-red-600'}`}></span>
                            {connection.enabled ? 'Enabled' : 'Disabled'}
                        </div>
                        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${connection.connected?.success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${connection.connected?.success ? 'bg-green-600' : 'bg-red-600'}`}></span>
                            {connection.connected?.success ? 'Connected' : 'Discconected'}
                        </div>
                        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${connection.notifiable ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${connection.notifiable ? 'bg-green-600' : 'bg-red-600'}`}></span>
                            <FiMail />
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-end gap-1'>
                        <InertiaLink
                            as='button'
                            href={route('connection.edit', { id: connection.id ?? '' })}
                            className={`flex items-center border border-gray-100 py-[.5rem] px-3 rounded bg-orange-500 text-white hover:bg-orange-700`}>
                            <FiEdit /><span className='text-sm hidden lg:block'>&nbsp;Edit</span>
                        </InertiaLink>
                        <InertiaLink
                            as='button'
                            href={route('connection.delete', { id: connection.id ?? '' })}
                            className={`flex items-center border border-gray-100 py-[.5rem] px-3 rounded bg-red-500 text-white hover:bg-red-700`}>
                            <FiTrash /><span className='text-sm hidden lg:block'>&nbsp;Drop</span>
                        </InertiaLink>
                    </div>
                </header>
                <div className='flex flex-col items-start py-3'>
                    <div className="font-normal text-gray-900">
                        <div className='flex flex-col flex-wrap text-sm py-2'>
                            <div>Hostname&nbsp;:&nbsp;<strong>{connection?.mysqldb_host}</strong></div>
                            <div>Username&nbsp;:&nbsp;<strong>{connection?.mysqldb_user}</strong></div>
                            <div>Port&nbsp;:&nbsp;<strong>{connection?.mysqldb_port}</strong></div>
                            <div>Database&nbsp;:&nbsp;<strong>{connection?.mysqldb_name}</strong></div>
                        </div>
                    </div>
                    <div className="font-normal text-gray-900">
                        <div className='flex items-center text-sm'>
                            Frequency&nbsp;:<strong>&nbsp;{connection?.frequency}</strong>
                        </div>
                    </div>
                </div>

                {flash?.message &&
                    <div className={`mt-1 py-4 rounded ${flash.success ? 'text-green-600 bg-green-50 ' : 'text-red-600'} text-center flex gap-x-2 justify-center items-center`}>
                        {flash.success ?
                            <AiOutlineCheckCircle size={22} className='text-green-500' /> :
                            <AiOutlineCloseCircle size={22} className='text-red-500' />}
                        <p>{flash.message}</p>
                    </div>}

                <section className='overflow-x-auto mt-2'>
                    <div className="rounded-md border">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium  text-gray-900">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-gray-900">
                                        File
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-gray-900">
                                        Message
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-gray-900">
                                        Frequency
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-gray-900">
                                        Created&nbsp;At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {Array.from(data).length < 1 ?
                                    <tr className="hover:bg-gray-50">
                                        <td colSpan={5} className="px-6 py-4">
                                            <div className="flex justify-center gap-4">
                                                No backups found
                                            </div>
                                        </td>
                                    </tr>
                                    : data.map((backup, idx) => {
                                        return (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className='flex flex-nowrap justify-end gap-1'>
                                                        <a download
                                                            href={`${import.meta.env.VITE_BASE_URL}/storage/backups/${backup.storage_path}`}
                                                            className={`flex items-center border border-gray-100 py-[.5rem] px-3 rounded bg-cyan-500 text-white hover:bg-cyan-700`}>
                                                            <FiDownload />
                                                        </a>
                                                        <InertiaLink
                                                            href={route('connection.backup.delete', { id: backup.id })}
                                                            className={`flex items-center border border-gray-100 py-[.5rem] px-3 rounded bg-red-500 text-white hover:bg-red-700`}>
                                                            <FiDelete />
                                                        </InertiaLink>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-start gap-4 text-sm">
                                                        {backup.storage_path}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {backup.status ?
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                                            Success
                                                        </span>
                                                        :
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                                            Error
                                                        </span>}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {backup.message}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {backup.frequency}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        {moment(backup.created_at).format('YYYY-MM-DD h:mma')}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        <Pagination links={backups.links} />
                    </div>
                </section>
            </main>
        </ProtectedLayout>
    )
}
