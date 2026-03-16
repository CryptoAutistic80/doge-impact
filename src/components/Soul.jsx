import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Soul.css';

export default function Soul({ isAscending }) {
    const [path, setPath] = useState(null);

    useEffect(() => {
        if (isAscending) {
            // Random spawn along the full viewport width (10%-90% to avoid edges)
            const startXvw = 10 + Math.random() * 80; // percentage of viewport width

            // "Balloon in the wind" — gentle sinusoidal sway as it rises
            // Pick a random wind direction bias
            const windBias = (Math.random() - 0.5) * 25; // vw units of overall drift
            const swayAmplitude = 8 + Math.random() * 12; // vw units of sway

            // Build 8 waypoints for a smooth swaying path
            const steps = 8;
            const xPoints = [];
            const yPoints = [];
            const totalRise = window.innerHeight + 200; // rise well off screen

            for (let i = 0; i <= steps; i++) {
                const progress = i / steps;
                // Sinusoidal sway + linear wind drift
                const sway = Math.sin(progress * Math.PI * 3) * swayAmplitude;
                const drift = windBias * progress;
                xPoints.push(startXvw + sway + drift);
                yPoints.push(-progress * totalRise);
            }

            setPath({
                startX: startXvw,
                xVw: xPoints,
                yPx: yPoints,
                times: Array.from({ length: steps + 1 }, (_, i) => i / steps)
            });
        }
    }, [isAscending]);

    if (!path) return null;

    return (
        <AnimatePresence>
            {isAscending && (
                <motion.div
                    className="soul-container"
                    style={{ left: `${path.startX}vw` }}
                    initial={{ opacity: 0, scale: 0.3, y: 0, x: 0 }}
                    animate={{
                        opacity: [0, 0.9, 1, 1, 1, 0.8, 0.5, 0.2, 0],
                        scale: [0.3, 0.8, 1, 1.1, 1.1, 1, 0.9, 0.7, 0.4],
                        x: path.xVw.map((vw, i) => `${vw - path.startX}vw`),
                        y: path.yPx
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    transition={{
                        duration: 15, // Match the flatline duration
                        ease: "easeInOut",
                        times: path.times
                    }}
                >
                    <div className="soul-orb"></div>
                    <div className="soul-trail"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
