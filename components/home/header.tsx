import React from 'react';
import { Button } from '../ui/button';

function Header() {
    return (
        <header className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text'>Linkly</h1>
            <div className='flex gap-4 items-center'>
                <Button variant='ghost' className='text-muted-foreground'>
                    Login
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700'>Register Now</Button>
            </div>
        </header>
    );
}

export default Header;
