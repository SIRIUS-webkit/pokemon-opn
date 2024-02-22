"use client";

import React from "react";
import { Input } from "./ui/input";
import Cart from "./Cart";

function Header() {
  return (
    <div className="max-w-[1200px] mx-auto flex justify-between items-center py-5 border-b-[1px] border-lightwhite">
      <h1 className="text-white">Pokemon market</h1>
      <div className="flex space-x-5 items-center">
        <Input type="email" placeholder="Email" />
        <Cart />
      </div>
    </div>
  );
}

export default Header;
