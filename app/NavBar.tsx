'use client'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    const { data: session } = useSession();

    return (
        <div className='flex p-5 bg-slate-200'>
            <Link href='/' className="mr-5">Next.js</Link>
            <Link href='/users' className="mr-5">Users</Link>
            {session?.user ? (
                <div className='flex gap-3'>
                    <div>{session.user.name}</div>
                    <button
                        onClick={() => signOut()}
                        className='mr-5'
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link href='/api/auth/signin' className="mr-5">Login</Link>
            )}
        </div>
    );
}

export default NavBar;
