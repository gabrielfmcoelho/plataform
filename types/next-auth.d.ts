import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'admin' | 'manager' | 'staff' | 'guest';
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'staff' | 'guest';
  }
}