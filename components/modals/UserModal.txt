'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { User, PublicUser, CreateUser, UserRole } from '@/types/user';

interface UserModalProps {
  isOpen: boolean;
  user: CreateUser | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const mockEmptyCreateUser: CreateUser = {
    organizationId: 0,
    name: '',
    prefix: null,
    email: '',
    password: '',
    role: 'staff',
  }

export default function UserModal({ isOpen, user, onClose, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<Omit<CreateUser, 'id'>>(mockEmptyCreateUser);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData(mockEmptyCreateUser);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //onSave();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X />
        </button>
        <h3 className="text-lg font-semibold">{user ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">{user ? 'Save Changes' : 'Add User'}</button>
        </form>
      </div>
    </div>
  );
}
