/**
 * Created by steve on 22/09/2016.
 */
import * as materialDesign from 'material-design-lite';
import DeviceManager from './DeviceManager';
import { RoomList as ViewRoomList } from './views/RoomList';

const deviceManager = new DeviceManager();

deviceManager.fetch()
  .then(rooms => new ViewRoomList(rooms))
  .then(viewRooms => viewRooms.render())
  .then(() => {
    const elLoading = document.querySelector('#loading-msg');
    elLoading.style.display = 'none';

    const elRooms = document.querySelector('#roomList');
    elRooms.removeAttribute('style');
  })
  .catch(ex => console.error(ex, ex.stack));
