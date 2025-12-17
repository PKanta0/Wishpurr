import React from "react";

type LoadingProps = {
    text?: string;
};

export default function LoadingPage({ text = "Preparing products for you 🐱"}: LoadingProps) {
    return (
        <div className="typing-text px-10 py-10">
            <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse" />
                <span className="text-lg text-gray-700">{text}</span>
            </div>
        </div>
    );
}