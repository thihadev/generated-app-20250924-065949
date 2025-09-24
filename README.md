# Thadingyut Celestial Wish

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/thihadev/make-a-wish)

An illustrative and whimsical web application celebrating the Myanmar festival of Thadingyut. The application provides a visually stunning, interactive experience where users can learn about the festival, make a wish through a beautifully designed form, and see their wish transform into a glowing, animated lantern that floats into a celestial gallery. The core of the application is a dynamic 'sky' filled with wishes from users around the world, creating a collective celebration of light and hope. The design is heavily inspired by traditional Burmese art, featuring custom illustrations, playful animations, and a warm, inviting color palette.

## Key Features

*   **Interactive Festival Experience:** A beautiful single-page application introducing the Thadingyut festival.
*   **Make a Wish:** A simple and elegant form for users to submit their name and a wish.
*   **Celestial Wish Gallery:** Submitted wishes are transformed into animated, glowing lanterns that float up into a dynamic night sky.
*   **Real-time Updates:** See new wishes appear as lanterns in the gallery without needing to refresh the page.
*   **Stunning Visuals:** A dark, celestial theme with custom SVG illustrations, glowing effects, and smooth animations powered by Framer Motion.
*   **Responsive Design:** A flawless experience across all devices, from mobile phones to desktops.

## Technology Stack

*   **Frontend:**
    *   React & Vite
    *   TypeScript
    *   Tailwind CSS for styling
    *   shadcn/ui for pre-built components
    *   Framer Motion for animations
    *   Zustand for state management
    *   React Hook Form & Zod for form validation
*   **Backend:**
    *   Cloudflare Workers for serverless functions
    *   Hono as the web framework
    *   Cloudflare Durable Objects for persistent, real-time state

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Bun](https://bun.sh/) as the package manager and runtime
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for interacting with the Cloudflare platform.

```bash
bun install -g wrangler
```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd thadingyut_celestial_wish
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

3.  **Run the development server:**
    This command starts the Vite development server for the frontend and the Wrangler development server for the backend worker simultaneously.
    ```bash
    bun run dev
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

*   `src/`: Contains the frontend React application source code.
    *   `pages/`: Main application pages.
    *   `components/`: Reusable React components.
    *   `hooks/`: Custom React hooks, including the Zustand store.
*   `worker/`: Contains the Cloudflare Worker backend code.
    *   `user-routes.ts`: API route definitions using Hono.
    *   `entities.ts`: Durable Object entity definitions.
*   `shared/`: Contains TypeScript types shared between the frontend and the backend.

## Development

The application is architected with a separate frontend and backend that communicate via a simple API.

*   **Backend API:** The Hono server runs in `worker/index.ts` and serves all routes under `/api/`. To add or modify API endpoints, edit `worker/user-routes.ts`.
*   **Data Entities:** Data persistence is handled by Cloudflare Durable Objects. Entity schemas and logic are defined in `worker/entities.ts`.
*   **Frontend State:** Global state on the frontend is managed with Zustand. The store for wishes is located at `src/hooks/useWishesStore.ts`.

## Deployment

This project is designed for easy deployment to the Cloudflare network.

1.  **Build the application:**
    This command bundles the frontend and backend code for production.
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    This command deploys your application using the Wrangler CLI. You will need to be logged into your Cloudflare account.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/thihadev/make-a-wish)