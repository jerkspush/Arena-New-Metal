/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCcw, Skull, Swords, Zap } from 'lucide-react';

const INITIAL_BANDS = [
  "Korn", "Limp Bizkit", "Linkin Park", "Slipknot", "Deftones", "System of a Down", 
  "Papa Roach", "P.O.D.", "Disturbed", "Mudvayne", "Static-X", "Coal Chamber", 
  "Evanescence", "Sevendust", "Soulfly", "Incubus", "Staind", "Godsmack", 
  "Adema", "Alien Ant Farm", "Drowning Pool", "Taproot", "Orgy", "Ill Niño", 
  "Kittie", "Mushroomhead", "Dope", "Nonpoint", "Trust Company", "Hed PE", 
  "Crazy Town", "Spineshank", "Trapt", "The Union Underground", "American Head Charge", 
  "Primer 55", "Dry Kill Logic", "Nothingface", "Chimaira", "Flaw", 
  "40 Below Summer", "Motograter", "Skrape", "Stereomud", "Reveille", 
  "Machine Head", "Sepultura", "Snot", "Finger Eleven"
];

const BAND_IMAGES: Record<string, string> = {
  "Korn": "https://i8.amplience.net/i/naras/Korn-1997-GettyImages-85234190",
  "Limp Bizkit": "https://www.infobae.com/resizer/v2/5ZAOM2VKQJHN7AYTNF7XBKIQPQ.jpg?auth=91abf42dd80df6e5a6dd8164a0a61717a7897e16f7ef3ac8aade7ac20d879cac",
  "Linkin Park": "https://preview.redd.it/linkin-park-is-my-favourite-band-and-my-special-interest-v0-j0inimgbuop91.jpg?width=1080&crop=smart&auto=webp&s=768c13d005407134fa30c77dd59e9c9da581149e",
  "Slipknot": "https://static.wikia.nocookie.net/nu-metal/images/d/d4/Slipknot-slipknot-2364810-1024-768.jpg/revision/latest?cb=20130108132530",
  "Deftones": "https://i.redd.it/si94isns4b6g1.jpeg",
  "System of a Down": "https://static.tvtropes.org/pmwiki/pub/images/soad.jpg",
  "Papa Roach": "https://cdn.mos.cms.futurecdn.net/fDDWtr4nngLbuAFqwwPwM6.jpg",
  "P.O.D.": "https://cdn.mos.cms.futurecdn.net/QcwNgSjrjSbNrmCFcTAFWi-1200-80.jpg",
  "Disturbed": "https://i.pinimg.com/736x/fa/66/47/fa66479807301fd341c753d54903ee95.jpg",
  "Mudvayne": "https://preview.redd.it/heaviest-mudvayne-song-v0-equgldp7z1lb1.jpg?width=1080&crop=smart&auto=webp&s=15688e4e0c50f03632753780df38fbe899fe6f14",
  "Static-X": "https://www.mm-group.org/wp-content/uploads/2016/08/StaticX_02.jpg",
  "Coal Chamber": "https://cdn.mos.cms.futurecdn.net/gHevqp5qjZY6pQ8nRRaHkE-1200-80.jpg",
  "Evanescence": "https://i.redd.it/ayza0qrktmib1.jpg",
  "Sevendust": "https://www.mm-group.org/wp-content/uploads/2016/08/Sevendust_07.jpg",
  "Soulfly": "https://cdn.mos.cms.futurecdn.net/9vD79JuqjRPAigQrxfPRmS-1200-80.jpg",
  "Incubus": "https://www.rollingstone.com/wp-content/uploads/2024/02/incubus-embed.jpg?w=1024",
  "Staind": "https://i.redd.it/mcb1yvpj03if1.jpeg",
  "Godsmack": "https://townsquare.media/site/366/files/2014/12/Godsmack.jpg",
  "Adema": "https://lastfm.freetls.fastly.net/i/u/ar0/52e6ad00f17042fda8491d5e7a6661ca.jpg",
  "Alien Ant Farm": "https://www.nme.com/wp-content/uploads/2016/09/AlienAntFarmPA110811.jpg",
  "Drowning Pool": "https://static.wikia.nocookie.net/rock/images/6/69/Drowning_pool.jpg/revision/latest?cb=20180415212726",
  "Taproot": "https://preview.redd.it/i-just-listened-to-taproot-for-the-first-time-and-their-v0-kwlv7h04wbwa1.jpg?auto=webp&s=ce62aa7086a04b039a4af4374d79dfdea2bf7c14",
  "Orgy": "https://townsquare.media/site/366/files/2022/02/attachment-orgy_2022.jpg?w=780&q=75",
  "Ill Niño": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMY_IUa_BR7wZ1DVcTUttie-UCxwzIKGQVaA&s",
  "Kittie": "https://images.kerrangcdn.com/images/Kittie-Promo-2025.jpg?auto=compress&w=800&fit=crop&fp-x=0.5&fp-y=0.5",
  "Mushroomhead": "https://www.eclipserecords.com/wp-content/uploads/Mushroomhead-1600x800.jpg",
  "Dope": "https://r2.theaudiodb.com/images/media/artist/thumb/tuuxtw1359234254.jpg",
  "Nonpoint": "https://fraudstersalmanac.com/wp-content/uploads/2022/07/nonpoint-a.jpg?w=400",
  "Trust Company": "https://www.metal-tracker.com/torrents/images/1903160.jpg",
  "Hed PE": "https://preview.redd.it/numetal-a-band-called-hed-p-e-v0-1errnxbjjqkg1.jpeg?auto=webp&s=6fc3c079d3e9aa5acccf7d796cef78aae779ec75",
  "Crazy Town": "https://metalmusicmania.wordpress.com/wp-content/uploads/2009/08/crazy_town.jpg?w=640",
  "Spineshank": "https://i.redd.it/147i553wxhce1.jpeg",
  "Trapt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--zhljFNtbgIAEsz4brFlN6pZdcvTkTU88A&s",
  "The Union Underground": "https://lastfm.freetls.fastly.net/i/u/ar0/7ab917be6c2e46079a56c1b8d409d598.jpg",
  "American Head Charge": "https://www.soundspheremag.com/wp-content/migration/images/stories/AHC.png",
  "Primer 55": "https://cdn-images.dzcdn.net/images/artist/b8ba986869247c7b7db29712f432568f/1900x1900-000000-80-0-0.jpg",
  "Dry Kill Logic": "https://i.discogs.com/mFQLE3lYSVUewbT0gH-pdZShSAl5zZv9IH8pW6tWp2o/rs:fit/g:sm/q:90/h:381/w:575/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM5MTc4/Mi0xNTU2MjkyNTcz/LTc4NjUuanBlZw.jpeg",
  "Nothingface": "https://lh3.googleusercontent.com/proxy/edKaOnJnYqRaEdjvkdBvVpZ6QFTEUkWgvxQAFSs9ALqquxaOVDA8as7EtOpKlSGkDGBFyH6zsinEiZFzlKhGft0KWO5dxhoxFY3SUICEWZ-jbYjkPLhRM_eVhQoSnWI0qlA",
  "Chimaira": "https://i.redd.it/dygap1kz1kq01.jpg",
  "Flaw": "https://i.discogs.com/o_5tLngwSlz-W4aXXMC6ybnkDORNIhMRA4EDILBJ6YY/rs:fit/g:sm/q:90/h:600/w:510/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMzMzI5/MC0xNDIyMzEyOTUy/LTczNjAuanBlZw.jpeg",
  "40 Below Summer": "https://numetalagenda.com/content/images/2024/06/40below.webp",
  "Motograter": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSqaL46qxmh8uoAPg4oQ63f9yj-VAlNeFaLw&s",
  "Skrape": "https://upload.wikimedia.org/wikipedia/en/d/d4/Skrape_%28band%29.jpg",
  "Stereomud": "https://upload.wikimedia.org/wikipedia/en/4/4f/Stereomud.jpg",
  "Reveille": "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Reveille_%28band%29.jpg/250px-Reveille_%28band%29.jpg",
  "Machine Head": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEs0Cp3mqja9KaBM_BSw-nM52lJYtiultU5A&s",
  "Sepultura": "https://rollingstone.com.br/wp-content/uploads/2025/01/sepultura-1996-foto-mick-hutson-redferns.jpg",
  "Snot": "https://preview.redd.it/do-you-classify-snot-a-hardcore-band-or-nu-metal-v0-uubnd2j9epxd1.jpeg?auto=webp&s=60b987352cf4b6e526996409c0bff14fb2259d16",
  "Finger Eleven": "https://lastfm.freetls.fastly.net/i/u/300x300/2f94c3a86fc44a2dbc74b9d091be6764"
};

export default function App() {
  const [pool, setPool] = useState<string[]>(() => [...INITIAL_BANDS].sort(() => Math.random() - 0.5));
  const [winners, setWinners] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [currentDuel, setCurrentDuel] = useState<[string, string] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  // Initialize or progress the tournament
  useEffect(() => {
    if (winner) return;

    if (!currentDuel) {
      if (pool.length >= 2) {
        // Normal case: pick two from the pool
        const nextTwo = pool.slice(0, 2);
        setCurrentDuel([nextTwo[0], nextTwo[1]]);
        setPool(prev => prev.slice(2));
      } else if (pool.length === 1) {
        // Odd number of bands: one gets a "bye" to the next round
        const luckyBand = pool[0];
        setWinners(prev => [...prev, luckyBand]);
        setPool([]);
      } else if (pool.length === 0) {
        // Pool is empty, check winners
        if (winners.length > 1) {
          // Start next stage
          setPool([...winners].sort(() => Math.random() - 0.5));
          setWinners([]);
        } else if (winners.length === 1) {
          // We have a champion
          setWinner(winners[0]);
        }
      }
    }
  }, [pool, winners, currentDuel, winner]);

  const handleChoice = (chosen: string) => {
    setWinners(prev => [...prev, chosen]);
    setCurrentDuel(null);
    setRound(prev => prev + 1);
  };

  const resetGame = () => {
    setPool([...INITIAL_BANDS].sort(() => Math.random() - 0.5));
    setWinners([]);
    setRound(1);
    setCurrentDuel(null);
    setWinner(null);
  };

  const getBandImage = (name: string) => {
    return BAND_IMAGES[name] || `https://picsum.photos/seed/${encodeURIComponent(name)}/600/800`;
  };

  const getBandNameSize = (name: string, isWinner: boolean = false) => {
    const length = name.length;
    if (isWinner) {
      if (length > 15) return "text-2xl md:text-4xl";
      return "text-3xl md:text-5xl";
    }
    if (length > 15) return "text-lg md:text-3xl";
    return "text-xl md:text-4xl";
  };

  const remainingCount = pool.length + winners.length + (currentDuel ? 2 : 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#00FF00] selection:text-black overflow-x-hidden relative flex flex-col">
      {/* Background Image */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/d/10Emu9yln-dCq4yJfYPMnJOp2ihtC5UIv')" }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex flex-col items-center border-b border-[#00FF00]/10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-2"
        >
          <Skull className="text-[#00FF00] w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic whitespace-nowrap">
            Arena <span className="text-[#00FF00]">Nü Metal</span>
          </h1>
        </motion.div>
        
        {!winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 py-2 px-6 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-full"
          >
            <p className="text-[#00FF00] font-black uppercase italic tracking-tighter text-lg md:text-2xl">
              Qual sua banda favorita?
            </p>
          </motion.div>
        )}
      </header>

      <main className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div
              key="winner"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="flex flex-col items-center text-center py-8"
            >
              <div className="relative mb-8 group">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -inset-4 bg-[#00FF00] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                />
                <div className="text-6xl md:text-8xl mb-6 relative z-10 drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]">🏆</div>
                <h2 className="text-xl md:text-2xl font-mono uppercase tracking-widest text-[#00FF00] mb-6 max-w-md mx-auto leading-relaxed">
                  Sua banda favorita nessa batalha é:
                </h2>
                <div className="relative overflow-hidden rounded-2xl border-4 border-[#00FF00] shadow-[0_0_50px_rgba(0,255,0,0.3)] aspect-square w-64 md:w-80 mx-auto">
                  <img 
                    src={getBandImage(winner)} 
                    alt={winner}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className={`font-black uppercase italic tracking-tighter ${getBandNameSize(winner, true)}`}>{winner}</h3>
                  </div>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="flex items-center gap-2 bg-[#00FF00] text-black px-8 py-4 rounded-full font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-transform"
              >
                <RefreshCcw className="w-5 h-5" /> Jogar Novamente
              </button>
            </motion.div>
          ) : currentDuel ? (
            <motion.div
              key="duel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-2 gap-3 md:gap-12 items-center relative">
                {currentDuel.map((band, idx) => (
                  <motion.div
                    key={band}
                    initial={{ x: idx === 0 ? -50 : 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                    onClick={() => handleChoice(band)}
                  >
                    <div className="relative overflow-hidden rounded-xl border-2 border-white/10 group-hover:border-[#00FF00]/50 transition-colors aspect-square">
                      <img 
                        src={getBandImage(band)} 
                        alt={band}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-[#00FF00] font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Escolher
                        </p>
                        <h3 className={`font-black uppercase italic tracking-tighter leading-none break-words ${getBandNameSize(band)}`}>
                          {band}
                        </h3>
                      </div>
                    </div>
                    
                    {/* VS Badge */}
                    {idx === 0 && (
                      <div className="absolute -right-[1.5rem] md:-right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-20 md:h-20 flex items-center justify-center bg-[#00FF00] text-black rounded-full font-black italic text-sm md:text-2xl border-4 md:border-8 border-[#0a0a0a] rotate-12">
                        VS
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Round and Remaining Count */}
              <div className="flex justify-center gap-6 text-xs font-mono uppercase tracking-widest text-gray-400 mt-4">
                <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <Zap className="w-3 h-3 text-[#00FF00]" /> Rodada {round}
                </span>
                <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <Swords className="w-3 h-3 text-[#00FF00]" /> {remainingCount} Bandas Restantes
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center py-20">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <RefreshCcw className="w-12 h-12 text-[#00FF00]" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* YouTube Player Banner - Persistent at the bottom */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-2xl mx-auto mt-12 overflow-hidden rounded-xl border border-[#00FF00]/30 bg-black/40 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-2 p-2 px-4 border-b border-[#00FF00]/10 bg-[#00FF00]/5">
              <Zap className="w-3 h-3 text-[#00FF00]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Nu Metal Radio</span>
            </div>
            <iframe 
              width="100%" 
              height="150" 
              src="https://www.youtube.com/embed/videoseries?list=PLCF5tFqYDns9fdvc7POpaZxcN1okiWhSn" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="opacity-80 hover:opacity-100 transition-opacity"
            ></iframe>
          </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-8 text-center text-gray-600 text-xs font-mono uppercase tracking-widest">
        Arena Nu Metal &copy; 2026 • BY FUTZZZ
      </footer>
    </div>
  );
}
