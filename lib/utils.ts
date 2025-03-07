import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const isValidUrl = (str: string) => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
            'localhost|' + // localhost
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IPv4 address
            '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*' + // port and path
            '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z0-9_]*)?$', // fragment locator
        'i'
    );
    return urlPattern.test(str);
};

export { isValidUrl };
