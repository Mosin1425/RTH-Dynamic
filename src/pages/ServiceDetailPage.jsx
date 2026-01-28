import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '@/constants/data';
import { ChevronLeft, ChevronRight, Plus, Trash2, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';

const API_BASE = "https://rajasthantenthouse.com/api";
const ADMIN_TOKEN = "rth-secure-2026";

const stripImages = [
  "/assets/todo1.png",
  "/assets/todo2.jpg",
  "/assets/todo3.jpg",
  "/assets/todo4.jpg",
  "/assets/todo5.jpg",
  "/assets/todo6.jpg",
  "/assets/todo7.jpg",
  "/assets/todo8.jpg",
];

const BeautifulLoader = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      className="w-16 h-16 rounded-full border-4 border-[#5a9b7f]/30 border-t-[#5a9b7f]"
    />
    <p className="mt-4 text-gray-500 text-sm">Loading setups...</p>
  </div>
);

const ServiceDetailPage = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);

  const touchStartX = useRef(0);

  useEffect(() => {
    if (!service) return;

    fetch(`${API_BASE}/get_images.php?type=service&key=${id}`)
      .then(r => r.json())
      .then(d => {
        setImages(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, service]);

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Not Found</div>;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'Rajasthan@1122') {
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
    form.append("type", "service");
    form.append("key", id);
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

  const next = () => setSelected(i => (i + 1) % images.length);
  const prev = () => setSelected(i => (i - 1 + images.length) % images.length);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 60) prev();
    if (dx < -60) next();
  };

  return (
    <div className="min-h-screen bg-white pb-24">

      <SEO
        title={`${service.title} in Bhilwara | Rajasthan Tent House`}
        description={`${service.title} services by Rajasthan Tent House in Bhilwara. Premium setups, professional planning, and complete event execution across Rajasthan.`}
        url={`https://rajasthantenthouse.com/services/${id}`}
      />

      <HeroSection
        title={service.title}
        subtitle="Premium setups crafted for your special moments"
        image="/assets/AI_01.png"
      />

      <div className="container mx-auto px-3 sm:px-4 py-10">

        <div className="bg-gray-50 p-6 sm:p-10 rounded-3xl shadow mb-10">
          <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
            {service.longDescription}
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#5a9b7f] to-[#4a826a] text-white rounded-3xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-bold mb-2">Want this setup for your event?</h3>
          <p className="text-sm mb-5 opacity-90">
            Get an instant quote on WhatsApp with one tap.
          </p>

          <Button
            onClick={() => {
              const msg = encodeURIComponent(
                `I want a quote for "${service.title}". Please contact me.`
              );
              window.open(`https://wa.me/919636798937?text=${msg}`, "_blank");
            }}
            className="w-full bg-white text-[#5a9b7f] font-semibold py-5 text-lg rounded-full"
          >
            Get Instant Quote on WhatsApp
          </Button>
        </div>

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg sm:text-2xl font-bold">Photos</h2>

          {isAdmin ? (
            <>
              <input type="file" id="s-up" className="hidden" accept="image/*" onChange={handleFileUpload} />
              <label htmlFor="s-up" className="flex items-center gap-1 px-3 py-2 bg-[#5a9b7f] text-white rounded-lg text-sm cursor-pointer">
                <Plus size={14} /> Add
              </label>
            </>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => setIsLoginOpen(true)}>
              <Lock size={14} className="mr-1" /> Admin
            </Button>
          )}
        </div>

        {loading ? (
          <BeautifulLoader />
        ) : images.length === 0 ? (
          <div className="text-center text-gray-500 py-16 text-sm sm:text-base">
            No photos yet. Log in as admin to add.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[140px] sm:auto-rows-[180px]">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelected(i)}
                className={`relative overflow-hidden rounded-xl shadow cursor-pointer group ${
                  i % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <img
                  src={img.url}
                  loading="lazy"
                  alt={`${service.title} Setup ${i + 1} – Rajasthan Tent House`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

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

        <div className="mt-12">
          <Link to="/contact">
            <Button className="w-full bg-[#5a9b7f] text-white py-6 text-lg rounded-full">
              Request Quote
            </Button>
          </Link>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stripImages.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full h-36 sm:h-48 object-cover rounded-lg shadow"
              alt={`Event Setup Showcase ${i + 1}`}
            />
          ))}
        </div>
      </section>

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
        {selected !== null && images[selected] && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center touch-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute inset-0" onClick={() => setSelected(null)} />

            <div className="relative z-10">
              <img
                src={images[selected].url}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                draggable={false}
              />

              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white" onClick={(e) => { e.stopPropagation(); prev(); }}>
                <ChevronLeft size={36} />
              </button>

              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white" onClick={(e) => { e.stopPropagation(); next(); }}>
                <ChevronRight size={36} />
              </button>

              <button className="absolute top-4 right-4 text-white" onClick={(e) => { e.stopPropagation(); setSelected(null); }}>
                <X size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetailPage;
