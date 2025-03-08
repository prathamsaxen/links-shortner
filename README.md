# Link Shortener - Documentation

## Overview

Link Shortener is a Next.js-based URL shortening service that allows users to convert long URLs into short, easy-to-share links. The application supports features such as auto-pasting from the clipboard, link management, and tracking click statistics.

## Features

-   Shorten long URLs quickly.
-   Auto-paste URLs from the clipboard.
-   View previously shortened links.
-   Copy shortened links to the clipboard.
-   Track the number of clicks per link.
-   Dark mode support.

## Tech Stack

-   **Frontend**: Next.js (React 19), TailwindCSS
-   **UI Components**: Radix UI, Lucide React Icons
-   **State Management**: React Hooks
-   **Linting**: ESLint
-   **Styling**: TailwindCSS, class-variance-authority, tailwind-merge

## Installation & Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/link-shortener.git
    cd link-shortener
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env.local` file and configure environment variables:
    ```sh
    NEXT_PUBLIC_ENDPOINT=http://localhost:3000/api
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```
4. Run the development server:
    ```sh
    npm run dev
    ```
5. Open the application in the browser at `http://localhost:3000`

## Project Structure

```
link-shortener/
│── components/
│   ├── ui/button.tsx
│   ├── ui/input.tsx
│   ├── ui/switch.tsx
│   ├── ui/table.tsx
│── lib/
│   ├── utils.ts
│── types/
│   ├── link-data.ts
│── app/
│   ├── api/
│   │   ├── links.ts
│   ├── page.tsx
│── styles/
│── public/
│── .env.local
│── package.json
│── tailwind.config.js
│── next.config.js
```

## API Endpoints

### `GET /api/links`

Fetches all shortened links.

**Response:**

```json
[
    {
        "_id": "123456",
        "shortLink": "abc123",
        "originalLink": "https://example.com",
        "clicks": 10,
        "status": "Active",
        "createdAt": "2024-03-08T12:00:00Z"
    }
]
```

### `POST /api/links`

Creates a new shortened link.

**Request Body:**

```json
{
    "originalLink": "https://example.com"
}
```

**Response:**

```json
{
    "shortLink": "xyz456",
    "originalLink": "https://example.com",
    "clicks": 0,
    "status": "Active",
    "createdAt": "2024-03-08T12:10:00Z"
}
```

## Usage

1. Enter the long URL in the input field.
2. Click on "Shorten Now!" to generate a shortened link.
3. Copy the short link using the copy button.
4. View previously shortened links in the table.

## Development & Contribution

-   Fork the repository and create a new feature branch.
-   Follow best practices for coding and styling.
-   Submit a pull request with a detailed description.

## Project Screenshot

![Project Screenshot](https://your-screenshot-link.com)

## Author & Social Media Links

-   **Author**: Pratham Saxena
-   **GitHub**: [github.com/prathamsaxena](https://github.com/prathamsaxen)
-   **LinkedIn**: [linkedin.com/in/prathamsaxena](https://www.linkedin.com/in/prathamsaxena)

## License

This project is licensed under the MIT License.

---

For further assistance, contact the project maintainer.
