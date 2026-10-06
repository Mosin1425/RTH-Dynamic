import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Images, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { servicesData } from '@/constants/data';
import { useAdmin } from '@/hooks/useAdmin';

// Unlisted page: nothing on the site links here. Visit /admin directly to sign in,
// then the photo pages show Add/Delete controls.
const AdminPage = () => {
  const { isAdmin, ready, login, logout } = useAdmin();

  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>Admin | Rajasthan Tent House</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {ready && (isAdmin ? <AdminHome onLogout={logout} /> : <LoginForm onLogin={login} />)}
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onLogin(loginData.email, loginData.password);
      toast({ title: "Welcome Admin" });
    } catch (err) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6 sm:p-8 w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
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
        <Button type="submit" disabled={submitting} className="w-full bg-[#5a9b7f] text-white">
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

const AdminHome = ({ onLogout }) => {
  const pages = [
    { to: "/gallery", label: "Event Gallery", icon: Images },
    ...servicesData.map(s => ({ to: `/services/${s.id}`, label: s.title, icon: s.icon })),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6 sm:p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold mb-1">Admin</h1>
      <p className="text-gray-600 text-sm mb-6">Open a page to add or delete its photos.</p>

      <div className="space-y-2">
        {pages.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium hover:border-[#5a9b7f] hover:bg-[#5a9b7f]/5 transition"
          >
            <Icon size={18} className="text-[#5a9b7f]" />
            {label}
          </Link>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-6" onClick={onLogout}>
        <LogOut size={16} className="mr-2" /> Logout
      </Button>
    </div>
  );
};

export default AdminPage;
