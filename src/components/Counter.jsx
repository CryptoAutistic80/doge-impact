import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Heartbeat from './Heartbeat';
import Soul from './Soul';

export default function Counter() {
    const [count, setCount] = useState(781343); // Initial static fallback
    const [isFlatlining, setIsFlatlining] = useState(false);

    const lastCountRef = useRef(null);
    const flatlineTimeoutRef = useRef(null);
    const isFirstRun = useRef(true);

    useEffect(() => {
        const referenceDate = new Date('2026-01-24T00:00:00Z');
        const baseTotal = 781343;
        const deathsPerSecond = 88 / 3600;

        let animationFrameId;

        const tick = () => {
            const now = new Date();
            const elapsedSeconds = (now.getTime() - referenceDate.getTime()) / 1000;
            const currentPrecise = baseTotal + Math.max(0, elapsedSeconds * deathsPerSecond);
            const currentFloor = Math.floor(currentPrecise);

            if (isFirstRun.current) {
                lastCountRef.current = currentFloor;
                isFirstRun.current = false;
            } else if (currentFloor > lastCountRef.current) {
                lastCountRef.current = currentFloor;
                setIsFlatlining(true);

                if (flatlineTimeoutRef.current) {
                    clearTimeout(flatlineTimeoutRef.current);
                }

                flatlineTimeoutRef.current = setTimeout(() => {
                    setIsFlatlining(false);
                }, 15000); // 15 seconds flatline
            }

            setCount(currentFloor);
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();
        return () => {
            cancelAnimationFrame(animationFrameId);
            if (flatlineTimeoutRef.current) {
                clearTimeout(flatlineTimeoutRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            className="main-counter-wrap"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
            style={{ position: 'relative' }}
        >
            <div className="main-counter">
                {count.toLocaleString('en-US')}
            </div>
            <Heartbeat isFlatlining={isFlatlining} />
            <Soul isAscending={isFlatlining} />
        </motion.div>
    );
}
