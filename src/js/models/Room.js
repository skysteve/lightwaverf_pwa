/**
 * Created by steve on 23/09/2016.
 */
import Device from './Device';

let mapStore = new WeakMap();

export default class Room {
  constructor(objDescription) {
    mapStore.set(this, objDescription);
  }

  get id() {
    return mapStore.get(this).id;
  }

  get name() {
    return mapStore.get(this).name;
  }

  get devices() {
    return mapStore.get(this).devices.map(device => new Device(device));
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      devices: this.devices
    }
  }
};
