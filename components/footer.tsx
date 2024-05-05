import { Facebook,Linkedin,Youtube  } from 'lucide-react';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center md:justify-start items-center">
          <Link href="https://www.linkedin.com/company/storkyapp" className="mr-4 rounded-full border-cyan-400 border p-1 hover:bg-cyan-400 transition-colors delay-75 hover:text-black">
            <Linkedin />
          </Link>
          <Link href="https://www.youtube.com/channel/UCzb7vpZNKsIcBdftdAMcrfQ" className="mr-4 rounded-full border-rose-500 border p-1 hover:bg-rose-500 transition-colors delay-75">
          <Youtube />
          </Link>
          <Link href="https://www.facebook.com/StorkyApp" className="mr-4 rounded-full border-cyan-400 border p-1 hover:bg-cyan-400 transition-colors delay-75 hover:text-black">
            <Facebook className="text-lg" />
          </Link>
        </div>
        <div className="text-center md:text-left">
          <p className="mb-2">Email: <Link href="mailto:info@storky.app">info@storky.app</Link></p>
          <p className="mb-2">Phone: <Link href="tel:+201102389911">+201102389911</Link></p>
          <p className="mb-2">WhatsApp: <Link href="https://wa.me/201102389911">+201102389911</Link></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
