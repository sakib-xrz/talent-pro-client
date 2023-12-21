"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } fixed bottom-5 right-5 cursor-pointer transition-all delay-0 duration-200 ease-linear`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="h-8 w-8 rounded-full bg-primary p-2 text-primary text-white md:h-10 md:w-10" />
    </div>
  );
};

export default ScrollToTop;
