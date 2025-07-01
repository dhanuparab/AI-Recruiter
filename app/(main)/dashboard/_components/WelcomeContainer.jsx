"use client";
import { useUser } from '@/app/provider';
import React from 'react';
import Image from 'next/image';

function WelcomeContainer() {
    const { user } = useUser();

    return (
        <div className="relative overflow-hidden rounded-2xl shadow-xl flex items-center justify-between px-8 py-7 mb-8 bg-gradient-to-r from-blue-100/80 via-white/60 to-indigo-100/80 backdrop-blur-lg border border-blue-200">
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-2xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-300/30 rounded-full blur-2xl z-0" />
            
            <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-blue-800 mb-1 drop-shadow-sm">
                    Welcome Back, <span className="text-indigo-600">{user?.name}</span>
                </h2>
                <p className="text-gray-600 text-lg font-medium">
                    🚀 <span className="text-blue-500 font-semibold">AI-Driven Interviews</span>, Hassle-Free Hiring
                </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-3">
                {user?.picture ? (
                    <Image 
                        src={user.picture} 
                        alt='userAvatar' 
                        width={70} 
                        height={70} 
                        className='rounded-full border-4 border-white shadow-lg'
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WelcomeContainer;