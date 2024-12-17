import { NextResponse } from 'next/server';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  icon: z.string(),
});

export async function GET() {
  try {
    // In production, fetch from database
    const categories = [
      { id: '1', name: 'Clinical', description: 'Clinical services', icon: 'Clinical' },
      { id: '2', name: 'Laboratory', description: 'Laboratory services', icon: 'Laboratory' },
      { id: '3', name: 'Analytics', description: 'Analytics services', icon: 'Analytics' },
    ];
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = categorySchema.parse(data);
    
    const newCategory = {
      ...validatedData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}