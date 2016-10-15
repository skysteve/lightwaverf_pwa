/**
 * Created by steve on 22/09/2016.
 */
// import BiggerImage from '../components/BiggerImage';
import DeviceManager from './DeviceManager';
import { RoomList as ViewRoomList } from './views/RoomList';

const deviceManager = new DeviceManager();

deviceManager.fetch()
  .then(rooms => new ViewRoomList(rooms))
  .then(viewRooms => viewRooms.render())
  .catch(ex => console.error(ex, ex.stack));
