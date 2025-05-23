"use client"

import React from 'react'

const AISidebar = () => {
    return (
        <>
            <aside className="w-[270px] bg-[#f9f9fb] flex flex-col  border-gray-200">
                <div className="p-[1.165rem] border-b border-gray-200">
                    <h2 className="text-sm font-semibold">AI Copilot</h2>
                </div>

                <div className="flex-1 p-4 text-center text-sm text-gray-600 flex flex-col justify-center items-center">
                    <div>Hi, I’m Fin AI Copilot</div>
                    <div className="mt-1 text-xs text-gray-400">Ask me anything about this conversation.</div>
                </div>

                <footer className="p-4 border-t border-gray-200">
                    <div className="text-sm text-gray-700 mb-2">Suggested:</div>
                    <button
                        className="bg-white border text-gray-800 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 w-full text-left">
                        💸 How do I get a refund?
                    </button>
                    <input type="text" placeholder="Ask a question..."
                        className="mt-4 w-full px-3 py-2 border rounded-lg text-sm" />
                </footer>
            </aside>
        </>
    )
}

export default AISidebar