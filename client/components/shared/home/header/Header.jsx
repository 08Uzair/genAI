'use client'; // Add only if using Next.js App Router

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    {
      label: "Products",
      path: "/dashboard/products",
    },
    {
      label: "Users",
      path: "/dashboard/users",
    },
    {
      label: "Inbox",
      path: "/inbox",
    }
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Webkntot Logo</span>
            {/* This image is taken from webknot site  */}
            <Image
              src="https://avatars.githubusercontent.com/u/121750611?v=4"
              alt="Logo"
              width={60}
              height={100}
              style={{borderRadius:'5px'}}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {
            navItems.map((item, index) => (
              <Link key={index} href={item.path} className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.label}
              </Link>
            ))
          }
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/auth/login" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Webkntot Logo</span>
                {/* This image is taken from webknot site  */}
                <Image
                  src="https://webknot.in/lovable-uploads/4f2cdaf3-81f5-4619-94a6-a6a2a911c1c6.png"
                  alt="Logo"
                  width={180}
                  height={100}
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              >
                <span className="sr-only">Close menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 py-6">
                  {
                    navItems.map((item, index) => (
                      <Link key={index} href={item.path} className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                        {item.label}
                      </Link>
                    ))
                  }
                </div>
                <div className="py-6">
                  <Link href="/login"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
