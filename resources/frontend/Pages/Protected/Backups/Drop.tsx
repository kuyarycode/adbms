import Connection from '@/Types/Connection'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Inertia } from '@inertiajs/inertia';
import route from 'ziggy-js';
import Backup from '@/Types/Backup';

type Props = {
    backup: Backup
}

export default function DropBackup({ backup }: Props) {
    const [isOpen, setIsOpen] = React.useState<boolean>(true)
    const [processing, setProcessing] = React.useState<boolean>(false)

    const closeModal = () => {
        setIsOpen(false)
        Inertia.get(route('connection.backups', { id: backup.connection.id }))
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
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className='mx-auto max-w-xl bg-white rounded px-5'>
                        <div className='py-5'>
                            <Dialog.Title>
                                <span className='pt-2 font-bold text-lg'>
                                    Drop Backup
                                </span>
                            </Dialog.Title>
                            <Dialog.Description>
                                <span>
                                    Deleting backup <strong className='text-sm'>{backup.storage_path}</strong>
                                </span>
                            </Dialog.Description>
                        </div>

                        <p className='font-sans'>
                            Are you sure you want to delete this backup,
                            SQL file on this backup will be permanently
                            removed. This action cannot be undone.
                        </p>

                        <div className='py-5 flex gap-x-2'>
                            <button
                                disabled={processing}
                                className={`tracking-wider rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300`}
                                onClick={() => {
                                    Inertia.delete(route('connection.backup.delete', { id: backup.id }), {
                                        onBefore: () => {
                                            setProcessing(true)
                                        },
                                        onFinish: () => {
                                            setProcessing(false)
                                        }
                                    })
                                }}>
                                Confirm
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
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    )
}
