import React from 'react';
import './Heartbeat.css';

export default function Heartbeat({ isFlatlining }) {
    return (
        <div className="heartbeat-container">
            <svg
                viewBox="0 0 1000 50"
                className={`heartbeat-svg ${isFlatlining ? 'flatline-animation' : 'beat-animation'}`}
                preserveAspectRatio="none"
            >
                {isFlatlining ? (
                    <path
                        className="ekg-line flatline-path"
                        d="M 0 25 L 1000 25"
                    />
                ) : (
                    <path
                        className="ekg-line"
                        d="
                        M 0 25 L 30 25 L 35 10 L 45 45 L 55 5 L 60 25 L 100 25 
                        L 130 25 L 135 10 L 145 45 L 155 5 L 160 25 L 200 25
                        L 230 25 L 235 10 L 245 45 L 255 5 L 260 25 L 300 25
                        L 330 25 L 335 10 L 345 45 L 355 5 L 360 25 L 400 25
                        L 430 25 L 435 10 L 445 45 L 455 5 L 460 25 L 500 25
                        L 530 25 L 535 10 L 545 45 L 555 5 L 560 25 L 600 25
                        L 630 25 L 635 10 L 645 45 L 655 5 L 660 25 L 700 25
                        L 730 25 L 735 10 L 745 45 L 755 5 L 760 25 L 800 25
                        L 830 25 L 835 10 L 845 45 L 855 5 L 860 25 L 900 25
                        L 930 25 L 935 10 L 945 45 L 955 5 L 960 25 L 1000 25
                        "
                    />
                )}
            </svg>
        </div>
    );
}
