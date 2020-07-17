import * as Pizzicato from 'pizzicato';

export class Sound {
  private _sound: Pizzicato.Sound;
  private _frequency: number;

  constructor() {
    // TODO: default frequenzo
    this._frequency = 440;

    this._sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        volume: 0.25,
        frequency: this._frequency,
      },
    });
  }

  public destroy(): void {
    this._sound.stop();
    delete this._sound;
  }

  public play(): void {
    this._sound.play();
  }

  public stop(): void {
    this._sound.pause();
  }

  public setFrequency(frequency: number): void {
    // TODO: check
    this._sound.frequency = frequency;
  }
}
