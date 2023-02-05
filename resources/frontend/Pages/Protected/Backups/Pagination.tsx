import React from 'react';
import { InertiaLink, Link } from '@inertiajs/inertia-react';
import { PaginationLink } from '.';

type Props = {
    links: PaginationLink[]
}

export default function Pagination({ links }: Props) {

    function getClassName(active: boolean) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-blue-50 focus:border-primary focus:text-primary";
        }
    }

    return links.length > 3 ? (
        <div className="mb-4 flex justify-center">
            <div className="flex flex-wrap mt-8">
                {links.map((link, key) => (
                    link.url === null ?
                        (<div
                            key={key}
                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                            {link.label?.replace('&laquo;', '')?.replace('&raquo;', '')}
                        </div>) :
                        (<InertiaLink
                            key={key}
                            preserveScroll
                            className={getClassName(link.active)} href={link.url}>
                            {link.label?.replace('&laquo;', '')?.replace('&raquo;', '')}
                        </InertiaLink>)
                ))}
            </div>
        </div>
    ) : <></>
}