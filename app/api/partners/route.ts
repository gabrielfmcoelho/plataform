import { NextResponse } from 'next/server';
import { mockPartners } from '@/data/partners';
import type { Partner } from '@/types/partner';

export async function GET() {
  try {
    return NextResponse.json(mockPartners);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newPartner: Partner = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    );
  }
}