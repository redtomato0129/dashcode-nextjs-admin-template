"use client";
import React from "react";
import Link from "next/link";
import ForgotPass from "@/components/partials/auth/forgot-pass";
import useDarkMode from "@/hooks/useDarkMode";

const ForgotPass3 = () => {
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
            <div className="text-center 2xl:mb-10 mb-5">
              <h4 className="font-medium mb-4">Forgot Your Password?</h4>
              <div className="text-slate-500 dark:text-slate-400 text-base">
                Reset Password with Dashcode.
              </div>
            </div>
            <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10">
              Enter your Email and instructions will be sent to you!
            </div>

            <ForgotPass />
            <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm">
              Forget It,
              <Link
                href="/"
                className="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Send me Back
              </Link>
              to The Sign In
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

export default ForgotPass3;
