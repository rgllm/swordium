# Swordium

A social news platform, similar to Medium, where registered users can
read and share news articles with the community.

![CleanShot 2025-05-12 at 16 17 36@2x](https://github.com/user-attachments/assets/e81ab43d-491e-4721-8c78-bf0160adcdd5)

## Tech Stack

- **Framework**: Next.js
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Authentication**: Clerk
- **UI Components**: shadcn UI
- **Icons**: Lucide React
- **Testing**: Jest (unit/integration) + Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js 20.x or higher (see `.nvmrc`)
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rgllm/swordium.git
   cd swordium
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create or modify `.env.local` with necessary credentials

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

### Unit

Run tests with:

```bash
pnpm test
```

### E2E Tests

Run E2E tests in headless mode:

```bash
pnpm test:e2e
```

Run E2E tests with UI mode:

```bash
pnpm test:e2e:ui
```

E2E tests are located in the `e2e` directory at the project root.
