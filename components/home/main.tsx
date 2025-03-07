'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy } from 'lucide-react';
import { Loader } from '@/components/ui/loader';
import { isValidUrl } from '@/lib/utils';
import { LinkData } from '@/types/link-data';

const Main: React.FC = () => {
    const [autoPaste, setAutoPaste] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [linksData, setLinksData] = useState<LinkData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/links`, { method: 'GET' });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data: LinkData[] = await response.json();
            setLinksData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (autoPaste) {
            const getClipboardContent = async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    if (text && isValidUrl(text)) {
                        setUrl(text);
                    }
                } catch (err) {
                    console.error('Failed to read clipboard:', err);
                }
            };

            getClipboardContent();
        }
    }, [autoPaste]);

    const handleShortenLink = async () => {
        if (!url.trim()) {
            setError('URL cannot be empty.');
            return;
        }

        if (!isValidUrl(url)) {
            setError('Invalid URL format.');
            return;
        }

        setError(null);
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalLink: url })
            });

            if (!response.ok) throw new Error('Failed to shorten URL');

            await fetchData();
            setUrl('');
        } catch (error) {
            console.error('Error shortening link:', error);
            setError('Failed to shorten URL. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = (text: string) => {
        const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${text}`;
        navigator.clipboard.writeText(fullUrl).catch((err) => console.error('Failed to copy text: ', err));
    };

    const formatOriginalLink = (link: string) => {
        if (link.length > 40) {
            return link.substring(0, 37) + '...';
        }
        return link;
    };

    return (
        <main className='container mx-auto px-4 py-6 md:py-12'>
            <div className='text-center max-w-3xl mx-auto mb-8 md:mb-12'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 text-transparent bg-clip-text'>Shorten Your Loooong Links :)</h1>
                <p className='text-muted-foreground text-sm md:text-base'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
            </div>

            <div className='max-w-2xl mx-auto mb-8 md:mb-12'>
                <div className='relative'>
                    <Input placeholder='Enter the link here' className='pr-32 h-12 dark:bg-slate-900' type='url' value={url} onChange={(e) => setUrl(e.target.value)} aria-label='URL to shorten' disabled={isSubmitting} />
                    <Button className='absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 h-10' onClick={handleShortenLink} disabled={isSubmitting}>
                        {isSubmitting ? <Loader size={16} className='mr-2' /> : null}
                        Shorten Now!
                    </Button>
                </div>

                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

                <div className='flex items-center gap-2 mt-4 justify-center'>
                    <Switch checked={autoPaste} onCheckedChange={setAutoPaste} className='data-[state=checked]:bg-blue-600' id='auto-paste' />
                    <label htmlFor='auto-paste' className='text-sm text-muted-foreground'>
                        Auto Paste from Clipboard
                    </label>
                </div>
            </div>

            <div className='rounded-lg border dark:border-slate-800 overflow-x-auto'>
                {isLoading ? (
                    <div className='flex justify-center items-center py-12'>
                        <Loader size={32} />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className='dark:bg-slate-900'>
                                <TableHead className='w-1/4 md:w-1/5'>Short Link</TableHead>
                                <TableHead className='w-2/5'>Original Link</TableHead>
                                <TableHead className='w-1/6 text-center'>Clicks</TableHead>
                                <TableHead className='w-1/6 text-center'>Status</TableHead>
                                <TableHead className='w-1/6 hidden md:table-cell'>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {linksData.length > 0 ? (
                                linksData.map((item) => (
                                    <TableRow key={item._id} className='dark:hover:bg-slate-900/50'>
                                        <TableCell className='font-medium'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-xs md:text-sm truncate'>{`${process.env.NEXT_PUBLIC_BASE_URL}/${item.shortLink}`}</span>
                                                <Button variant='ghost' size='sm' className='h-8 w-8 p-0 flex-shrink-0' onClick={() => copyToClipboard(item.shortLink)} aria-label='Copy short link'>
                                                    <Copy className='h-4 w-4' />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className='max-w-[150px] md:max-w-xs truncate' title={item.originalLink}>
                                            <span className='text-xs md:text-sm'>{formatOriginalLink(item.originalLink)}</span>
                                        </TableCell>
                                        <TableCell className='text-center'>{item.clicks}</TableCell>
                                        <TableCell className='text-center'>
                                            <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>{item.status}</span>
                                        </TableCell>
                                        <TableCell className='hidden md:table-cell'>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='text-center py-8 text-muted-foreground'>
                                        No links found. Shorten a URL to get started!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </main>
    );
};

export default Main;
