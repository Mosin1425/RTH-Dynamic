import React from 'react';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import CtaBand from '@/components/CtaBand';
import PhotoGallery from '@/components/PhotoGallery';
import { useAdmin } from '@/hooks/useAdmin';
import { useImages } from '@/hooks/useImages';
import { SITE_URL, fallbackGallery } from '@/constants/data';

const GalleryPage = () => {
  const { isAdmin, logout } = useAdmin();
  const { images, loading, uploading, upload, remove } = useImages('gallery', 'main');

  return (
    <div className="overflow-x-clip">
      <SEO
        title="Event Gallery – Wedding & Event Setups in Bhilwara"
        description="Explore our event gallery featuring real wedding and event setups by Rajasthan Tent House in Bhilwara."
        url={`${SITE_URL}/gallery`}
      />

      <PageHero
        eyebrow="Gallery"
        title="Real moments. *Real celebrations.*"
        subtitle="Tap any photo to view it full screen, or request the same setup for your event on WhatsApp."
        image="/assets/006-vmake.jpg"
        crumbs={[{ label: 'Gallery' }]}
      />

      <section className="container py-20 sm:py-24">
        <PhotoGallery
          images={images}
          loading={loading}
          uploading={uploading}
          isAdmin={isAdmin}
          onUpload={upload}
          onRemove={remove}
          onLogout={logout}
          altPrefix="Rajasthan Tent House event setup"
          inputId="gallery-upload"
          fallback={fallbackGallery}
        />
      </section>

      <CtaBand title="Loved a setup? Let’s make it *yours*" />
    </div>
  );
};

export default GalleryPage;
