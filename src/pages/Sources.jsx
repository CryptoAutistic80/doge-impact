import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Sources() {
    const sources = [
        { title: "Impact Counter — Prof. Brooke Nichols, Boston University (peer-reviewed model)", link: "https://www.impactcounter.com/dashboard" },
        { title: "The Lancet — Evaluating the impact of two decades of USAID interventions (July 2025)", link: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)01186-9/fulltext" },
        { title: "CNN / The Lancet — 9.4 million projected deaths from global aid cuts by 2030 (Feb 2026)", link: "https://www.cnn.com/2026/02/04/world/lancet-usaid-global-aid-cuts-intl" },
        { title: "Center for Global Development — Update on Lives Lost from USAID Cuts (Dec 2025)", link: "https://www.cgdev.org/blog/update-lives-lost-usaid-cuts" },
        { title: "Harvard T.H. Chan School of Public Health — Atul Gawande on USAID shutdown deaths", link: "https://hsph.harvard.edu/news/usaid-shutdown-has-led-to-hundreds-of-thousands-of-deaths/" },
        { title: "Senator Brian Schatz — 360,000 deaths cited on Senate floor", link: "https://www.schatz.senate.gov/news/press-releases/schatz-details-trump-administrations-destruction-of-usaid-deadly-consequences-that-followed-as-senate-considers-codifying-doge-cuts" },
        { title: "Wikipedia — Department of Government Efficiency", link: "https://en.wikipedia.org/wiki/Department_of_Government_Efficiency" },
        { title: "ProPublica — DOGE's AI-driven VA contract cancellations", link: "https://www.propublica.org/article/doge-veterans-affairs-ai-senator-investigation" },
        { title: "CIDRAP — 762,000+ deaths including 500,000+ children (Jan 2026)", link: "https://www.cidrap.umn.edu/chikungunya/quick-takes-death-toll-usaid-cuts-withdrawal-chikungunya-vaccine-funding-updated-ebola" },
        { title: "TIME — Trump's Year of Government Cuts (Jan 2026)", link: "https://time.com/7342386/trump-government-cuts-foreign-aid-health-climate-workers/" },
        { title: "Health Policy Watch — 757,314 deaths at one year, 88 per hour", link: "https://healthpolicy-watch.news/the-human-cost-one-year-after-the-us-took-a-chainsaw-to-global-health/" },
    ];

    return (
        <div className="page-wrapper">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="page-title">Peer-reviewed origins</div>
                <h1 className="page-heading">Sources & Impact</h1>

                <div className="text-body" style={{ marginBottom: '3rem' }}>
                    <p>
                        The figures and methodologies cited on this site are drawn from leading epidemiological, public health, and journalistic institutions. Below is the comprehensive list of reference materials.
                    </p>
                </div>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {sources.map((src, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            style={{
                                padding: '1.25rem 0',
                                borderBottom: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem'
                            }}
                        >
                            <ExternalLink size={18} color="var(--grey)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <a href={src.link} target="_blank" rel="noopener noreferrer" className="inline-link" style={{
                                fontFamily: 'var(--mono)',
                                fontSize: '0.85rem',
                                color: 'var(--fg)',
                                textDecoration: 'none',
                                lineHeight: 1.5
                            }}>
                                {src.title}
                            </a>
                        </motion.li>
                    ))}
                </ul>

            </motion.div>
        </div>
    );
}
