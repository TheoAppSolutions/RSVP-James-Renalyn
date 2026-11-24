"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EVENT } from "@/lib/event";
import { MUSIC_PLAY_EVENT } from "@/lib/music";

function PlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {playing ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="m8 4 12 8-12 8z" />}
    </svg>
  );
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playbackPending = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const label = playing ? "Pause wedding music" : "Play wedding music";

  useEffect(() => {
    // Cached audio can load before React attaches the metadata listener.
    const length = audioRef.current?.duration;
    if (length && Number.isFinite(length)) setDuration(length);
  }, []);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused || playbackPending.current) return;

    playbackPending.current = true;
    setError("");
    setPending(true);
    try {
      await audio.play();
    } catch {
      setError("The music couldn’t play. Please try again.");
    } finally {
      playbackPending.current = false;
      setPending(false);
    }
  }, []);

  useEffect(() => {
    const resumeMusic = () => { void playMusic(); };
    window.addEventListener(MUSIC_PLAY_EVENT, resumeMusic);
    return () => window.removeEventListener(MUSIC_PLAY_EVENT, resumeMusic);
  }, [playMusic]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || playbackPending.current) return;
    if (!audio.paused) {
      audio.pause();
    } else {
      void playMusic();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="metadata"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          const length = event.currentTarget.duration;
          setDuration(Number.isFinite(length) ? length : 0);
        }}
        onError={() => {
          setPlaying(false);
          setError("The music is unavailable right now. Please try again later.");
        }}
      />

      <section id="music" className="music-section" aria-labelledby="music-title">
        <div className="section-wrap music-inner">
          <div className="music-intro">
            <span className="eyebrow">A soundtrack for our story</span>
            <h2 id="music-title" className="display-heading">Love, set to <em>music.</em></h2>
            <p>Press play and share a little of the joy as you explore our day.</p>
          </div>

          <div className={`music-player${playing ? " is-playing" : ""}`}>
            <div className="music-record" aria-hidden="true">
              <Image src="/music-cover.webp" alt="" width={64} height={64} sizes="(max-width: 560px) 48px, 64px" className="music-record-cover" />
            </div>
            <div className="music-track">
              <span className="eyebrow">Our wedding soundtrack</span>
              <p>{EVENT.honoree}</p>
              <span className="music-status">{pending ? "Loading music…" : playing ? "Playing with love" : "A little love on repeat"}</span>
            </div>
            <button type="button" className="music-play" onClick={togglePlayback} aria-label={label} aria-pressed={playing} disabled={pending}>
              <PlaybackIcon playing={playing} />
            </button>
            <div className="music-timeline">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                disabled={!duration}
                aria-label="Music playback position"
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                onChange={(event) => {
                  const time = Number(event.target.value);
                  if (audioRef.current) audioRef.current.currentTime = time;
                  setCurrentTime(time);
                }}
              />
              <div className="music-times"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
            </div>
            <p className="music-error" role="status">{error}</p>
          </div>
        </div>
      </section>

      <button
        type="button"
        className={`music-floating${playing ? " is-playing" : ""}`}
        onClick={togglePlayback}
        aria-label={label}
        aria-pressed={playing}
        disabled={pending}
        title={label}
      >
        <PlaybackIcon playing={playing} />
        <span className="music-floating-label">{pending ? "Loading…" : playing ? "Pause music" : "Play music"}</span>
      </button>
    </>
  );
}
