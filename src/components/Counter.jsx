import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Counter() {
    const [count, setCount] = useState(781343); // Initial static fallback

    useEffect(() => {
        const referenceDate = new Date('2026-01-24T00:00:00Z');
        const baseTotal = 781343;
        const deathsPerSecond = 88 / 3600;

        let animationFrameId;

        const tick = () => {
            const now = new Date();
            const elapsedSeconds = (now.getTime() - referenceDate.getTime()) / 1000;
            const currentPrecise = baseTotal + Math.max(0, elapsedSeconds * deathsPerSecond);
            setCount(Math.floor(currentPrecise));
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <motion.div
            className="main-counter-wrap"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
        >
            <div className="main-counter">
                {count.toLocaleString('en-US')}
            </div>
        </motion.div>
    );
}
