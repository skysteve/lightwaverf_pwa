/**
 * Created by steve on 23/09/2016.
 */
const mapStore = new WeakMap();

export default class Device {
  constructor(objDescription) {
    mapStore.set(this, objDescription);
  }

  get devices() {
    return mapStore.get(this).devices;
  }

  get id() {
    return mapStore.get(this).id;
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
    return mapStore.get(this).name;
  }

  get type() {
    return mapStore.get(this).type;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type
    };
  }
}
