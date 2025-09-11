'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Crown,
  User,
  Mail,
  Calendar,
  Shield,
  ShieldCheck,
  Edit3,
  Trash2,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Eye,
  Clock
} from 'lucide-react';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  isAdmin: boolean;
  createdAt: Date;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  metadata?: {
    createdBy?: string;
    promotedToAdminAt?: Date;
    promotedBy?: string;
  };
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: UserData) => void;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onUserUpdated: (user: UserData) => void;
}

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onUserDeleted: (uid: string) => void;
}

interface RoleChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onRoleChanged: (user: UserData) => void;
}

// Add User Modal Component
function AddUserModal({ isOpen, onClose, onUserAdded }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'user' as 'admin' | 'user',
    createAccount: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        onUserAdded({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.name || formData.name,
          role: formData.role,
          isAdmin: formData.role === 'admin',
          createdAt: new Date(),
          status: 'active'
        });
        
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setFormData({ email: '', name: '', role: 'user', createAccount: true });
        }, 1500);
      } else {
        setError(result.error || 'Failed to add user');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', name: '', role: 'user', createAccount: true });
    setError(null);
    setSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent-green to-accent-green/80 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/10 rounded-xl">
                <Users className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">Add New User</h2>
                <p className="text-black/70 text-sm">Create a new user account</p>
              </div>
            </div>
            <button
              onClick={() => { onClose(); resetForm(); }}
              className="p-2 hover:bg-black/10 rounded-xl transition-colors"
            >
              <X size={20} className="text-black" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
          {/* Success State */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">User added successfully!</span>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </motion.div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green focus:bg-white transition-all text-gray-900"
                placeholder="user@absterco.com"
              />
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green focus:bg-white transition-all text-gray-900"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              User Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
                className={`p-4 border-2 rounded-xl transition-all ${
                  formData.role === 'user'
                    ? 'border-accent-green bg-accent-green/5 text-accent-green'
                    : 'border-gray-200 hover:border-gray-300 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">User</div>
                    <div className="text-xs text-gray-500">Standard access</div>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                className={`p-4 border-2 rounded-xl transition-all ${
                  formData.role === 'admin'
                    ? 'border-accent-green bg-accent-green/5 text-accent-green'
                    : 'border-gray-200 hover:border-gray-300 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-gray-500">Full access</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Create Account Option */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <input
              type="checkbox"
              id="createAccount"
              checked={formData.createAccount}
              onChange={(e) => setFormData(prev => ({ ...prev, createAccount: e.target.checked }))}
              className="w-4 h-4 text-accent-green border-gray-300 rounded focus:ring-accent-green/20"
            />
            <label htmlFor="createAccount" className="text-sm text-gray-900 font-medium">
              Create new account if user doesn't exist
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => { onClose(); resetForm(); }}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.email || success}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-accent-green to-accent-green/80 text-black font-semibold rounded-xl hover:from-accent-green/90 hover:to-accent-green/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                  />
                  Adding...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={16} />
                  Added!
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add User
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Role Change Modal Component
function RoleChangeModal({ isOpen, onClose, user, onRoleChanged }: RoleChangeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newRole, setNewRole] = useState<'admin' | 'user'>(user?.role || 'user');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setNewRole(user.role);
      setError(null);
      setSuccess(false);
    }
  }, [user]);

  const handleRoleChange = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          uid: user.uid,
          role: newRole
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const updatedUser = {
          ...user,
          role: newRole,
          isAdmin: newRole === 'admin',
          metadata: {
            ...user.metadata,
            ...(newRole === 'admin' && { promotedToAdminAt: new Date() }),
            promotedBy: result.user?.promotedBy || 'current-admin@absterco.com'
          }
        };
        
        setSuccess(true);
        onRoleChanged(updatedUser);
        
        // Close modal after short delay to show success state
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 1500);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setError(result.error || 'Failed to update user role');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  const isChangingRole = newRole !== user.role;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Change User Role</h2>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Select New Role
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setNewRole('user')}
                className={`w-full p-4 border-2 rounded-xl transition-all ${
                  newRole === 'user'
                    ? 'border-accent-green bg-accent-green/5 text-accent-green'
                    : 'border-gray-200 hover:border-gray-300 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className={`w-5 h-5 ${newRole === 'user' ? 'text-accent-green' : 'text-gray-600'}`} />
                  <div className="text-left">
                    <div className="font-medium">User</div>
                    <div className="text-xs text-gray-500">Standard access to user features</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setNewRole('admin')}
                className={`w-full p-4 border-2 rounded-xl transition-all ${
                  newRole === 'admin'
                    ? 'border-accent-green bg-accent-green/5 text-accent-green'
                    : 'border-gray-200 hover:border-gray-300 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Crown className={`w-5 h-5 ${newRole === 'admin' ? 'text-accent-green' : 'text-amber-500'}`} />
                  <div className="text-left">
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-gray-500">Full access to all features</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Success State */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Role updated successfully!</span>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </motion.div>
          )}

          {isChangingRole && !error && !success && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium text-sm">Role Change Warning</p>
                  <p className="text-amber-700 text-sm mt-1">
                    This will {newRole === 'admin' ? 'grant' : 'revoke'} administrative privileges.
                    The user will need to sign out and back in for changes to take effect.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleRoleChange}
              disabled={isLoading || !isChangingRole || success}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Updating...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={16} />
                  Updated!
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Update Role
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Edit User Modal Component
function EditUserModal({ isOpen, onClose, user, onUserUpdated }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    disabled: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        disabled: user.status === 'inactive'
      });
      setError(null);
      setSuccess(false);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/edit-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          disabled: formData.disabled
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const updatedUser: UserData = {
          ...user,
          name: formData.name,
          email: formData.email,
          status: formData.disabled ? 'inactive' as const : 'active' as const
        };
        
        setSuccess(true);
        onUserUpdated(updatedUser);
        
        // Close modal after short delay
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 1500);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setError(result.error || 'Failed to update user');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Edit3 className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Edit User</h2>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
          {/* Success State */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">User updated successfully!</span>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </motion.div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all text-gray-900"
              placeholder="Enter full name"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all text-gray-900"
              placeholder="Enter email address"
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Account Status</p>
              <p className="text-sm text-gray-600">
                {formData.disabled ? 'Account is disabled' : 'Account is active'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, disabled: !prev.disabled }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.disabled ? 'bg-gray-300' : 'bg-green-500'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.disabled ? 'translate-x-1' : 'translate-x-6'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || success}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Updating...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={16} />
                  Updated!
                </>
              ) : (
                <>
                  <Edit3 size={16} />
                  Update User
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Delete User Modal Component
function DeleteUserModal({ isOpen, onClose, user, onUserDeleted }: DeleteUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    if (user) {
      setError(null);
      setConfirmText('');
    }
  }, [user]);

  const handleDelete = async () => {
    if (!user || confirmText !== 'DELETE') return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          uid: user.uid
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onUserDeleted(user.uid);
        onClose();
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setError(result.error || 'Failed to delete user');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  const canDelete = confirmText === 'DELETE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trash2 className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Delete User</h2>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white">
          {/* Warning */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium text-sm">Permanent Action</p>
                <p className="text-red-700 text-sm mt-1">
                  This will permanently delete the user account and all associated data. 
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">User to delete:</p>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">
                Role: {user.role} • Status: {user.status}
              </p>
            </div>
          </div>

          {/* Confirmation */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Type <span className="font-mono bg-gray-100 px-1 rounded">DELETE</span> to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all text-gray-900"
              placeholder="Type DELETE"
            />
          </div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading || !canDelete}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete User
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main User Management Component
export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/users', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.users)) {
          setUsers(result.users.map((user: any) => ({
            ...user,
            createdAt: new Date(user.createdAt),
            lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
          })));
        } else {
          console.error('Invalid response format from API');
          setUsers([]);
        }
      } else if (response.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = '/admin/login';
        return;
      } else {
        console.error(`API error: ${response.status}`);
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to load users from Firebase:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAdded = (newUser: UserData) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleRoleChanged = (updatedUser: UserData) => {
    setUsers(prev => prev.map(user => 
      user.uid === updatedUser.uid ? updatedUser : user
    ));
  };

  const handleUserUpdated = (updatedUser: UserData) => {
    setUsers(prev => prev.map(user => 
      user.uid === updatedUser.uid ? updatedUser : user
    ));
  };

  const handleUserDeleted = (uid: string) => {
    setUsers(prev => prev.filter(user => user.uid !== uid));
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleChangeRole = (user: UserData) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const refreshUsers = async () => {
    await loadUsers();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Show loading state during initial load
  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-accent-green/30 border-t-accent-green rounded-full mx-auto mb-4"
            />
            <p className="text-white/60">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-7 h-7 text-accent-green" />
            User Management
          </h1>
          <p className="text-white/60 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={refreshUsers}
            disabled={isLoading}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white/70 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-green to-accent-green/80 text-black font-medium rounded-xl hover:from-accent-green/90 hover:to-accent-green/70 transition-all duration-200 shadow-lg"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Users</p>
              <p className="text-white text-xl font-bold">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Admins</p>
              <p className="text-white text-xl font-bold">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Active</p>
              <p className="text-white text-xl font-bold">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Recent Logins</p>
              <p className="text-white text-xl font-bold">
                {users.filter(u => u.lastLogin && u.lastLogin > new Date(Date.now() - 86400000)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/60" />
              <span className="text-white/60 text-sm">Filter:</span>
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/50"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="user">Users</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="text-left p-4 text-white/90 font-semibold text-sm tracking-wide">User</th>
                <th className="text-left p-4 text-white/90 font-semibold text-sm tracking-wide">Role</th>
                <th className="text-left p-4 text-white/90 font-semibold text-sm tracking-wide">Status</th>
                <th className="text-left p-4 text-white/90 font-semibold text-sm tracking-wide hidden md:table-cell">Last Login</th>
                <th className="text-left p-4 text-white/90 font-semibold text-sm tracking-wide hidden lg:table-cell">Created</th>
                <th className="text-right p-4 text-white/90 font-semibold text-sm tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.uid}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ 
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className="border-b border-white/10 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-green to-accent-green/70 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white/10 group-hover:ring-accent-green/30 transition-all">
                          <span className="text-black font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-semibold truncate">{user.name || 'Unnamed User'}</p>
                          <p className="text-white/60 text-sm truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' ? (
                          <>
                            <Crown className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 font-semibold text-sm">Admin</span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-semibold text-sm">User</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-white/70 text-sm font-medium">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-white/70 text-sm font-medium">
                        {formatDate(user.createdAt)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleChangeRole(user)}
                          className="p-2.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-200 hover:shadow-sm"
                          title="Change Role"
                        >
                          <Shield className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-200 hover:shadow-sm"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditUser(user)}
                          className="p-2.5 hover:bg-blue-500/20 rounded-lg text-white/60 hover:text-blue-400 transition-all duration-200 hover:shadow-sm"
                          title="Edit User"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteUser(user)}
                          className="p-2.5 hover:bg-red-500/20 rounded-lg text-white/60 hover:text-red-400 transition-all duration-200 hover:shadow-sm"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-200 hover:shadow-sm"
                          title="More Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center"
          >
            <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg font-medium">
              {users.length === 0 ? 'No users found in Firebase' : 'No users match your filters'}
            </p>
            <p className="text-white/40 text-sm mt-1">
              {users.length === 0 
                ? 'Add your first user to get started'
                : searchTerm || filterRole !== 'all' || filterStatus !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'All users are filtered out'
              }
            </p>
            {users.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-green to-accent-green/80 text-black font-medium rounded-xl hover:from-accent-green/90 hover:to-accent-green/70 transition-all duration-200 shadow-lg mx-auto"
              >
                <Plus size={18} />
                Add First User
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <AddUserModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onUserAdded={handleUserAdded}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoleModal && (
          <RoleChangeModal
            isOpen={showRoleModal}
            onClose={() => setShowRoleModal(false)}
            user={selectedUser}
            onRoleChanged={handleRoleChanged}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && (
          <EditUserModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            user={selectedUser}
            onUserUpdated={handleUserUpdated}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <DeleteUserModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            user={selectedUser}
            onUserDeleted={handleUserDeleted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
