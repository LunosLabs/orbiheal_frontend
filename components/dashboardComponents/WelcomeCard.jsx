"use client";

import useAuthStore from '@/app/store/userAuthStore';
import React from 'react';

const WelcomeCard = () => {
  const { displayName } = useAuthStore();

  return (
    <section className="py-2">
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        Hii <span className="text-blue-400">{displayName}</span>
      </h1>
      <p className="text-md md:text-lg text-gray-400">
        Happy to have you again!
      </p>
    </section>
  );
};

export default WelcomeCard;
