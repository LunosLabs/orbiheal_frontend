"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import useAuthStore from "@/app/store/userAuthStore";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { logoutUser } from "@/lib/services/authService";
import { roleBasedLinks } from "@/lib/constants";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { userRole, initializeAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth().then(() => setIsInitialized(true));
  }, [initializeAuth]);

  const isLinkActive = useCallback(
    (link, isMobile = false) => {
      if (pathname === link.href) return true;
      if (isMobile || !link.nested) return false;
      return link.nested.some((route) =>
        new RegExp(`^${route.replace(/\[.*?\]/g, "[a-zA-Z0-9-]+")}$`).test(pathname)
      );
    },
    [pathname]
  );

  const currentUserLinks = useMemo(() => (userRole ? roleBasedLinks[userRole] || [] : []), [userRole]);

  const handleLogout = useCallback(async () => {
    await logoutUser();
    clearAuth();
    setIsOpen(false);
    router.push("/auth/login");
  }, [router, clearAuth]);

  const handleCloseSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderDesktopNav = useMemo(
    () => (
      <ul className="hidden md:flex items-center gap-6">
        {currentUserLinks.map((link) => (
          <li key={link.name} className="relative group">
            <Link
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ease-out ${
                isLinkActive(link)
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-neutral-200 hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
            {link.dropdown && (
              <ul className="absolute left-0 top-full mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                {link.dropdown.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ease-out ${
                        pathname === item.href
                          ? "text-blue-400 font-medium"
                          : "text-neutral-200 hover:text-blue-400"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    ),
    [currentUserLinks, isLinkActive, pathname]
  );

  const renderMobileNav = useMemo(
    () => (
      <div className="flex flex-col gap-2 pt-4">
        {currentUserLinks.map((link) => (
          <div key={link.name}>
            <Link
              href={link.href}
              onClick={handleCloseSheet}
              className={`block px-4 py-2 text-base font-medium transition-colors duration-200 ease-out ${
                isLinkActive(link, true)
                  ? "text-blue-400 border-l-2 border-blue-400"
                  : "text-neutral-200 hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
            {link.dropdown && (
              <div className="ml-4 mt-1 space-y-1 border-l border-neutral-700 pl-3">
                {link.dropdown.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleCloseSheet}
                    className={`block px-3 py-1.5 text-sm transition-colors duration-200 ease-out ${
                      pathname === item.href
                        ? "text-blue-400 font-medium"
                        : "text-neutral-300 hover:text-blue-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    [currentUserLinks, pathname, handleCloseSheet, isLinkActive]
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 bg-neutral-900/95 border-b border-neutral-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Logo size="md" />
        <div className="flex-1 flex justify-center">{isInitialized && userRole && renderDesktopNav}</div>
        <div className="flex items-center gap-4">
          {isInitialized && userRole && (
            <Button
              onClick={handleLogout}
              className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors duration-200 ease-out"
              aria-label="Logout"
            >
              Logout
            </Button>
          )}
          {isInitialized && userRole && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden p-2 text-neutral-200 hover:text-blue-400 rounded-lg transition-colors duration-200 ease-out focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size="24" />}
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-neutral-900/95 border-l border-neutral-800 w-64 p-6 flex flex-col justify-between gap-4 transition-transform duration-300 ease-out"
              >
                <div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  {renderMobileNav}
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors duration-200 ease-out"
                  aria-label="Logout"
                >
                  Logout
                </Button>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
    </header>
  );
}