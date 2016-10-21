/**
 * Created by steve on 21/10/2016.
 */

import { Page as PageRooms } from './views/rooms/Page';
import { Page as PageSettings } from './views/settings/Page';

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

  renderContent(content) {
    this.elContent.innerHTML = '';
    this.elContent.appendChild(content);
  }

  route_rooms() {
    const viewRooms = new PageRooms();

    this.renderContent(viewRooms.render());
    viewRooms.onRender(this.rooms);
  }

  route_settings() {
    const viewSettings = new PageSettings();

    this.renderContent(viewSettings.render());
    viewSettings.onRender();
  }
}

export default function initRouter(rooms) {
  const handlers = new Handlers(rooms);
  window.addEventListener('hashchange', handlers.handleUrl.bind(handlers), false);

  // if we have no access key, load the settings page
  if (!localStorage.getItem('accessKey')) {
    location.hash = 'settings';
    return;
  }

  // if we already have a hash, load that page, otherwise load rooms list
  if (location.hash) {
    handlers.handleUrl();
  } else {
    location.hash = 'rooms';
  }
}
