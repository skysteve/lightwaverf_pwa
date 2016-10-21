/**
 * Created by steve on 21/10/2016.
 */

import { Page as PageRooms } from './views/rooms/Page';

class Handlers {
  constructor(rooms) {
    this.rooms = rooms;
    this.elContent = document.querySelector('.page-content');
  }

  handleUrl() {
    const hash = location.hash.substring(1);

    try {
      this[`route_${hash}`]();
    } catch (ex) {
      console.error(ex);
    }
  }

  route_rooms() {
    const viewRooms = new PageRooms();

    const content = viewRooms.render(this.rooms);

    this.elContent.innerHTML = '';
    this.elContent.appendChild(content)
  }


}



export default function initRouter(rooms) {
  const handlers = new Handlers(rooms);
  window.addEventListener('hashchange', handlers.handleUrl.bind(handlers), false);
  // if we already have a hash, load that page, otherwise load rooms list
  if (location.hash) {
    handlers.handleUrl();
  } else {
    location.hash = 'rooms';
  }

}
