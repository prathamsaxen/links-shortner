import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Link } from 'lucide-react';

function Main() {
    const [autoPaste, setAutoPaste] = useState(false);
    const [url, setUrl] = useState('');

    const sampleData = [
        {
            shortLink: 'https://linkly.com/Bn41aCOlnxj',
            originalLink: 'https://www.twitter.com/tweets/9eralColhu/',
            platform: 'twitter',
            clicks: '1313',
            status: 'Active',
            date: 'Oct - 10 -2023'
        },
        {
            shortLink: 'https://linkly.com/Bn41aCOlnxj',
            originalLink: 'https://www.youtube.com/watch?v-BJ7ZmHOlXuk',
            platform: 'youtube',
            clicks: '4313',
            status: 'Inactive',
            date: 'Oct - 08 -2023'
        }
    ];
    return (
        <main className='container mx-auto px-4 py-12'>
            <div className='text-center max-w-3xl mx-auto mb-12'>
                <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 text-transparent bg-clip-text'>Shorten Your Loooong Links :)</h2>
                <p className='text-muted-foreground'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
            </div>

            <div className='max-w-2xl mx-auto mb-12'>
                <div className='relative'>
                    <Input placeholder='Enter the link here' className='pr-32 h-12 dark:bg-slate-900' type='url' value={url} onChange={(e) => setUrl(e.target.value)} />
                    <Button className='absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 h-10'>Shorten Now!</Button>
                </div>

                <div className='flex items-center gap-2 mt-4 justify-center'>
                    <Switch checked={autoPaste} onCheckedChange={setAutoPaste} className='data-[state=checked]:bg-blue-600' />
                    <label className='text-sm text-muted-foreground'>Auto Paste from Clipboard</label>
                </div>

                <p className='text-sm text-center mt-4 text-muted-foreground'>
                    You can create <span className='text-pink-500'>05</span> more links.{' '}
                    <Button variant='link' className='text-blue-600 p-0'>
                        Register Now
                    </Button>{' '}
                    to enjoy Unlimited usage
                </p>
            </div>

            <div className='rounded-lg border dark:border-slate-800 overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow className='dark:bg-slate-900'>
                            <TableHead>Short Link</TableHead>
                            <TableHead>Original Link</TableHead>
                            <TableHead>QR Code</TableHead>
                            <TableHead>Clicks</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sampleData.map((item, index) => (
                            <TableRow key={index} className='dark:hover:bg-slate-900/50'>
                                <TableCell className='font-medium'>
                                    <div className='flex items-center gap-2'>
                                        {item.shortLink}
                                        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                                            <Copy className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center'>
                                            <img src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.platform}&size=128`} alt={item.platform} width={16} height={16} />
                                        </div>
                                        {item.originalLink}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center'>
                                        <Link className='w-4 h-4' />
                                    </div>
                                </TableCell>
                                <TableCell>{item.clicks}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>{item.status}</span>
                                </TableCell>
                                <TableCell>{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    );
}

export default Main;
