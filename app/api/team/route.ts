import { NextResponse } from 'next/server';
import { mockTeamMembers, mockTeamNews } from '@/data/team';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'news') {
      return NextResponse.json(mockTeamNews);
    }
    return NextResponse.json(mockTeamMembers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}