/**
 * Created by steve on 13/10/2016.
 */
import { Room as ViewRoom } from './Room';

export class RoomList {

  constructor(rooms) {
    this.rooms = rooms;
  }

  render() {
    const elListRoot = document.querySelector('#roomList');
    const template_listItem = document.querySelector('#template_listItem');

    this.rooms.forEach((room) => {
      const view = new ViewRoom(room);
      const temp_li = template_listItem.cloneNode(true);

      temp_li.content.querySelector('.mdl-list__item-primary-content')
        .appendChild(view.render());

      const clone = document.importNode(temp_li.content, true);
      elListRoot.appendChild(clone);
    });
  }
}
