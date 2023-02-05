import React, { Fragment } from 'react'
import { Transition } from "@headlessui/react";

import Sidebar from '@/Shared/Partials/Sidebar';
import Topbar from '@/Shared/Partials/Topbar';

import Breadcrumb from '@/Components/Breadcrumb';

type ProtectedLayoutProps = {
    children: JSX.Element | JSX.Element[] | string
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const [showNav, setShowNav] = React.useState<boolean>(true)
    const [isMobile, setIsMobile] = React.useState<boolean>(false)

    const handleResize = () => {
        if (innerWidth <= 640) {
            setShowNav(false)
            setIsMobile(true)
        } else {
            setShowNav(true)
            setIsMobile(false)
        }
    }

    React.useEffect(() => {
        handleResize()

        if (typeof window != undefined) {
            addEventListener("resize", handleResize)
        }

        return () => {
            removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            <Topbar showNav={showNav} setShowNav={setShowNav} />
            <Transition
                as={Fragment}
                show={showNav}
                enter="transform transition duration-[400ms]"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform duration-[400ms] transition ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <Sidebar showNav={showNav} handleResize={handleResize} />
            </Transition>
            <main
                className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""}`}>
                <div className="md:px-6">
                    <Breadcrumb />
                    <div className='bg-white px-6 py-4 rounded-md shadow-sm pb-28'>
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}
