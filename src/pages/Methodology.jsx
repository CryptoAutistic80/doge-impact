import React from 'react';
import { motion } from 'framer-motion';

export default function Methodology() {
    return (
        <div className="page-wrapper">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="page-title">How the data is calculated</div>
                <h1 className="page-heading">Methodology</h1>

                <div className="text-body">
                    <p>
                        Unlike the domestic categories (which lack formal mortality models), the global health death toll from DOGE's USAID dismantlement is backed by peer-reviewed academic research.
                    </p>
                    <p>
                        The primary counter uses the methodology of Prof. Brooke Nichols (Boston University School of Public Health), whose Impact Counter model was independently peer-reviewed and published in the Journal of the International AIDS Society.
                    </p>
                </div>

                <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                    <h2 style={{ fontFamily: 'var(--mono)', color: 'var(--amber)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        The Baseline Rate
                    </h2>
                    <div className="text-body">
                        <p>
                            Nichols's model estimated 781,343 excess deaths by January 24, 2026 — the one-year anniversary of the funding freeze — at which point the counter was retired.
                        </p>
                        <p style={{ marginTop: '1rem', color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--mono)', padding: '1.5rem', background: 'rgba(255, 32, 32, 0.05)', borderLeft: '3px solid var(--red)' }}>
                            Rate: ~88 deaths per hour (2,112 per day)
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            This site extrapolates forward from that baseline at the established daily rate, as the funding cuts remain in effect and have not been reversed. If anything, this is conservative: the Center for Global Development's December 2025 update estimated 500,000–1,000,000 deaths from FY2025 cuts alone, and a February 2026 Lancet study projects 9.4 million excess deaths globally from combined aid cuts by 2030.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                    <h2 style={{ fontFamily: 'var(--mono)', color: 'var(--amber)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        Unquantified Domestic Impacts
                    </h2>
                    <div className="text-body">
                        <p>
                            The "unquantified" domestic categories (VA, HHS, CDC, NIH, Medicare) are listed without numerical estimates because no peer-reviewed mortality model yet exists for those impacts.
                        </p>
                        <p>
                            They are included to show the full scope of DOGE's actions. As formal studies emerge, they can be incorporated.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                    <h2 style={{ fontFamily: 'var(--mono)', color: 'var(--amber)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        Attribution
                    </h2>
                    <div className="text-body">
                        <p>
                            Elon Musk's personal responsibility is attributed based on his documented role as de facto leader of DOGE (as found by a federal judge), his personal direction of the USAID dismantlement, and his public dismissal of the death toll ("zero people have died").
                        </p>
                        <p>
                            Senator Schatz cited 360,000 deaths on the Senate floor. Harvard's Atul Gawande cited 600,000 in The New Yorker. The Lancet published peer-reviewed estimates of millions more to come.
                        </p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
