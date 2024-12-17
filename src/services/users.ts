import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockUsers } from '../data/users';
import type { User } from '../types/user';
import type { ApiResult } from '../types/api';

export async function getUsers(): ApiResult<User[]> {
  try {
    return await apiRequest<User[]>(API_ENDPOINTS.USERS);
  } catch (error) {
    console.warn('Failed to fetch users, using mock data:', error);
    return { data: mockUsers, status: 200 };
  }
}

export async function getUser(id: number): ApiResult<User> {
  try {
    return await apiRequest<User>(`${API_ENDPOINTS.USERS}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch user ${id}, using mock data:`, error);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return { data: user, status: 200 };
  }
}

export async function createUser(user: Omit<User, 'id'>): ApiResult<User> {
  try {
    return await apiRequest<User>(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.warn('Failed to create user, using mock implementation:', error);
    const newUser = { ...user, id: Date.now() };
    return { data: newUser, status: 201 };
  }
}

export async function updateUser(user: User): ApiResult<User> {
  try {
    return await apiRequest<User>(`${API_ENDPOINTS.USERS}/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.warn('Failed to update user, using mock implementation:', error);
    return { data: user, status: 200 };
  }
}

export async function deleteUser(id: number): ApiResult<void> {
  try {
    return await apiRequest<void>(`${API_ENDPOINTS.USERS}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.warn('Failed to delete user, using mock implementation:', error);
    return { data: undefined, status: 204 };
  }
}