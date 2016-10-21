/**
 * Created by steve on 21/10/2016.
 */
import { RoomList as ViewRoomList } from './RoomList';

export class Page {

  onRender(rooms) {
    // TODO this is a bit backwards but was quick for now
    const elRoomList = document.querySelector('#roomList');
    const viewRooms = new ViewRoomList(rooms);
    viewRooms.render(elRoomList);
  }

  render() {
    const template = document.querySelector('#template_page_rooms');
    return document.importNode(template.content, true);
  }
}
