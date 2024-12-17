import { NextResponse } from 'next/server';
import { mockCompanyServices } from '@/data/services';
import type { CompanyService } from '@/types/service';

export async function GET() {
  try {
    return NextResponse.json(mockCompanyServices);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company services' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newService: CompanyService = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create company service' },
      { status: 500 }
    );
  }
}