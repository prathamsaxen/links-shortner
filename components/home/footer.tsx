'use client';

import type React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
    return (
        <footer className='w-full border-t dark:border-slate-800'>
            <div className='container mx-auto py-6 px-4'>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                    {/* Left side - Built by with LinkedIn link */}
                    <div className='text-sm text-muted-foreground'>
                        Built by{' '}
                        <Link href='https://www.linkedin.com/in/prathamsaxena' target='_blank' rel='noopener noreferrer' className='font-medium hover:text-primary hover:underline'>
                            Pratham Saxena
                        </Link>
                    </div>

                    {/* Right side - Social media icons */}
                    <div className='flex items-center space-x-4'>
                        <SocialLink href='https://facebook.com' icon={<Facebook className='h-4 w-4' />} label='Facebook' />
                        <SocialLink href='https://instagram.com' icon={<Instagram className='h-4 w-4' />} label='Instagram' />
                        <SocialLink href='https://linkedin.com/in/prathamsaxena' icon={<Linkedin className='h-4 w-4' />} label='LinkedIn' />
                        <SocialLink href='https://github.com' icon={<Github className='h-4 w-4' />} label='GitHub' />
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper component for social links
interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
    return (
        <Button variant='ghost' size='icon' asChild className='h-8 w-8 rounded-full hover:bg-muted'>
            <Link href={href} target='_blank' rel='noopener noreferrer' aria-label={label}>
                {icon}
            </Link>
        </Button>
    );
};

export default Footer;
