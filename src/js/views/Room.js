/**
 * Created by steve on 13/10/2016.
 */
import {Device as ViewDevice} from './Device';

const mapStore = new WeakMap();

export class Room {

  constructor(modelRoom) {
    mapStore.set(this, { model: modelRoom });
  }

  get model() {
    return mapStore.get(this).model;
  }

  render() {
    const template_card = document.querySelector('#template_room_card').cloneNode(true);
    const template_listItem = document.querySelector('#template_listItem');
    const elListRoot = template_card.content.querySelector('.deviceList');

    template_card.content.querySelector('.mdl-card__title-text').textContent = this.model.name;

    this.model.devices.forEach(device => {
      const view = new ViewDevice(device);
      const temp_li = template_listItem.cloneNode(true);

      temp_li.content.querySelector('.mdl-list__item-primary-content')
        .appendChild(view.render());

      const clone = document.importNode(temp_li.content, true);
      elListRoot.appendChild(clone);
    });

    return document.importNode(template_card.content, true);
  }
}
