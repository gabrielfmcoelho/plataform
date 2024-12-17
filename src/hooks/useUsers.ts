import { useState, useEffect } from 'react';
import { User } from '../types';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/users';
import { useToast } from './useToast';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      showToast('Error loading users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await createUser(user);
      setUsers(prev => [...prev, newUser]);
      showToast('User created successfully', 'success');
      return newUser;
    } catch (error) {
      showToast('Error creating user', 'error');
      throw error;
    }
  };

  const editUser = async (user: User) => {
    try {
      const updatedUser = await updateUser(user);
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
      showToast('User updated successfully', 'success');
      return updatedUser;
    } catch (error) {
      showToast('Error updating user', 'error');
      throw error;
    }
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast('User deleted successfully', 'success');
    } catch (error) {
      showToast('Error deleting user', 'error');
      throw error;
    }
  };

  return {
    users,
    loading,
    addUser,
    editUser,
    removeUser,
    refreshUsers: loadUsers,
  };
}