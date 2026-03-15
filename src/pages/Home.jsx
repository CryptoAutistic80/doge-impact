import React from 'react';
import { motion } from 'framer-motion';
import Counter from '../components/Counter';
import './Home.css';
import { ArrowDown } from 'lucide-react';

export default function Home() {
    const scrollToBreakdown = () => {
        document.getElementById('breakdown').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section className="hero">
                <div className="hero-bg" style={{ backgroundImage: "url('/hero-bg.png')" }} />
                <div className="hero-gradient" />

                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="label-top"
                    >
                        Estimated deaths caused by
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="label-name"
                    >
                        Elon Musk's Department of Government Efficiency
                    </motion.h1>

                    <Counter />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="counter-subtitle"
                    >
                        and counting
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="rate-display"
                    >
                        <span>88</span> deaths per hour
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="quote"
                    >
                        <blockquote>"Zero people have died."</blockquote>
                        <cite>— Elon Musk, May 2025, responding to the New York Times</cite>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                        className="scroll-hint"
                        onClick={scrollToBreakdown}
                    >
                        <span>Breakdown</span>
                        <ArrowDown size={16} />
                    </motion.div>
                </div>
            </section>

            <section id="breakdown" className="breakdown">
                <div className="section-label">Breakdown by category</div>

                <div className="category">
                    <div className="category-name">
                        USAID / Foreign Aid Dismantlement — Global Health
                        <span className="peer-reviewed">Peer-reviewed</span>
                    </div>
                    <div className="category-figure">781,343+</div>
                    <div className="category-context">
                        DOGE spearheaded the cancellation of 83% of USAID programmes within weeks of inauguration. The Impact Counter project by Prof. Brooke Nichols (Boston University) — independently peer-reviewed and published in the Journal of the International AIDS Society — estimated 781,343 excess deaths by the one-year mark (January 2026), predominantly children. The Center for Global Development estimated 500,000–1,000,000 deaths in FY2025 alone. A Lancet study projects 14 million additional deaths by 2030 if cuts continue. The counter above uses Nichols's peer-reviewed model as its baseline.
                    </div>
                </div>

                <div className="category">
                    <div className="category-name">PEPFAR — HIV/AIDS Treatment Disruption</div>
                    <div className="category-figure">174,000+</div>
                    <div className="category-context">
                        PEPFAR supported 20 million people on antiretroviral treatment across 55 countries. DOGE-driven stop-work orders disrupted medication supplies to 2.3 million people on lifesaving antiretrovirals. Stock-outs of HIV medicines were reported across sub-Saharan Africa. ImpactCounter estimated 158,000+ adult deaths from HIV alone in sub-Saharan Africa within the first year, plus 16,000 child deaths. This figure is included within the USAID total above but shown separately to illustrate scale.
                    </div>
                </div>

                <div className="category">
                    <div className="category-name">Child Deaths — Pneumonia, Diarrhea, Malaria, Malnutrition</div>
                    <div className="category-figure">500,000+</div>
                    <div className="category-context">
                        Of the total excess deaths, the majority are children. ImpactCounter broke these down: 164,000+ child deaths from pneumonia, 125,000+ from diarrhea, 70,000+ from malaria, and tens of thousands more from malnutrition — all from terminated USAID programmes that previously provided vaccines, oral rehydration therapy, bed nets, and therapeutic feeding. The Lancet projects 700,000 additional child deaths per year if cuts continue.
                    </div>
                </div>

                <div className="category">
                    <div className="category-name">Veterans Affairs — Domestic Healthcare Disruption</div>
                    <div className="category-figure unquantified">Unquantified</div>
                    <div className="category-context">
                        2,400+ VA employees fired, with plans to cut 80,000 more (1 in 5 staff). Suicide prevention services temporarily cancelled. Cancer research contracts terminated. VA doctors report care disruption nationwide. Veterans Crisis Line staff fired. Transportation services for disabled veterans cut. ProPublica revealed DOGE used an AI tool to mark VA contracts as "MUNCHABLE" for cancellation — including cancer treatment equipment and blood analysis services. The death toll from domestic VA disruption has not yet been formally modelled but veterans were already dying on waitlists before these cuts.
                    </div>
                </div>

                <div className="category">
                    <div className="category-name">Domestic Health — HHS, CDC, NIH, FDA, Medicare</div>
                    <div className="category-figure unquantified">Unquantified</div>
                    <div className="category-context">
                        20,000 HHS employees cut. 35% reduction in all HHS contract spending ($13.6B/yr). Half of HHS regional offices closed. 694+ NIH grants terminated ($1.8B in revoked funding). CDC disease surveillance programmes defunded. Infectious disease tracking disrupted — the US lost its measles elimination status. FDA food safety inspectors reduced. Medicaid facing 11% annual cuts affecting 72 million low-income Americans. These impacts will produce excess deaths over years and decades, but no formal model yet exists to quantify them.
                    </div>
                </div>
            </section>
        </>
    );
}
