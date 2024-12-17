import { NextResponse } from 'next/server';
import { mockApplicationsServices } from '@/data/services';
import type { ApplicationService } from '@/types/service';

export async function GET() {
  try {
    // In production, fetch from actual API
    return NextResponse.json(mockApplicationsServices);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newService: ApplicationService = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In production, save to database
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}