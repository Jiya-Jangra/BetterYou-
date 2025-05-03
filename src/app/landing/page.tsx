'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';


export default function Landing() {
return (
  <div className=" bg-zinc-800 h-screen  text-white">
	
    <Navbar/>
    <Hero/>
   

  </div>
)
}