import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Lock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';

const API_BASE = "https://testkd.rajasthantenthouse.com/api";
const ADMIN_TOKEN = "rth-secure-2026";

const Skeleton = () => (
  <div className="rounded-xl bg-gray-200 animate-pulse h-40" />
);

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const touchStartX = useRef(0);

  useEffect(() => {
    fetch(`${API_BASE}/get_images.php?type=gallery&key=main`)
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'password123') {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      setIsLoginOpen(false);
      toast({ title: "Welcome Admin" });
    } else {
      toast({ title: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("type", "gallery");
    form.append("key", "main");
    form.append("image", file);
    form.append("token", ADMIN_TOKEN);

    const res = await fetch(`${API_BASE}/upload_image.php`, { method: "POST", body: form });
    const data = await res.json();

    if (data.error) {
      toast({ title: "Upload Failed", description: data.error, variant: "destructive" });
      return;
    }

    setImages(prev => [{ id: data.id, url: data.url }, ...prev]);
  };

  const handleDelete = async (imgId, e) => {
    e.stopPropagation();
    const form = new FormData();
    form.append("id", imgId);
    form.append("token", ADMIN_TOKEN);

    const res = await fetch(`${API_BASE}/delete_image.php`, { method: "POST", body: form });
    const data = await res.json();

    if (!data.error) {
      setImages(prev => prev.filter(i => i.id !== imgId));
    }
  };

  const next = () => setLightboxIndex(i => (i + 1) % images.length);
  const prev = () => setLightboxIndex(i => (i - 1 + images.length) % images.length);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 60) prev();
    if (dx < -60) next();
  };

  return (
    <div className="min-h-screen bg-white">

      <SEO
        title="Event Gallery – Wedding & Event Setups in Bhilwara"
        description="Explore our event gallery featuring real wedding and event setups by Rajasthan Tent House in Bhilwara. See mandaps, decorations, haldi, DJ nights and more."
        url="https://rajasthantenthouse.com/gallery"
      />

      {/* HERO */}
      <HeroSection
        title="Our Event Gallery"
        subtitle="Real Moments. Real Setups. Real Celebrations."
        image="/assets/001.jpg"
      />

      <div className="container mx-auto px-3 sm:px-4 py-12">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base sm:text-2xl font-bold">Photos</h2>

          {isAdmin ? (
            <div className="flex gap-2">
              <input type="file" id="g-up" className="hidden" onChange={handleFileUpload} />
              <label htmlFor="g-up" className="flex items-center gap-1 bg-[#5a9b7f] text-white px-3 py-2 rounded-lg text-sm cursor-pointer">
                <Plus size={14} /> Add
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAdmin(false);
                  localStorage.removeItem("isAdmin");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsLoginOpen(true)}>
              <Lock size={14} className="mr-1" /> Admin
            </Button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[120px]">
            {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-gray-500 py-16 text-sm sm:text-base">
            No photos yet. Log in as admin to add.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[120px]">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer group
                  ${i % 7 === 0 ? 'sm:row-span-2 sm:col-span-2' : 'row-span-2'}
                `}
              >
                <img
                  src={img.url}
                  loading="lazy"
                  alt={`Rajasthan Tent House Event Setup ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />

                {/* CTA */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const msg = encodeURIComponent(
                        `I want this setup from your gallery.\nImage: ${img.url}`
                      );
                      window.open(`https://wa.me/919636798937?text=${msg}`, "_blank");
                    }}
                    className="w-full bg-[#5a9b7f] text-white text-sm py-2 rounded-lg"
                  >
                    I want this setup
                  </button>
                </div>

                {isAdmin && (
                  <button
                    onClick={(e) => handleDelete(img.id, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full z-20"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Admin Login</h3>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Username"
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded"
                type="password"
                placeholder="Password"
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsLoginOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#5a9b7f] text-white">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center touch-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />

            <div className="relative z-10">
              <img
                src={images[lightboxIndex].url}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                draggable={false}
              />

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={36} />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={36} />
              </button>

              <button
                className="absolute top-4 right-4 text-white"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              >
                <X size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
