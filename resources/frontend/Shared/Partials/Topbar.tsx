import React, { Fragment } from 'react'
import { Menu, Transition } from "@headlessui/react"
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { AiOutlineEdit, AiOutlineLogout } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { FiChevronDown } from 'react-icons/fi'
import route from 'ziggy-js'
import User from '@/Types/User'
import { ErrorBag } from '@inertiajs/inertia'

type Props = {
    showNav: boolean
    setShowNav: (showNav: boolean) => void
}

type UsePageProps = {
    user?: User
    errors: ErrorBag
}

export default function Topbar({ showNav, setShowNav }: Props) {

    const { user }: UsePageProps = usePage().props

    return (
        <div
            className={`bg-white fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] z-10 ${showNav ? 'pl-56' : ''}`}
        >
            <div className="pl-4 md:pl-12">
                <HiOutlineMenuAlt2
                    className="h-7 w-7 fa-bars text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                />
            </div>
            <div className="flex items-center pr-4 md:pr-16">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-2 items-center">
                            {user && !user.avatar_path ?
                                <FaUserCircle className="text-gray-400" size={28} /> :
                                <picture>
                                    <img
                                        src={user?.avatar_path}
                                        className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                                        alt="Display picture"
                                    />
                                </picture>}
                            <span className="hidden md:block text-sm text-gray-700">
                                {user?.email}
                            </span>
                            <FiChevronDown className="ml-2 h-5 w-5 text-gray-700" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration=75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow">
                            <div className="p-1">
                                {/* <Menu.Item>
                                    <InertiaLink
                                        href={route('profile.update', {
                                            user: user != null && user.id
                                        })}
                                        className={`${route().current() == 'profile.update' && 'bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600'} tracking-wide flex hover:bg-gray-200 hover:text-gray-900 text-gray-700 rounded p-2 text-sm group transition-colors items-center`}
                                    >
                                        <AiOutlineEdit className="h-4 w-4 mr-2" />
                                        Profile
                                    </InertiaLink>
                                </Menu.Item> */}
                                <Menu.Item>
                                    <InertiaLink
                                        href={route('logout')}
                                        method='post'
                                        as='button'
                                        className="w-full tracking-wide flex hover:bg-gray-200 hover:text-gray-900 text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                                    >
                                        <AiOutlineLogout className="h-4 w-4 mr-2" />
                                        Log out
                                    </InertiaLink>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}
