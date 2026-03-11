import * as Tone from 'tone';

class AudioManager {
    private static instance: AudioManager;
    private synth: Tone.Synth | null = null;
    private drone: Tone.Oscillator | null = null;
    private reverb: Tone.Reverb | null = null;
    private isInitialized: boolean = false;

    private constructor() { }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public async initialize() {
        if (this.isInitialized) return;

        await Tone.start();
        this.reverb = new Tone.Reverb({ decay: 2, wet: 0.2 }).toDestination();
        this.synth = new Tone.Synth().connect(this.reverb);
        this.isInitialized = true;
        console.log('Audio Manager Initialized');
    }

    public playBootBeeps() {
        if (!this.synth) return;
        const now = Tone.now();
        this.synth.triggerAttackRelease("A4", "80n", now);
        this.synth.triggerAttackRelease("A5", "80n", now + 0.12);
        this.synth.triggerAttackRelease("E6", "80n", now + 0.24);
    }

    public playPing() {
        if (!this.synth) return;
        this.synth.triggerAttackRelease("A5", "16n");
    }

    public async playDrone(freq: number = 108, vol: number = -38) {
        if (this.drone) {
            this.drone.stop();
            this.drone.dispose();
        }
        this.drone = new Tone.Oscillator(freq, "sine").toDestination();
        this.drone.volume.value = vol;
        this.drone.start().stop("+4");
    }

    public playSubBass() {
        const sub = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: { type: "sine" }
        }).toDestination();
        sub.triggerAttackRelease("C1", "4n");
    }

    public playChime() {
        if (!this.reverb) return;
        const chime = new Tone.PolySynth(Tone.Synth).connect(this.reverb);
        chime.triggerAttackRelease(["C5", "E5", "G5"], "2n");
    }

    public playSliderTick() {
        const tick = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: { attack: 0.001, decay: 0.01, sustain: 0 }
        }).toDestination();
        tick.triggerAttackRelease("16n");
    }

    public playResolution() {
        if (!this.reverb) return;
        const poly = new Tone.PolySynth(Tone.Synth).connect(this.reverb);
        const now = Tone.now();
        poly.triggerAttackRelease(["A3", "E4", "A4"], "1n", now);
    }

    public setMuted(muted: boolean) {
        Tone.getDestination().mute = muted;
    }
}

export const audioManager = AudioManager.getInstance();
