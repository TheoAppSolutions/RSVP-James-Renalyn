export const MUSIC_PLAY_EVENT = "wedding:play-music";

export function requestMusicPlayback() {
  window.dispatchEvent(new Event(MUSIC_PLAY_EVENT));
}
