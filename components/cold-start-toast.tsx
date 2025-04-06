"use client"

import { useState, useEffect } from "react"

export function ColdStartToast() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <div
            className="fixed bottom-4 right-4 z-50 max-w-md rounded-lg shadow-lg overflow-hidden"
            style={{
                animation: "slideIn 0.3s ease-out",
            }}
        >
            <div
                style={{
                    background: "linear-gradient(to right, #8b5cf6, #ec4899)",
                    padding: "16px",
                    color: "white",
                    position: "relative",
                    borderRadius: "8px",
                }}
            >
                <button
                    onClick={() => setVisible(false)}
                    style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "transparent",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.8)",
                        cursor: "pointer",
                    }}
                    aria-label="Close notification"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div style={{ paddingRight: "20px" }}>
                    <p style={{ fontWeight: "500", marginBottom: "4px" }}>Please Note</p>
                    <p style={{ fontSize: "14px", opacity: "0.9" }}>
                        Since this is a non-revenue generating project, the backend is deployed on free serverless hosting, so it
                        might experience cold starts. Please expect all functionalities to work after one minute.
                    </p>
                </div>
            </div>
            <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    )
}

