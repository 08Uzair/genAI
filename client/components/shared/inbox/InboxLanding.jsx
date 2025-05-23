"use client"

import React from 'react'

const InboxLanding = () => {
    return (
        <>
            <main className="flex-1 flex flex-col bg-white border-r border-gray-100">
                <div className="p-[1.165rem] border-b border-gray-200">
                    <h2 className="text-sm font-semibold">Customer Support</h2>
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto flex justify-center items-center">
                    <h1 className="text-5xl font-semibold text-balance text-gray-900 text-center text-gray-900 sm:text-7xl">
                     Welcome to AI powered Customer Support
                    </h1>
                </div>
            </main>
        </>
    )
}

export default InboxLanding