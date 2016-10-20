/**
 * Created by steve on 23/09/2016.
 */
import DeviceManager from '../DeviceManager';

const mapStore = new WeakMap();

export default class Device {
  constructor(objDescription, room) {
    mapStore.set(this, {
      device: objDescription,
      room: room
    });
  }

  deviceOn() {
    return DeviceManager.execCommand('deviceOn', this.roomId, this.id);
  }

  deviceOff() {
    return DeviceManager.execCommand('deviceOff', this.roomId, this.id);
  }

  get id() {
    return mapStore.get(this).device.id;
  }

  get icon() {
    switch (this.type) {
      case 'dimmer':
        return 'lightbulb_outline';
      case 'socket':
        return 'power';
      default:
        return 'cake';
    }
  }

  get name() {
    return mapStore.get(this).device.name;
  }

  get roomId() {
    return mapStore.get(this).room.id;
  }

  get type() {
    return mapStore.get(this).device.type;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type
    };
  }
}
