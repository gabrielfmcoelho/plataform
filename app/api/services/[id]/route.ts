import { NextResponse } from 'next/server';
import { mockApplicationsServices } from '@/data/services';
import { handleApiError } from '@/lib/utils/error';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = mockApplicationsServices.find(s => s.id === params.id);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedService = { ...data, id: params.id };
    
    return NextResponse.json(updatedService);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In production, delete from database
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}