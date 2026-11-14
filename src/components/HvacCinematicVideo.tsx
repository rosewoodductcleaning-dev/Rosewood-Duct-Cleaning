import React, { useRef, useState } from 'react';
import { Play, Pause, Maximize2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HvacCinematicVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen?.();
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      
      {/* Luxury Cinematic Video Outer Frame with Walnut Brown Shadow */}
      <div className="relative rounded-3xl sm:rounded-[36px] p-2 sm:p-3 bg-gradient-to-b from-[#75401F]/20 via-[#D94D78]/15 to-[#75401F]/25 shadow-2xl shadow-[#542B16]/25 border-2 border-[#75401F]/25 overflow-hidden">
        
        <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden bg-[#1e1713] aspect-video group">
          
          {/* Real Autoplay Looping HTML5 Video */}
          <video
            ref={videoRef}
            src="/assets/videos/rosewood_duct_cleaning_cinematic.mp4"
            poster="/assets/images/video_shot_technician_unbranded.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            {/* Fallback image if browser restricts video */}
            <img
              src="/assets/images/video_shot_technician_unbranded.jpg"
              alt="Real professional HVAC air duct cleaning operation with commercial rotary brush and vacuum"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Top-Left Authentic Field Footage Badge */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-2 pointer-events-none">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#75401F]/20 shadow-md text-[#542B16] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D94D78] animate-pulse" />
              <span>Certified Field Footage</span>
            </span>
          </div>

          {/* Top-Right Authentic Rosewood Brand Seal */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-md border border-[#75401F]/20 shadow-md pointer-events-none">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#75401F]/25 bg-white p-0.5 shrink-0">
              <img
                src="/assets/aistudio/rosewood_duct_pic_4f781af9.jpeg"
                alt="Rosewood Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block text-left">
              <span className="font-display font-black text-[11px] text-[#542B16] block leading-none">
                Rosewood Duct Cleaning
              </span>
              <span className="text-[9px] text-[#75401F] font-bold block mt-0.5">
                HEPA Negative-Air Process
              </span>
            </div>
          </div>

          {/* Discreet Hover Playback Controls */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] text-[#542B16] shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm border border-[#75401F]/20"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#D94D78]" /> : <Play className="w-4 h-4 text-[#D94D78]" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] text-[#542B16] shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm border border-[#75401F]/20 hidden sm:block"
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-[#542B16]" />
            </button>
          </div>

          {/* Bottom subtle progress line indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div className="h-full bg-[#D94D78]/80 w-full animate-pulse" />
          </div>

        </div>

      </div>

      {/* Cinematic Documentary Narrative Caption */}
      <div className="mt-4 px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#542B16]">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0 hidden sm:block" />
          <p className="text-[#352319]/85 text-xs sm:text-sm font-medium leading-relaxed">
            <strong className="text-[#542B16]">Real-World HVAC Air Duct Cleaning:</strong> Commercial rotary nylon brush scrubs galvanized metal duct walls while industrial negative-air HEPA vacuum containment extracts all dislodged debris.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F0E7] border border-[#75401F]/20 text-[#75401F] text-[11px] font-bold shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D94D78]" />
          <span>100% Negative Air Containment</span>
        </div>
      </div>

    </div>
  );
};
