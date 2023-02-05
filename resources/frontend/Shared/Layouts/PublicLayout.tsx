import React from 'react'

type Props = {
    children: JSX.Element[] | JSX.Element
}

export default function PublicLayout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    )
}
