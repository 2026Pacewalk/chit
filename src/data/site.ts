export const site = {
  name: "Chitrangi",
  tagline: "Personalized Gifts & Creative Keepsakes",
  description:
    "Chitrangi offers personalized gifts, corporate items, AI frames, custom T-shirts, and unique print designs, adding a creative and personal touch to every occasion.",
  domain: "https://www.chitrangi.com",
  email: "sales@chitrangi.com",
  orderEmail: "order@chitrangi.com",
  phone: "+91 95177 22444",
  phoneHref: "+919517722444",
  whatsapp: "919517722444",
  address: "SCO-209, Green Lotus Avenue, Zirakpur, Punjab",
  copyright: "GURWINDER SINGH KAINTH",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Catalog",
    href: "/collections",
    children: [
      { label: "Acrylic Miniature", href: "/collections/personalized-carricature" },
      { label: "Corporate Gifts", href: "/collections/personalized-corporate-gifts" },
      { label: "NFC Card", href: "/collections/nfc-card" },
      { label: "Sign Board", href: "/collections/sign-board" },
      { label: "Acrylic QR Stand", href: "/collections/acrylic-qr-stand" },
      { label: "Stationary", href: "/collections/stationary" },
      { label: "Religious Gifts", href: "/collections/religious-gifts" },
      { label: "Wall Frames", href: "/collections/wall-frames" },
    ],
  },
  { label: "About Us", href: "/pages/about-us" },
  { label: "Blog", href: "/blogs/news" },
  { label: "Contact", href: "/pages/contact" },
];

export const categoryMenu = [
  { label: "Acrylic QR Code", href: "/collections/acrylic-qr-stand" },
  { label: "Acrylic Miniature", href: "/collections/personalized-carricature" },
  { label: "Corporate Gifts", href: "/collections/personalized-corporate-gifts" },
  { label: "Stationary", href: "/collections/stationary" },
  { label: "Sign Board", href: "/collections/sign-board" },
  { label: "NFC Card", href: "/collections/nfc-card" },
  { label: "Religious Gifts", href: "/collections/religious-gifts" },
  { label: "Wall Frames", href: "/collections/wall-frames" },
];

export const usps = [
  {
    title: "Free Shipping",
    text: "Free shipping on orders over INR 2999.",
    icon: "truck",
  },
  {
    title: "Money Back",
    text: "15 days money back guarantee.",
    icon: "shield",
  },
  {
    title: "Secure Checkout",
    text: "We ensure 100% payment security.",
    icon: "lock",
  },
  {
    title: "Next-Day Dispatch",
    text: "Paid orders dispatched the next working day.",
    icon: "clock",
  },
];

export const testimonials = [
  {
    quote:
      "If you're looking for reliable and top-notch print services, Chitrangi Print Media is the go-to solution. We are extremely satisfied with their work and will definitely return for future projects.",
    name: "Shivani Shakya",
  },
  {
    quote:
      "Chitrangi Print Media consistently delivers high-quality prints that perfectly match our specifications. The attention to detail, vibrant colors, and premium materials used in our marketing materials have helped us elevate our brand's image. The team was incredibly responsive and helpful throughout the process.",
    name: "Gursimar Kaur",
  },
  {
    quote:
      "Chitrangi Print Media has been a game changer for our company's print requirements. They consistently produce sharp, professional-grade prints, and their ability to meet tight deadlines sets them apart. They've become our go-to partner for all print-related projects.",
    name: "Harman",
  },
  {
    quote:
      "I had an outstanding experience with Chitrangi Print Media for our print needs. From the initial consultation to the final product, their professionalism and attention to detail were exceptional. The quality of the prints exceeded our expectations.",
    name: "Sudesh Kaintura",
  },
];

export const heroSlides = [
  {
    image: "/images/banners/promo-miniature.jpg",
    kicker: "Personalized Gifts",
    title: "Custom Miniature",
    text: "Personalized Caricature / Miniature Gifts are custom-made artworks that playfully capture a person's likeness. Perfect for any celebration, they highlight unique features, hobbies, or special moments.",
    cta: "Shop Now",
    href: "/collections/personalized-carricature",
  },
  {
    image: "/images/banners/promo-corporate.jpg",
    kicker: "Personalized",
    title: "Corporate Gifts",
    text: "Personalized Corporate Gifts are custom-branded items that express appreciation and strengthen business relationships. Ideal for clients or employees, they leave a lasting, professional impression.",
    cta: "Shop Now",
    href: "/collections/personalized-corporate-gifts",
  },
];
