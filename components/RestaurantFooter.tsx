"use client";

import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaRegEnvelope } from "react-icons/fa";
import Input from "./ui/input";
import Button from "./ui/button";

const listBase = "space-y-3 text-sm text-gray-300";
const headingBase = "text-white text-base font-semibold mb-5";

const RestaurantFooter: React.FC = () => {

  return (
    <footer className="bg-[#1F1F1F] text-gray-300" aria-labelledby="site-footer">
      <h2 id="site-footer" className="sr-only">Site footer</h2>
      <div className="mx-auto md:max-w-7xl px-4 md:px-0 py-16">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-4 lg:gap-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className={headingBase}>Company</h3>
              <ul className={listBase}>
                <li><a href="#" className="hover:text-white">About us</a></li>
                <li><a href="#" className="hover:text-white">Team</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className={headingBase}>Contact</h3>
              <ul className={listBase}>
                <li><a href="#" className="hover:text-white">Help & Support</a></li>
                <li><a href="#" className="hover:text-white">Partner with us</a></li>
                <li><a href="#" className="hover:text-white">Ride with us</a></li>
              </ul>
            </div>
            <div>
              <h3 className={headingBase}>Legal</h3>
              <ul className={listBase}>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white">Refund & Cancellation</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="lg:pl-10">
            <p className="text-white font-semibold mb-5">FOLLOW US</p>
            <div className="flex items-center gap-4 mb-8 text-gray-100">
              <a aria-label="Instagram" href="#" className="w-9 h-9 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#333]">
                <FaInstagram />
              </a>
              <a aria-label="Facebook" href="#" className="w-9 h-9 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#333]">
                <FaFacebookF />
              </a>
              <a aria-label="Twitter" href="#" className="w-9 h-9 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#333]">
                <FaTwitter />
              </a>
            </div>

            <p className="text-gray-300 mb-3">Receive exclusive offers in your mailbox</p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe for offers">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaRegEnvelope />
                </span>
                <Input
                  type="email"
                  required
                  placeholder="Enter Your email"
                  className="pl-9 h-12 bg-[#2A2A2A] border-0 text-gray-100 placeholder:text-gray-400"
                  aria-label="Email address"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-6 shadow-[0_20px_45px_-15px_rgba(255,154,14,0.6)]"
                aria-label="Subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto md:max-w-7xl px-4 md:px-0 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-gray-400">
          <p>
            All rights Reserved <span aria-hidden>©</span> <span className="text-white">Your Company</span>, {new Date().getFullYear()}
          </p>
          <p>
            Made with <span className="text-yellow-400" aria-label="love">♥</span> by <a href="#" className="hover:text-white">Themewagon</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;
