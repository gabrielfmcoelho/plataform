export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
  lattes?: string;
  publications?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface TeamNews {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  authorId: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}