import { NextResponse } from 'next/server';
import { mockUserMetrics } from '@/data/user-metrics';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const metrics = mockUserMetrics.find(m => m.userId === userId);
    
    if (!metrics) {
      return NextResponse.json(
        { error: 'Metrics not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}