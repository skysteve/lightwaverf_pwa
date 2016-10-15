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

  onRender(el) {
    // setup on click events
    el.querySelector('.device-on').addEventListener('click', () => {
      this.model.deviceOn();
      this.showToast();
    });

    el.querySelector('.device-off').addEventListener('click', () => {
      this.model.deviceOff();
      this.showToast();
    });
  }

  render() {
    const template_card = document.querySelector('#template_device');
    template_card.content.querySelector('.device-name').textContent = this.model.name;
    template_card.content.querySelector('.material-icons').textContent = this.model.icon;

    return document.importNode(template_card.content, true);
  }

  showToast() {
    const notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar({
      message: 'Command sent'
    });
  }
}
