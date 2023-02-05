import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ErrorBag, Inertia } from '@inertiajs/inertia';
import route from 'ziggy-js';
import { useForm, usePage } from '@inertiajs/inertia-react';
import Connection from '@/Types/Connection';

type Props = {
    connection: Connection
}

type UseFormDataProps = {
    connection_name: string,
    slug: string,
    mysqldb_host: string
    mysqldb_port: string
    mysqldb_pass: string
    mysqldb_user: string
    mysqldb_name: string
    frequency: string
    enabled: boolean
    notifiable: boolean
}

type EditBackupConnectionPageProps = {
    errors: ErrorBag,
    flash?: {
        message: string,
        created: boolean,
        success: boolean
    }
}

export default function EditBackupConnection({ connection }: Props) {

    const { flash, errors: pageError }: EditBackupConnectionPageProps = usePage().props

    const [isOpen, setIsOpen] = React.useState<boolean>(true)
    const [processing, setProcessing] = React.useState<boolean>(false)

    const closeModal = () => {
        setIsOpen(false)
        Inertia.get(route('connection.backups', { id: connection.id }),)
    }

    const convertSlug = (connectionName: string): string => {
        return connectionName.toLowerCase().replaceAll(' ', '-')
    }

    const initialState: UseFormDataProps = {
        slug: connection.slug,
        connection_name: connection.name,
        mysqldb_host: connection.mysqldb_host,
        mysqldb_port: connection.mysqldb_port,
        mysqldb_pass: connection.mysqldb_pass ?? '',
        mysqldb_user: connection.mysqldb_user,
        mysqldb_name: connection.mysqldb_name,
        frequency: connection.frequency,
        enabled: connection.enabled,
        notifiable: connection.notifiable
    }

    const { data, setData, patch, errors, setError } = useForm<UseFormDataProps>(initialState)

    React.useEffect(() => {
        setData('slug', convertSlug(data.connection_name))
    }, [data.connection_name])

    React.useEffect(() => {
        setError('slug', errors.slug)
        setError('connection_name', errors.connection_name)
        setError('mysqldb_host', errors.mysqldb_host)
        setError('mysqldb_port', errors.mysqldb_port)
        setError('mysqldb_pass', errors.mysqldb_pass)
        setError('mysqldb_user', errors.mysqldb_user)
        setError('mysqldb_name', errors.mysqldb_name)
        setError('enabled', errors.enabled)
        setError('notifiable', errors.notifiable)
    }, [processing])

    async function pushRequest(prevalidate = false) {
        patch(route('connection.update', { prevalidate, id: connection.id }), {
            preserveScroll: true,
            preserveState: true,
            onBefore: () => {
                setProcessing(true)
            },
            onFinish: () => {
                setProcessing(false)
                setIsOpen(true)
            }
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        pushRequest(false)
    }

    return (
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(true)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-scroll pt-80">
                    <Dialog.Panel className='mx-auto max-w-xl bg-white rounded px-5'>
                        <div className='py-5'>
                            <Dialog.Title>
                                <span className='pt-2 font-bold text-lg'>
                                    Edit Connection
                                </span>
                            </Dialog.Title>
                            <Dialog.Description>
                                <span>
                                    Updating new database connection and backup configuration
                                </span>
                            </Dialog.Description>
                        </div>

                        <div className='form'>
                            <div className="relative my-3">
                                <input
                                    value={data.connection_name}
                                    onChange={(e) => setData('connection_name', e.target.value)}
                                    onBlur={() => pushRequest(true)}
                                    type="text" id="connection_name"
                                    placeholder=" "
                                    className={`${errors.connection_name && 'border-red-400 border'} peer block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`} />
                                <label htmlFor="connection_name" className="tracking-wider peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">
                                    Connection Name
                                </label>
                                {errors.connection_name &&
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.connection_name}
                                    </p>}
                            </div>

                            <div className="mt-3 font-semibold text-sm tracking-wider">
                                Database configuration

                                <div className='py-5'>
                                    <p className={`${flash?.success ? 'text-green-600' : 'text-red-600'} text-xs`}>
                                        <span className='text-gray-600'>Status</span>&nbsp;:&nbsp;{flash?.success ? 'Connected' : 'Disconnected'}
                                    </p>
                                    <p className='text-blue-600 text-xs'>
                                        <span className='text-gray-600'>Log</span>&nbsp;:&nbsp;{flash?.message}
                                    </p>
                                </div>
                            </div>

                            <div className='my-3'>
                                <div className="relative my-3">
                                    <input
                                        value={data.mysqldb_host}
                                        onChange={(e) => setData('mysqldb_host', e.target.value)}
                                        onBlur={() => pushRequest(true)}
                                        type="text"
                                        id="mysqldb_host"
                                        placeholder=" "
                                        className={`${errors.mysqldb_host && 'border-red-400 border'} peer block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`} />
                                    <label htmlFor="mysqldb_host" className="tracking-wider peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">
                                        Mysql Hostname
                                    </label>
                                    {errors.mysqldb_host &&
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.mysqldb_host}
                                        </p>}
                                </div>
                                <div className="relative my-3">
                                    <input
                                        value={data.mysqldb_port}
                                        onChange={(e) => setData('mysqldb_port', e.target.value)}
                                        onBlur={() => pushRequest(true)}
                                        type="text"
                                        id="mysqldb_port"
                                        placeholder=" "
                                        className={`${errors.mysqldb_port && 'border-red-400 border'} peer block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`} />
                                    <label htmlFor="mysqldb_port" className="tracking-wider peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">
                                        Mysql Port
                                    </label>
                                    {errors.mysqldb_port &&
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.mysqldb_port}
                                        </p>}
                                </div>
                                <div className="relative my-3">
                                    <input
                                        value={data.mysqldb_user}
                                        onChange={(e) => setData('mysqldb_user', e.target.value)}
                                        onBlur={() => pushRequest(true)}
                                        type="text"
                                        id="mysqldb_user"
                                        placeholder=" "
                                        className={`${errors.mysqldb_user && 'border-red-400 border'} peer block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`} />
                                    <label htmlFor="mysqldb_user" className="tracking-wider peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">
                                        Mysql Username
                                    </label>
                                    {errors.mysqldb_user &&
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.mysqldb_user}
                                        </p>}
                                </div>
                                <div className="relative my-3">
                                    <input
                                        value={data.mysqldb_pass}
                                        onChange={(e) => setData('mysqldb_pass', e.target.value)}
                                        onBlur={() => pushRequest(true)}
                                        type="text"
                                        id="mysqldb_pass"
                                        placeholder=" "
                                        className={`${errors.mysqldb_pass && 'border-red-400 border'}  peer block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`} />
                                    <label htmlFor="mysqldb_pass" className="tracking-wider peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">
                                        Mysql Password
                                    </label>
                                    {errors.mysqldb_pass &&
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.mysqldb_pass}
                                        </p>}
                                </div>
                                <div className="relative my-3">
                                    <input
                                        value={data.mysqldb_name}
                                        onChange={(e) => setData('mysqldb_name', e.target.value)}
                                        onBlur={() => pushRequest(true)}
                                        type="text"
                                        id="mysqldb_name"
                                        placeholder=" "
                                        className={`${errors.mysqldb_name && 'border-red-400 border'} peer block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`} />
                                    <label htmlFor="mysqldb_name" className="tracking-wider peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">
                                        Mysql Database
                                    </label>
                                    {errors.mysqldb_name &&
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.mysqldb_name}
                                        </p>}
                                </div>
                            </div>

                            <div className="mt-3 font-semibold text-sm tracking-wider">
                                Auto Backup configuration
                            </div>

                            <div className="mt-3">
                                <label htmlFor="frequency" className="mb-1 block text-sm font-medium text-gray-700">Frequency</label>
                                <select
                                    value={data.frequency}
                                    onChange={(e) => setData("frequency", e.target.value)}
                                    id="frequency"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
                                    <option value="everyMinute">Every minute</option>
                                    <option value="everyTwoMinutes">Every 2 minutes</option>
                                    <option value="everyThreeMinutes">Every 3 minutes</option>
                                    <option value="everyFourMinutes">Every 4 minutes</option>
                                    <option value="everyFiveMinutes">Every 5 minutes</option>
                                    <option value="everyTenMinutes">Every 10 minutes</option>
                                    <option value="everyFifteenMinutes">Every 15 minutes</option>
                                    <option value="everyThirtyMinutes">Every 30 minutes</option>
                                    <option value="everyTwoHours">Every 2 hours</option>
                                    <option value="everyThreeHours">Every 3 hours</option>
                                    <option value="everyFourHours">Every 4 hours</option>
                                    <option value="everySixHours">Every 6 hours</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="enabled" className="mb-1 block text-sm font-medium text-gray-700">Backup Enabled</label>
                                <label htmlFor="enabled" className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        checked={data.enabled}
                                        onChange={(e) => {
                                            setData('enabled', Boolean(e.target.checked))
                                        }}
                                        type="checkbox"
                                        id="enabled"
                                        className="peer sr-only" />
                                    <div className="h-6 w-11 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"></div>
                                </label>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="notifiable" className="mb-1 block text-sm font-medium text-gray-700">Notification via Email</label>
                                <label htmlFor="notifiable" className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        checked={data.notifiable}
                                        onChange={(e) => {
                                            setData('notifiable', Boolean(e.target.checked))
                                        }}
                                        type="checkbox"
                                        id="notifiable"
                                        className="peer sr-only" />
                                    <div className="disabled h-6 w-11 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"></div>
                                </label>
                            </div>
                        </div>

                        <div className='py-5 flex gap-x-2'>
                            <button
                                disabled={processing}
                                className={`tracking-wider rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300`}
                                onClick={handleSubmit}>
                                Save changes
                            </button>
                            <button
                                disabled={processing}
                                className={`tracking-wider rounded-lg border border-gray-500 bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-700 hover:bg-gray-700 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300`}
                                onClick={() => {
                                    closeModal()
                                }}>
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel >
                </div >
            </Dialog >
        </Transition >
    )
}
