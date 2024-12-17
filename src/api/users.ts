import { User } from '../types';
import { mockUsers } from '../data/mockData';

const API_BASE_URL = 'https://api.solude.tech';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch users, using mock data:', error);
    return mockUsers;
  }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  } catch (error) {
    console.warn('Failed to create user, using mock implementation:', error);
    return { ...user, id: Date.now().toString() };
  }
}

export async function updateUser(user: User): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.warn('Failed to update user, using mock implementation:', error);
    return user;
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  } catch (error) {
    console.warn('Failed to delete user, using mock implementation:', error);
  }
}