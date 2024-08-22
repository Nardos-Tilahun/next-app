'use client'
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { useSession } from "next-auth/react";

export default function Home() {

    const { data: session } = useSession();
    return (
        <main className='p-5'>
            <h1>Hello, {session?.user?.name}</h1>
            <Link href="/users">users </Link>
            <ProductCard />
        </main>
    );
}
