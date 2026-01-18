import React from "react";
import { Helmet } from "react-helmet";

const faqs = [
  {
    q: "Which is the best tent house in Bhilwara?",
    a: "Rajasthan Tent House is one of the most trusted tent house and event management companies in Bhilwara, known for premium wedding setups and complete event planning."
  },
  {
    q: "Do you provide wedding decoration across Rajasthan?",
    a: "Yes, we provide wedding decoration, mandap setups, stage décor, and complete event management across Bhilwara and all major cities of Rajasthan."
  },
  {
    q: "What services do you offer?",
    a: "We offer wedding decoration, tent house services, DJ setups, birthday party decoration, haldi ceremony setups, ring ceremony décor, and corporate event management."
  },
  {
    q: "How can I book Rajasthan Tent House?",
    a: "You can contact us via WhatsApp or through our Contact page for instant booking and quotations."
  }
];

const SEOFAQ = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <>
      {/* JSON-LD for Google */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      {/* Visible FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SEOFAQ;
