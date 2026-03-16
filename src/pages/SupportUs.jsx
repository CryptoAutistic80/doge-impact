import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './SupportUs.css';

const donationWallets = [
  {
    asset: 'ETH / BNB',
    network: 'Ethereum or BNB Smart Chain',
    address: '0x914545dCEAE814ee06cb2B6f7F14F707F1CabB29',
  },
  {
    asset: 'Bitcoin Native SegWit',
    network: 'Bitcoin',
    address: 'bc1qe6zutx9ume8tl3pdysvrx9d2x85mhx4w8fz30a',
  },
  {
    asset: 'Solana',
    network: 'Solana',
    address: 'APumujD6AAScwCL2LMXp6p6dh5vXJ2TdhwUJRbqEgnZd',
  },
];

export default function SupportUs() {
  const [copiedWallet, setCopiedWallet] = useState('');
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const copyWithFallback = (value) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  };

  const handleCopyAddress = async (wallet) => {
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(wallet.address);
        copied = true;
      } else {
        copied = copyWithFallback(wallet.address);
      }
    } catch {
      copied = copyWithFallback(wallet.address);
    }

    if (!copied) {
      return;
    }

    setCopiedWallet(wallet.asset);

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopiedWallet('');
    }, 1800);
  };

  return (
    <div className="page-wrapper support-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-title">Keep the record alive</div>
        <h1 className="page-heading">Support Us</h1>

        <section className="support-hero">
          <div className="support-panel support-panel-primary">
            <div className="support-panel-label">Mission Statement</div>
            <p className="support-mission">
              This project exists to forever hold Elon Musk and DOGE accountable for the human cost of
              their actions, preserve the public record, and keep that evidence visible, sourced, and
              impossible to wave away.
            </p>
          </div>

          <div className="support-panel">
            <div className="support-panel-label">What Donations Fund</div>
            <div className="text-body support-copy">
              <p>
                All donations go toward that mission: keeping the site online, improving the data and
                sourcing, building new features, and expanding the tools we use to document impact and
                accountability.
              </p>
              <p>
                Every contribution helps keep this work public, current, and harder to ignore.
              </p>
            </div>
          </div>
        </section>

        <section className="support-milestone">
          <div className="support-panel-label">Funding Milestone</div>
          <div className="milestone-amount">$500</div>
          <p className="text-body support-copy">
            When total donations reach $500, we will create a rogues gallery of those known and
            confirmed to have taken part in DOGE.
          </p>
        </section>

        <section className="wallet-section">
          <div className="support-panel-label">Donation Wallets</div>
          <p className="text-body support-copy wallet-intro">
            Send only on the matching network for the asset you are using.
          </p>

          <div className="wallet-grid">
            {donationWallets.map((wallet, index) => (
              <motion.button
                key={wallet.asset}
                type="button"
                className="wallet-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleCopyAddress(wallet)}
                aria-label={`Copy ${wallet.asset} donation address`}
              >
                <div>
                  <div className="wallet-asset-row">
                    <div className="wallet-asset">{wallet.asset}</div>
                    <span className={`wallet-status ${copiedWallet === wallet.asset ? 'copied' : ''}`}>
                      {copiedWallet === wallet.asset ? 'Copied' : 'Click to copy'}
                    </span>
                  </div>
                  <div className="wallet-network">{wallet.network}</div>
                </div>
                <code className="wallet-address">{wallet.address}</code>
              </motion.button>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
