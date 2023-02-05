import React from 'react'
import { FiDatabase } from 'react-icons/fi';

export type LogoProps = {
    size?: number
    color?: string
}

export default function Logo({ size, color }: LogoProps) {
    return (
        <FiDatabase
            className={`${color ?? 'text-gray-900'} text-crimson-600`}
            size={size ?? 80}
        />
    )
}
