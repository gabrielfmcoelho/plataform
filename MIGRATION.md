# Migrating from Vite to Next.js App Router

This guide outlines the process of migrating a Vite React application to Next.js using the App Router architecture.

## 1. Project Setup

First, create a new Next.js project:

```bash
npx create-next-app@latest my-next-app --typescript --tailwind --eslint
```

## 2. File Structure Migration

### 2.1 Root Layout

Create the root layout in `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hospital Management Platform',
  description: 'Advanced healthcare management solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 2.2 Page Migration

Convert existing pages to Next.js App Router format:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── layout.tsx          # Auth layout
├── (dashboard)/
│   ├── hub/
│   │   └── page.tsx        # Home page
│   ├── admin/
│   │   └── page.tsx        # Admin page
│   ├── settings/
│   │   └── page.tsx        # Settings page
│   └── layout.tsx          # Dashboard layout
├── services/
│   └── page.tsx            # Landing page
└── page.tsx                # Company page
```

### 2.3 Component Migration

Move components to a dedicated directory:

```
components/
├── ui/                     # Reusable UI components
├── forms/                  # Form components
├── layout/                # Layout components
└── features/              # Feature-specific components
```

## 3. Routing Updates

### 3.1 Replace React Router with App Router

Before (Vite):
```typescript
<Router>
  <Routes>
    <Route path="/" element={<Company />} />
    <Route path="/services" element={<Landing />} />
  </Routes>
</Router>
```

After (Next.js):
```typescript
// app/page.tsx
export default function Home() {
  return <Company />;
}

// app/services/page.tsx
export default function Services() {
  return <Landing />;
}
```

### 3.2 Update Navigation

Before (Vite):
```typescript
import { Link, useNavigate } from 'react-router-dom';

<Link to="/services">Services</Link>
const navigate = useNavigate();
navigate('/services');
```

After (Next.js):
```typescript
import Link from 'next/link';
import { useRouter } from 'next/navigation';

<Link href="/services">Services</Link>
const router = useRouter();
router.push('/services');
```

## 4. API Integration

### 4.1 Create API Routes

Create API routes in `app/api`:

```typescript
// app/api/services/route.ts
import { NextResponse } from 'next/server';
import type { ApplicationService } from '@/types/service';

export async function GET() {
  try {
    const response = await fetch('http://192.0.0.1:8080/api/services');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
```

### 4.2 Update API Calls

Before (Vite):
```typescript
const API_BASE_URL = 'http://192.0.0.1:8080/api';

export async function getServices() {
  const response = await fetch(`${API_BASE_URL}/services`);
  return response.json();
}
```

After (Next.js):
```typescript
export async function getServices() {
  const response = await fetch('/api/services');
  return response.json();
}
```

## 5. Authentication Migration

### 5.1 Update Auth Context

```typescript
// app/contexts/auth-context.tsx
'use client';

import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  return (
    <AuthContext.Provider value={{ session, status }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 5.2 Configure NextAuth.js

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        // Implement your auth logic here
      }
    })
  ]
});

export { handler as GET, handler as POST };
```

## 6. Environment Variables

Move environment variables to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://192.0.0.1:8080/api
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## 7. Static Assets

Move static assets to the `public` directory:

```
public/
├── images/
├── icons/
└── fonts/
```

Update image imports:
```typescript
// Before (Vite)
import logo from '../assets/logo.png';

// After (Next.js)
import Image from 'next/image';
<Image src="/images/logo.png" alt="Logo" width={100} height={100} />
```

## 8. Data Fetching

### 8.1 Server Components

```typescript
// app/services/page.tsx
async function getServices() {
  const res = await fetch('http://192.0.0.1:8080/api/services', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesList services={services} />;
}
```

### 8.2 Client Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/services/api';

export default function ServicesList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return <div>{/* Render services */}</div>;
}
```

## 9. Middleware

Add middleware for authentication and routing:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  if (!token && request.nextUrl.pathname.startsWith('/hub')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/hub/:path*', '/admin/:path*', '/settings/:path*']
};
```

## 10. Testing

### 10.1 Update Test Configuration

```typescript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
});
```

### 10.2 Update Test Files

```typescript
// Before (Vite)
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// After (Next.js)
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
```

## Common Gotchas

1. Server Components:
   - Default to server components unless you need client-side interactivity
   - Add 'use client' directive only when necessary

2. Data Fetching:
   - Use server components for initial data fetching
   - Implement proper error boundaries and loading states

3. Authentication:
   - Middleware runs before pages/layouts
   - Protected routes should check auth status

4. Image Optimization:
   - Always use next/image for optimal performance
   - Configure domains in next.config.js

5. API Routes:
   - Keep sensitive logic in API routes
   - Implement proper error handling and validation

## Performance Optimization

1. Enable static optimization where possible:
```typescript
export const dynamic = 'force-static';
```

2. Implement proper caching strategies:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

3. Use route segments for code splitting:
```
app/
├── (marketing)/      # Marketing pages
└── (dashboard)/      # Dashboard pages
```

## Final Steps

1. Update dependencies in package.json
2. Configure next.config.js
3. Update tsconfig.json
4. Test all routes and functionality
5. Deploy to production