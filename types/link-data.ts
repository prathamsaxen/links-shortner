export interface LinkData {
    _id: string;
    shortLink: string;
    originalLink: string;
    clicks: number;
    status: 'Active' | 'Inactive';
    createdAt: string;
}