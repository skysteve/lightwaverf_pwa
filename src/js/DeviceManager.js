/**
 * Created by steve on 23/09/2016.
 */
import Room from './models/Room';

const baseUrl = 'http://ha.skysteve.com:7890';

export default class DeviceManager {

  constructor() {
    const searchParams = new URLSearchParams(location.search);

    const room = searchParams.get('room');
    const device = searchParams.get('device');
    const command = searchParams.get('command');
    const dimLevel = searchParams.get('dimLevel');

    if (!!room && !!device && !!command) {
      DeviceManager.execCommand(command, room, device, dimLevel);
    }
  }

  fetch() {
    const options = {
      mode: 'cors'
    };

    if (this.rooms) {
      return Promise.resolve(this.rooms);
    }

    return window.fetch(`https://4p2rhkkdkb.execute-api.us-east-1.amazonaws.com/lw/devices`, options)
      .then(res => res.json())
      .then((jsonRooms) => {
        this.rooms = jsonRooms.map(room => new Room(room));
        return this.rooms;
      });
  }

  static execCommand(command, room, device, dimLevel) {
    navigator.sendBeacon(`${baseUrl}/command`, JSON.stringify({
      command: command,
      room: room,
      device: device,
      dimLevel: dimLevel
    }));
  }
}
