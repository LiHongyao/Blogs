import React, { ChangeEvent, useEffect, useRef } from "react";

import { Synthetizer, Sequencer } from "spessasynth_lib";
import "./App.css";

const App: React.FC = () => {
  // refs
  const ref_seq = useRef<Sequencer | null>(null);
  const ref_synth = useRef<Synthetizer | null>(null);

  // events
  const onPlay = async () => {
    ref_seq.current?.play();
  };
  const onPause = () => {
    ref_seq.current?.pause();
  };
  const onStop = () => {
    ref_seq.current?.stop();
  };
  const onReplay = () => {
    ref_seq.current?.play(true);
  };
  const onPlayAt20Seconds = () => {
    if (ref_seq.current) {
      ref_seq.current.currentTime = 110;
      ref_seq.current.play();
    }
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !ref_synth.current) return;
    const midiFile = await file.arrayBuffer();
    ref_seq.current = new Sequencer([{ binary: midiFile, altName: "" }], ref_synth.current);
    ref_seq.current.loop = false;
    ref_seq.current.addOnSongEndedEvent(() => {
      console.log("play ended");
    }, "_");
  };

  const fetchSf3 = async (url: string): Promise<ArrayBuffer> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      return await response.arrayBuffer();
    } catch (error) {
      console.error(`Error fetching soundfont from ${url}:`, error);
      throw error;
    }
  };

  /**
   * Load sf3 resources
   *
   * Load the timbre file, in order to facilitate the demonstration,
   * here load all the timbre files at one time, the actual application will be loaded on demand,
   * in the project, different style templates will use different timbre files,
   * while the user can choose different Musical Instruments, when the user adds the heart of the instrument,
   * the new timbre file will be loaded
   */

  const loadSf3 = async () => {
    const toneIds = Array.from({ length: 92 }, (_, id) => id);
    const sf3Urls = toneIds.map((toneId) => `/soundfonts/${toneId}.sf3`);
    const sf3Buffers = await Promise.all(sf3Urls.map(fetchSf3));

    /**
     * 🤔 This is confusing because the browser expects the AudioContext to be initialized after the user interaction
     */
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    await audioCtx.audioWorklet.addModule("/worklet_processor.min.js");

    const synth: Synthetizer = new Synthetizer(audioCtx.destination, sf3Buffers[0]);
    await synth.isReady;

    for (let index: number = 0; index < sf3Buffers.length; index++) {
      const buf: ArrayBuffer = sf3Buffers[index];
      const newID: string = `timbre ${index}`;
      await synth.soundfontManager.addNewSoundFont(buf, newID);
    }

    console.log(synth.soundfontManager.soundfontList, "<---");
  };
  useEffect(() => {
    loadSf3();
  }, []);

  return (
    <div className="app">
      <input type="file" accept=".mid, .rmi" onChange={onFileChange} />
      <div className="buttons">
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onReplay}>Replay</button>
        <button onClick={onPlayAt20Seconds}>Start playing from 20 seconds</button>
      </div>
    </div>
  );
};
export default App;
