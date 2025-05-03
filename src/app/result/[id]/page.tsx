'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type TraitScore = {
    trait: string;
    score: number;
    _id: string;
  };

export default function ResultPage({params}: any) {


const [result, setResult] = useState<TraitScore[]>([]);
const [loading, setLoading] = useState(false);
const router = useRouter();
const [userId, setUserId] = useState<string | null>(null);
useEffect(() => {
    const fetchUserId = async () => {
        try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        setUserId(data.data.userId);
        } catch (error) {
        console.error("Error fetching user ID:", error);
        }
    };
    
    fetchUserId();
    }
), [] ;

useEffect(() => {
    const fetchResult = async () => {
        try {
        const res = await fetch("/api/users/result");
        const data = await res.json();
        console.log(data);
        setResult(data.traitScores || []);


        
        } catch (error) {
        console.error("Error fetching result:", error);
        }
    };
    
    fetchResult();
    }, []);

        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-1">
                <h1>Result</h1>
                <hr />
                <p className="text-4xl">Result page</p>
                <p className="text-4xl">Personality Traits</p>
                {result.map((item:any) => (
                            <div key={item.trait} className="flex flex-col items-center justify-center min-h-screen my-0 py-1">
                                <p className="text-4xl">{item.trait}</p>
                                <p className="text-4xl">{item.score}</p>
                            </div>
                    
                ))}
            </div>
        );
    }


