"use client";

import React from "react";
import Lock from "@/components/partials/auth/lock";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";

const LockScreen3 = () => {
  const [isDark] = useDarkMode();
  return (
    <div
      className="loginwrapper bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(/assets/images/all-img/login-bg.png)`,
      }}
    >
      <div className="lg-inner-column">
        <div className="left-columns lg:w-1/2 lg:block hidden">
          <div className="logo-box-3">
            <Link href="/" className="">
              <img
                src="/assets/images/logo/logo-white.svg"
                alt=""
                className="mb-10"
              />
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
          <div className="auth-box-3">
            <div className="mobile-logo text-center mb-6 lg:hidden block">
              <Link href="/">
                <img
                  src={
                    isDark
                      ? "/assets/images/logo/logo-white.svg"
                      : "/assets/images/logo/logo.svg"
                  }
                  alt=""
                  className="mx-auto"
                />
              </Link>
            </div>
            <div className="text-center mb-10">
              <h4 className="font-medium mb-4">Lock Screen</h4>
              <div className="text-slate-500 dark:text-slate-400 text-base">
                Enter your password to unlock the screen!
              </div>
            </div>
            <div className="author-bio text-center mt-10 mb-8">
              <div className="h-14 w-14 mx-auto rounded-full">
                <img
                  src="/assets/images/all-img/user-big.png"
                  alt=""
                  className="w-full h-full object-cover block"
                />
              </div>
              <div className="text-slate-900 dark:text-white text-base font-medium mt-4">
                Kathryn Murphy
              </div>
            </div>
            <Lock />

            <div className="text-sm mx-auto w-full text-center font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase">
              Not you ? return
              <Link
                href="/"
                className="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="auth-footer3 text-white py-5 px-5 text-xl w-full">
          Unlock your Project performance
        </div>
      </div>
    </div>
  );
};

export default LockScreen3;
