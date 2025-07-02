"use client";
import { useUser } from '@/app/provider';
import React from 'react';
import Image from 'next/image';

function WelcomeContainer() {
    const { user } = useUser();

    return (
        <div className="relative overflow-hidden rounded-xl shadow-lg flex items-center justify-between px-8 py-7 mb-8 bg-[#f7f9fb] border border-gray-200">
            <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-1">
                    Welcome Back, <span className="text-blue-600 font-bold text-2xl">{user?.name}</span>
                </h2>
                <p className="text-gray-500 text-lg font-medium">
                    <span className="font-semibold text-blue-500">AI-Driven Interviews</span> &mdash; Hassle-Free Hiring
                </p>
            </div>
            <div className="relative z-10 flex items-center gap-3">
                {user?.picture ? (
                    <Image 
                        src={user.picture} 
                        alt='userAvatar' 
                        width={70} 
                        height={70} 
                        className='rounded-full border-2 border-gray-200 shadow'
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 text-3xl font-bold shadow border-2 border-gray-200">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WelcomeContainer;