import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import SplitText from '@/components/motion/SplitText';

const NotFoundPage = () => (
  <section className="grain relative flex min-h-[90svh] items-center overflow-hidden bg-emerald-950 pt-24 text-center">
    <Helmet>
      <title>Page not found | Rajasthan Tent House</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="pattern-jaali absolute inset-0 opacity-40" />
    <div className="container relative">
      <p className="font-display text-[9rem] font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,200,115,0.6)] sm:text-[14rem]">404</p>
      <SplitText as="h1" animateOnMount text="This page has *left the party*" className="mt-2 text-4xl font-semibold text-ivory sm:text-6xl" />
      <p className="mx-auto mt-5 max-w-md text-ivory/65">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn-gold mt-10">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  </section>
);

export default NotFoundPage;
