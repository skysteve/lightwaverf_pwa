/**
 * Created by steve on 23/09/2016.
 */

let mapStore = new WeakMap();

export default class Device {
  constructor(objDescription) {
    mapStore.set(this, objDescription);
  }

  get id() {
    return mapStore.get(this).id;
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
