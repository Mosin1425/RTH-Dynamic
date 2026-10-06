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
    <div className="flex min-h-[80vh] items-center justify-center bg-ivory px-4 pb-16 pt-32">
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
    <div className="w-full max-w-sm rounded-3xl border bg-white p-6 shadow-xl sm:p-8">
      <h1 className="mb-6 text-4xl font-semibold text-emerald-900">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded-xl border px-3 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-300/30"
          type="email"
          placeholder="Email"
          autoComplete="username"
          required
          onChange={e => setLoginData({ ...loginData, email: e.target.value })}
        />
        <input
          className="w-full rounded-xl border px-3 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-300/30"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          onChange={e => setLoginData({ ...loginData, password: e.target.value })}
        />
        <Button type="submit" disabled={submitting} className="w-full rounded-full bg-emerald-800 text-ivory hover:bg-emerald-700">
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
    <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-xl sm:p-8">
      <h1 className="mb-1 text-4xl font-semibold text-emerald-900">Admin</h1>
      <p className="text-gray-600 text-sm mb-6">Open a page to add or delete its photos.</p>

      <div className="space-y-2">
        {pages.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium hover:border-emerald-600 hover:bg-emerald-50 transition"
          >
            <Icon size={18} className="text-emerald-600" />
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
