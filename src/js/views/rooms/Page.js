/**
 * Created by steve on 21/10/2016.
 */
import { RoomList as ViewRoomList } from './RoomList';

export class Page {

  render(rooms) {
    const viewRooms = new ViewRoomList(rooms);

    const template = document.querySelector('#template_page_rooms');
    const elRoomList = template.content.querySelector('#roomList');

    // TODO should return content instead?
    viewRooms.render(elRoomList);

    return document.importNode(template.content, true);
  }
}
