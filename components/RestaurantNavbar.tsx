"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/assets";
import Image from "next/image";
import Button from "@/components/ui/Button"; 


export default function RestaurantNavbar() {

  return (
    <>
      <nav className="flex items-center justify-center p-4 bg-white">
        <div className="md:max-w-7xl flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" className="w-7" />
            <div className="text-[20px] font-bold text-secondary">
              Food<span className="text-primary">Wagen</span>
            </div>
          </div>
          <div>
            <Button className="px-5">
              Add Meal
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
