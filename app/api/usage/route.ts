import { NextResponse } from 'next/server';
import { z } from 'zod';

const usageSchema = z.object({
  userId: z.string(),
  serviceId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  duration: z.number().min(0),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = usageSchema.parse(data);
    
    // In production, save to database
    const usage = {
      ...validatedData,
      id: Date.now().toString(),
    };
    
    return NextResponse.json(usage, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to record usage' },
      { status: 500 }
    );
  }
}