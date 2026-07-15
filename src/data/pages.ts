export type PolicyPage = {
  slug: string;
  title: string;
  intro?: string;
  sections: { heading?: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const policyPages: PolicyPage[] = [
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    intro:
      "By using the Chitrangi.com shopping service, you (the Customer) agree to the following terms and conditions. Chitrangi.com reserves the right to modify these terms at any time, so please review them regularly.",
    sections: [
      {
        heading: "Order Placement",
        paragraphs: [
          "When you place an order, you authorize Chitrangi.com to process it with the respective merchant or vendor to ensure delivery. Chitrangi.com acts solely as a service provider, not as an agent or seller of the vendor's products. All transactions are between you and the vendor.",
        ],
      },
      {
        heading: "Pricing and Delivery",
        bullets: [
          "All prices are in Rupees, and deliveries are limited to the respective cities.",
          "Standard delivery hours are from 10:00 am to 6:00 pm. Orders placed before 2 pm are processed the same day; after 2 pm, they are processed the next working day.",
          "For couriered items, the respective courier's policies apply.",
          "If an order is rejected by the recipient or returned due to non-delivery, Chitrangi.com reserves the right to charge for the order.",
        ],
      },
      {
        heading: "Liability",
        bullets: [
          "Chitrangi.com is not responsible for missed or delayed deliveries due to factors like curfews, government actions, natural disasters, holidays, incorrect addresses, or other extraordinary circumstances.",
          "Chitrangi.com's liability is limited to the retail cost of the item, and any claims are restricted to that amount.",
        ],
      },
      {
        heading: "Delivery Issues",
        bullets: [
          "Chitrangi.com strives for prompt delivery, but early or delayed deliveries do not entitle you to compensation.",
          "Chitrangi.com is not responsible for miss-delivery if the recipient at the address provided misappropriates or fails to hand over the gift.",
        ],
      },
      {
        heading: "Product Quality and Availability",
        bullets: [
          "Products and services are provided without warranties. While Chitrangi.com aims to deliver products as shown on the website, there may be variations.",
          "Orders cannot be cancelled once placed. Any changes must be requested within two working hours after order submission, but Chitrangi.com is not liable if changes cannot be made.",
          "In case of non-availability of a product, Chitrangi.com will notify you to change the order or wait for availability.",
          "For perishable items, Chitrangi.com reserves the right to substitute them with less perishable ones, if necessary, without prior notice.",
        ],
      },
      {
        heading: "Pricing Changes",
        bullets: [
          "Prices are as listed on the website, but Chitrangi.com reserves the right to change prices without notice under certain circumstances.",
          "Products may be dispatched separately if required by courier policies.",
        ],
      },
      {
        heading: "Trademarks and Brands",
        paragraphs: [
          "Chitrangi.com does not claim ownership of trademarks, brands, or company names used on the site. These are owned by their respective companies and are used solely for product identification.",
        ],
      },
      {
        heading: "Disputes",
        paragraphs: [
          "Any disputes will be subject to the jurisdiction of Zirakpur, Punjab (India) courts.",
        ],
      },
      {
        heading: "GST Compliance",
        paragraphs: [
          "All orders within India are subject to GST. Chitrangi.com is fully GST compliant, and the relevant GST amount will be added at checkout based on the product category.",
        ],
      },
      {
        heading: "About Chitrangi.com",
        paragraphs: [
          "Chitrangi.com offers unique gift ideas for various occasions like birthdays, weddings, anniversaries, housewarming parties, and more, making it easy for customers to find the perfect gift.",
        ],
      },
    ],
  },
  {
    slug: "cancellation-refund",
    title: "Cancellation & Refund",
    sections: [
      {
        heading: "Order Cancellation Policy",
        paragraphs: [
          "If you need to cancel an order on Chitrangi.com, please do so within 1 hour of placing it. To cancel, simply email us at order@chitrangi.com, and include your order number in the subject line.",
          "Please note that orders cannot be cancelled once they have been dispatched. Additionally, personalized product orders cannot be cancelled or refunded once the order has been placed.",
        ],
      },
      {
        heading: "Replacement Policy",
        paragraphs: [
          "Products are eligible for replacement if they arrive in a damaged or defective condition. To request a replacement, please contact our team within 2 hours of receiving the package. We will arrange for a brand-new replacement to be shipped to you, with an additional charge for shipping costs. Ensure that the original product tag and packaging remain intact when the reverse pickup is made.",
          "Please note that returns are not applicable for any orders, as all products are personalized.",
          "Our team takes great care in ensuring the quality of each product and strives to deliver your items safely. However, we understand that sometimes fragile items may be damaged during transit. In such cases, please reach out to us within 24 hours of delivery.",
        ],
      },
      {
        heading: "Contact Information",
        bullets: [
          "Phone: +91 9517722444 (11 AM – 6 PM)",
          "Email: order@chitrangi.com",
          "WhatsApp: +91 9517722444 — we are happy to share real-time product photos and videos via WhatsApp, email, or other channels.",
        ],
      },
      {
        heading: "Refund Policy",
        paragraphs: [
          "Due to the personalized and customized nature of our products, we are unable to offer refunds once an order has been processed and customization has begun.",
          "We strive to ensure the highest quality and accuracy in all our personalized products. If you encounter any issues with your order, such as defects or errors on our part, please contact our customer service team within 7 days of receiving your product. We will review your case and provide an appropriate solution, which may include a replacement or correction of the product.",
        ],
        bullets: [
          "Refunds will not be issued for changes in personal preference or incorrect information provided by the customer.",
          "Ensure that all customization details are accurate before finalizing your order.",
        ],
      },
      {
        heading: "About Chitrangi.com",
        paragraphs: [
          "Chitrangi.com is your go-to online store for personalized gifts, offering a wide range of unique and customizable products to suit every occasion.",
        ],
      },
    ],
  },
  {
    slug: "shipping-delivery-policy",
    title: "Shipping & Delivery Policy",
    intro:
      "At Chitrangi.com, we're all about speed, quality, and customer satisfaction. We understand that when you order something special, you want it delivered fast and in perfect condition. That's why we're committed to dispatching all online paid orders the very next working day, with delivery typically within 3-6 working days from dispatch.",
    sections: [
      {
        heading: "Shipping with Care, Every Day of the Week",
        paragraphs: [
          "We ship throughout the week, excluding Sundays and public holidays. Your order will be handled with the utmost care and delivered in pristine condition by trusted courier partners like Bluedart and Delhivery. If these services are not available in your area, we'll do our best to deliver your items via IndiaPost.",
        ],
      },
      {
        heading: "Simple and Transparent Shipping Charges",
        paragraphs: [
          "Good news! We offer free shipping on all online paid orders within India. Whether you're buying one item or a dozen, shipping remains absolutely free. Please note, our prices are exclusive of GST, which will be calculated at checkout. Rest assured, we're fully GST compliant, so your order is in safe hands.",
        ],
      },
      {
        heading: "Fast and Reliable Delivery",
        paragraphs: [
          "Our express delivery service ensures your order reaches you within 3-6 working days in major cities like Delhi, Mumbai, Bangalore, Hyderabad, and Chennai. For other locations, delivery takes 5-7 working days. Place your order before 2 pm, and we'll dispatch it the very same day! For COD orders, we ensure dispatch after confirming the order via call, though these may take a bit longer, usually 5-7 working days.",
        ],
      },
      {
        heading: "Your Satisfaction, Our Priority",
        paragraphs: [
          "At Chitrangi, we stand by the quality of our products. If your order arrives damaged or if the packaging appears tampered with, please don't hesitate to refuse the delivery. Contact our customer care team immediately at order@chitrangi.com with your Order ID, or call us at +91 9517722444 (Monday to Saturday, 11 AM to 6 PM).",
          "We'll quickly arrange for a reverse pickup and send you a brand-new replacement at no extra cost. Just make sure the original product tags and packaging are intact when you return the item.",
        ],
      },
      {
        heading: "Ready to Shop?",
        paragraphs: [
          "With Chitrangi, shopping is not just convenient; it's a delightful experience. Fast, free shipping, quality assurance, and excellent customer service — everything you need to make your shopping journey smooth and enjoyable!",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    intro:
      "This privacy policy sets out how Chitrangi.com uses and protects any information that you provide when you use this website. Chitrangi.com is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.",
    sections: [
      {
        paragraphs: [
          "Online transactions are electronically encrypted to ensure that your financial data is safe and secure; you may use your credit card online with confidence. In addition, your address, phone number, and financial data will be used only by Chitrangi.com and will never be sold or revealed to anyone else.",
          "It is our policy that personal information, such as your name, address, email address, telephone number, and financial information, is private and confidential. Your personal information will be used only by Chitrangi.com and will never be sold or revealed to outside sources.",
        ],
      },
      {
        heading: "What We Collect",
        bullets: [
          "Name and date of birth",
          "Contact information, including email address",
          "Demographic information such as postcode, preferences, and interests",
          "Other information relevant to customer surveys and/or offers",
        ],
      },
      {
        heading: "What We Do with the Information We Gather",
        paragraphs: [
          "We require this information to understand your needs and provide you with better service, particularly for the following reasons:",
        ],
        bullets: [
          "Internal record keeping.",
          "We may use the information to improve our products and services.",
          "We may periodically send promotional emails about new products, special offers, or other information which we think you may find interesting using the email address you have provided.",
          "From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax, or mail. We may use the information to customize the website according to your interests.",
        ],
      },
      {
        paragraphs: [
          "If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect.",
        ],
      },
      {
        heading: "Contact Us",
        bullets: [
          "Email: order@chitrangi.com",
          "Phone: +91 9517722444",
          "WhatsApp: +91 9517722444",
          "We're available on the phone from 11 AM to 6 PM, Monday to Saturday.",
          "Office Address: SCO-209, Green Lotus Avenue, Chandigarh Ambala Expressway, Near Singhpura Gate, Zirakpur, Punjab, 140603",
        ],
      },
    ],
  },
];

export const aboutPage = {
  title: "About Us",
  paragraphs: [
    "Welcome to Chitrangi, where creativity meets personalization. We are your go-to destination for unique and thoughtful gifts. Whether you're looking for personalized gifts, corporate gifts, AI frames, customized T-shirts, or bespoke print designs, we've got you covered.",
    "At Chitrangi, we believe that every gift should tell a story. That's why we specialize in creating custom-made products that reflect the individuality of each recipient. With a focus on quality, creativity, and attention to detail, we turn ordinary items into extraordinary keepsakes.",
    "Our commitment to excellence is driven by our shared vision of making every occasion memorable. Our team's expertise and passion for design ensure that every product we offer is crafted with care and precision.",
    "Explore our range of personalized products and discover the perfect gift for any occasion. At Chitrangi, we bring your ideas to life, one creative design at a time.",
  ],
};

export const blogArticle = {
  blog: "diwali-personalized-gifts-make-this-festival-extra-special",
  slug: "diwali-personalized-gifts-make-this-festival-extra-special",
  title: "Diwali Personalized Gifts: Make This Festival Extra Special!",
  author: "Chitrangi",
  date: "September 2024",
  dateISO: "2024-09-14",
  image: "/images/banners/blog-diwali.jpg",
  excerpt:
    "Diwali is about spreading love, joy, and gratitude — and what better way to express that than with a thoughtful, personalized gift? Discover our favourite ideas to light up your loved ones' celebrations.",
  sections: [
    {
      paragraphs: [
        "Diwali, the festival of lights, is one of the most cherished and awaited celebrations in India and among communities worldwide. The joyous occasion brings families and friends together, lighting up homes with diyas, bursting crackers, and indulging in delicious sweets. But the heart of Diwali is about spreading love, joy, and gratitude — and what better way to express that than with a thoughtful, personalized gift?",
      ],
    },
    {
      heading: "Why Personalized Gifts for Diwali?",
      paragraphs: [
        "Personalized gifts add a unique touch to your Diwali celebrations. In a world where mass-produced items are easily available, gifting something that is customized shows thoughtfulness and care. It reflects your effort in creating something just for the person you're gifting it to, making it stand out from the rest. It's a gesture that goes beyond the ordinary, making your loved ones feel special and appreciated.",
        "Here are some of the best personalized gift ideas for Diwali that will light up the lives of your loved ones!",
      ],
    },
    {
      heading: "1. Customized Diwali Gift Hampers",
      paragraphs: [
        "A curated gift hamper, tailored to the preferences of the receiver, is a wonderful option. You can fill it with an assortment of items like gourmet sweets, snacks, candles, or even skincare products. Add a personalized touch by engraving their name or adding a custom message to the packaging.",
        "Pro Tip: Choose eco-friendly items or organic products to make your gift both thoughtful and sustainable!",
      ],
    },
    {
      heading: "2. Personalized Photo Frames & Albums",
      paragraphs: [
        "Capture and commemorate precious memories with a customized photo frame or album. A photo of a special moment framed beautifully can become a cherished piece in anyone's home. You can also create a themed album that celebrates the bond you share, filled with pictures, quotes, and memories that will bring smiles every time it's opened.",
      ],
    },
    {
      heading: "3. Custom Printed Diwali Candles",
      paragraphs: [
        "Diwali is all about lights, so what could be more fitting than personalized candles? You can choose candles with custom-printed labels, featuring the names of your loved ones or special Diwali greetings. Scented candles with a personal touch will not only light up their homes but also fill them with warmth and joy.",
      ],
    },
    {
      heading: "4. Personalized Diwali Diyas and Lanterns",
      paragraphs: [
        "Since Diwali is synonymous with the lighting of diyas, gifting personalized diyas can add a special charm to the festivities. You can get the recipient's name or a message engraved on beautiful diyas, or choose lanterns that can be custom-made with intricate designs. These gifts will hold sentimental value and be a meaningful addition to the home decor.",
      ],
    },
    {
      heading: "5. Customized Festive Cushions",
      paragraphs: [
        "Another unique gift idea is personalized cushions. Printed with Diwali-themed designs or the names of family members, these cushions can be a cozy addition to any living room. Whether it's a festive message or a photo, these cushions will surely be a hit as they combine comfort with a personal touch.",
      ],
    },
    {
      heading: "6. Engraved Wooden Keepsakes",
      paragraphs: [
        "Engraved wooden items — from nameplates to desk accessories — make elegant and lasting Diwali gifts. A beautifully engraved keepsake carries a sense of permanence and craftsmanship that mass-produced gifts simply can't match.",
      ],
    },
    {
      heading: "Make This Diwali Unforgettable",
      paragraphs: [
        "This festive season, go beyond the usual boxes of sweets and dry fruits. Explore Chitrangi's range of personalized gifts — from custom caricatures and photo frames to corporate hampers — and make this Diwali truly memorable for the people you love.",
      ],
    },
  ],
};
