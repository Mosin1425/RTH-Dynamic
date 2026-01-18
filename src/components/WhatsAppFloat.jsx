import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919636798937";

const WhatsAppFloat = () => {
  const message = encodeURIComponent(
    "Hi, I visited your website and want to enquire about an event."
  );

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl active:scale-95 transition"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline font-medium">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppFloat;
