'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">

          <div className="flex items-center justify-start rtl:justify-end">
            <Link href="/" className="flex ms-2 md:me-24">
              <Image
                src="https://webknot.in/lovable-uploads/4f2cdaf3-81f5-4619-94a6-a6a2a911c1c6.png"
                alt="Logo"
                width={180}
                height={100}
              />

            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};
