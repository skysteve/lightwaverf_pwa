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
      this.model.deviceOn()
        .then(() => this.showToast())
        .catch(err => this.showToast(err));
    });

    el.querySelector('.device-off').addEventListener('click', () => {
      this.model.deviceOff()
        .then(() => this.showToast())
        .catch(err => this.showToast(err));
    });
  }

  render() {
    const template_card = document.querySelector('#template_device');
    template_card.content.querySelector('.device-name').textContent = this.model.name;
    template_card.content.querySelector('.material-icons').textContent = this.model.icon;

    return document.importNode(template_card.content, true);
  }

  showToast(err) {
    const notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar({
      message: err ? err.message : 'Command sent'
    });
  }
}
