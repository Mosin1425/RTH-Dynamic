import { Heart, Sparkles, Music, UtensilsCrossed, Gift, DoorOpen, Flower2 } from 'lucide-react';

// Enquiries go to the business WhatsApp; there is no email backend.
export const WHATSAPP_NUMBER = '919636798937';
export const PHONE_DISPLAY = '+91 96367 98937';
export const ADDRESS_LINES = ['Uperly Haveli, Gread Road, Asind', 'Bhilwara, Rajasthan 311301'];
export const SITE_URL = 'https://rajasthantenthouse.com';

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const servicesData = [
  {
    id: 'wedding-events',
    shortTitle: 'Weddings',
    image: '/assets/003-vmake.jpg',
    title: 'Wedding Events & Receptions',
    icon: Heart,
    description: 'Experience the magic of a fairytale wedding with our comprehensive planning and decoration services. We specialize in creating breathtaking mandaps, royal walkways, and thematic reception stages that reflect your unique love story.',
    longDescription: 'Our Wedding Events & Receptions service is the crown jewel of Rajasthan Tent House. We understand that a wedding is not just an event, but a lifelong memory. Our team of expert designers works closely with you to curate every detail, from the color palette of the drapes to the floral arrangements on the mandap. Whether you desire a traditional Rajasthani royal wedding or a modern contemporary celebration, we have the expertise to bring your vision to life. We handle logistics, seating arrangements, lighting, and stage decor, ensuring a seamless experience for you and your guests.'
  },
  {
    id: 'grand-entryways',
    shortTitle: 'Entrances',
    image: '/assets/photos5.jpg',
    title: 'Grand Entryways & Elegant Counters',
    icon: DoorOpen,
    description: 'Make a stunning first impression with our bespoke entrance decor and sophisticated food counters.',
    longDescription: 'The entrance sets the tone for the entire event. Our Grand Entryways are designed to leave your guests in awe the moment they arrive. We use a combination of exotic flowers, rich fabrics, and dramatic lighting to create welcoming arches and pathways. Inside, our Elegant Counters for food and beverages are not just functional but decorative elements in themselves. We offer themed counter setups that complement your overall event decor, from rustic wooden bars to crystal-embellished dessert stations.'
  },
  {
    id: 'haldi-ceremony',
    shortTitle: 'Haldi',
    image: '/assets/photos4.jpg',
    title: 'Haldi Ceremony',
    icon: Flower2,
    description: 'Celebrate the vibrant hues of happiness with our specialized Haldi decor.',
    longDescription: 'The Haldi ceremony is all about joy, laughter, and the color yellow! We create vibrant, energetic setups using marigold flowers, yellow drapes, and traditional props like brass urlis and earthen pots. Our designs ensure comfortable seating for the bride and groom while providing a picturesque backdrop for all your candid photos. We can also arrange for live folk music and traditional entertainment to enhance the festive atmosphere.'
  },
  {
    id: 'ring-ceremony',
    shortTitle: 'Engagement',
    image: '/assets/002-vmake.jpg',
    title: 'Ring Ceremony',
    icon: Sparkles,
    description: 'Elegant and intimate settings for your special engagement moments.',
    longDescription: 'Your engagement marks the beginning of your journey together. Our Ring Ceremony setups are designed to be romantic, intimate, and classy. We focus on soft lighting, pastel florals, and elegant stage designs that highlight the couple. From ring exchange trays to photo booths for guests, every element is crafted with sophistication and love.'
  },
  {
    id: 'birthday-celebrations',
    shortTitle: 'Birthdays',
    image: '/assets/photos3.jpg',
    title: 'Memorable Birthday Celebrations',
    icon: Gift,
    description: 'From first birthdays to golden jubilees, we make every year count.',
    longDescription: 'Birthdays are milestones worth celebrating in style. Whether it’s a fun-filled 1st birthday with cartoon themes and balloon arches, or a sophisticated 50th birthday dinner, we handle it all. Our team creates custom themes, arranges entertainment, and designs cakes and dessert tables that are as delicious as they look.'
  },
  {
    id: 'dining-arrangements',
    shortTitle: 'Dining',
    image: '/assets/photos9.jpg',
    title: 'Stylish Dining Arrangements',
    icon: UtensilsCrossed,
    description: 'Exquisite table settings and furniture for a luxurious dining experience.',
    longDescription: 'Food tastes better when the ambiance is perfect. Our Stylish Dining Arrangements include premium table linens, chiavari chairs, elegant centerpieces, and fine china. We create layouts that encourage conversation and comfort, ensuring your guests enjoy a fine dining experience at your event.'
  },
  {
    id: 'dj-parties',
    shortTitle: 'DJ Nights',
    image: '/assets/007-vmake.jpg',
    title: 'Lively DJ Night Parties',
    icon: Music,
    description: 'High-energy setups with professional sound and lighting for the ultimate party.',
    longDescription: 'Get ready to dance the night away! Our DJ Night setups transform any venue into a high-energy club. We provide professional sound systems, intelligent lighting, LED dance floors, and smoke machines. Whether it’s a Sangeet night or an after-party, we ensure the vibe is electric and the music never stops.'
  }
];

export const stats = [
  { value: 30, suffix: '+', label: 'Years of craft' },
  { value: 500, suffix: '+', label: 'Events executed' },
  { value: 1000, suffix: '+', label: 'Happy families' },
  { value: 15, suffix: '+', label: 'In-house crew' },
];

export const processSteps = [
  { title: 'Consultation', description: 'We listen to your story, your guest list and the feeling you want the day to have.' },
  { title: 'Design & Planning', description: 'Décor concepts, layouts, lighting and timelines, tailored and transparently priced.' },
  { title: 'Execution', description: 'Our own crew and inventory set up on time, every time, with a manager on site.' },
  { title: 'Celebrate', description: 'You enjoy every moment with your family. We handle everything behind the scenes.' },
];

export const testimonials = [
  { name: 'Rajesh Sharma', event: 'Wedding, Bhilwara', text: 'Absolutely stunning decoration and flawless management. Our guests are still talking about the mandap.' },
  { name: 'Neha Jain', event: 'Wedding & Sangeet', text: 'A professional team and a magical wedding setup. Everything was ready before we even arrived.' },
  { name: 'Amit Singh', event: 'Reception', text: 'A premium event experience from start to finish. Clear pricing and zero stress for the family.' },
  { name: 'Rahul Sharma', event: 'Wedding, Asind', text: 'Rajasthan Tent House made our wedding unforgettable. Everything was perfectly executed.' },
  { name: 'Priya Mehta', event: 'Haldi Ceremony', text: 'The haldi décor was bright, joyful and perfect for photos. Beautiful work by the whole team.' },
  { name: 'Ankit Jain', event: 'Birthday Celebration', text: 'Highly recommended for premium event setups in Rajasthan. They thought of every detail.' },
];

export const faqs = [
  {
    q: 'Which is the best tent house in Bhilwara?',
    a: 'Rajasthan Tent House is one of the most trusted tent house and event management companies in Bhilwara, known for premium wedding setups and complete event planning.',
  },
  {
    q: 'Do you provide wedding decoration across Rajasthan?',
    a: 'Yes, we provide wedding decoration, mandap setups, stage décor, and complete event management across Bhilwara and all major cities of Rajasthan.',
  },
  {
    q: 'What services do you offer?',
    a: 'We offer wedding decoration, tent house services, DJ setups, birthday party decoration, haldi ceremony setups, ring ceremony décor, and corporate event management.',
  },
  {
    q: 'How can I book Rajasthan Tent House?',
    a: 'You can contact us via WhatsApp or through our Contact page for instant booking and quotations.',
  },
];

// Square event photos used in marquees and photo strips.
export const showcaseImages = [
  '/assets/photos3.jpg',
  '/assets/photos4.jpg',
  '/assets/photos5.jpg',
  '/assets/photos6.jpg',
  '/assets/photos7.jpg',
  '/assets/photos8.jpg',
  '/assets/photos9.jpg',
  '/assets/photos10.jpg',
  '/assets/todo1.png',
];

// Shown on the gallery when the Supabase photo library is empty or unreachable.
export const fallbackGallery = [
  '/assets/001.jpg',
  '/assets/002-vmake.jpg',
  '/assets/003-vmake.jpg',
  '/assets/005-vmake.jpg',
  '/assets/006-vmake.jpg',
  '/assets/007-vmake.jpg',
  '/assets/AI_01.png',
  ...showcaseImages,
];

export const ownerPhotos = ['/assets/owner1.jpg', '/assets/owner2.jpg', '/assets/owner3.jpg'];
