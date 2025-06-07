/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // מהיר יותר מ־Terser
  images: {
    domains: ['your-image-domain.com'], // אם אתה טוען תמונות מדומיין חיצוני
  },
  // אם אתה משתמש ב־basePath (למשל אתר בתוך תת־תיקייה):
  // basePath: "/store",
  // אם אתה מייצא לאתר סטטי (ל־Netlify או GitHub Pages):
  // output: "export",
};

export default nextConfig;
