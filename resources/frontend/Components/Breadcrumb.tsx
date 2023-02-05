import React from 'react'
import route from 'ziggy-js'
import { FiHome } from 'react-icons/fi';
import { TbHome, TbHome2 } from 'react-icons/tb';

export type BreadcrumbProps = { className?: string }

export default function Breadcrumb({ className }: BreadcrumbProps) {

    const [crumbs, setCrumbs] = React.useState<string[]>([])

    React.useEffect(() => {
        switch (route().current()) {
            case 'dashboard':
                setCrumbs(['Dashboard'])
                break;
            case 'connections':
                setCrumbs(['Connections'])
                break;
            case 'connection.backups':
                setCrumbs(['Connection', 'Backups'])
                break;
            case 'profile.update':
                setCrumbs(['User', 'Profile'])
                break;
        }
    }, [route])

    return (
        <nav aria-label="breadcrumb" className='px-6 py-3'>
            <ol className="inline-flex items-center space-x-4 py-2 text-sm font-medium">
                <li className="inline-flex items-center">
                    <a href="" className="text-secondary-500 hover:text-secondary-600">
                        <FiHome size={17} />
                    </a>
                </li>
                {crumbs.map((crumb, idx) => {
                    return (
                        <li key={idx} className="font-centuryGothic inline-flex items-center space-x-4" aria-current="page">
                            <span className="text-secondary-400">/</span>
                            <a href="" className={`${(idx == crumbs.length - 1) ? 'text-secondary-800' : 'text-secondary-500'} hover:text-secondary-600 tracking-wide`}>
                                {crumb}
                            </a>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
