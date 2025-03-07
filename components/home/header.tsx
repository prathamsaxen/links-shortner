import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import ThemeToggle from './theme-toggle';

export default function Header() {
    return (
        <header className='border-b dark:border-slate-800 py-4'>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <Link href='/' className='flex items-center gap-2'>
                    <LinkIcon className='h-6 w-6 text-blue-600' />
                    <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 text-transparent bg-clip-text'>Linkly</span>
                </Link>

                <div className='flex items-center'>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
