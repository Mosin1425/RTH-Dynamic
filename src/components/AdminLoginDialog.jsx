import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminLoginDialog = ({ onLogin, onClose }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onLogin(loginData.email, loginData.password);
      toast({ title: "Welcome Admin" });
      onClose();
    } catch (err) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            type="email"
            placeholder="Email"
            autoComplete="username"
            required
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="bg-[#5a9b7f] text-white">
              {submitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginDialog;
