/**
 * Created by steve on 13/10/2016.
 */
const mapStore = new WeakMap();

export class Device {

  constructor(modelDevice) {
    mapStore.set(this, { model: modelDevice });
  }

  get model() {
    return mapStore.get(this).model;
  }

  render() {
    const template_card = document.querySelector('#template_device');
    template_card.content.querySelector('.device-name').textContent = this.model.name;
    template_card.content.querySelector('.material-icons').textContent = this.model.icon;

    return document.importNode(template_card.content, true);
  }
}
