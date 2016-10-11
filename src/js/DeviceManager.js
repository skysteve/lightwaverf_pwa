/**
 * Created by steve on 23/09/2016.
 */
import Room from './models/Room';

const baseUrl = 'http://192.168.1.109:7890';

export default class DeviceManager {

  constructor() {
    const searchParams = new URLSearchParams(location.search);

    const room = searchParams.get('room');
    const device = searchParams.get('device');
    const command = searchParams.get('command');
    const dimLevel = searchParams.get('dimLevel');

    if (!!room && !!device && !!command) {
      this.execCommand(command, room, device, dimLevel);
    }
  }

  execCommand(command, room, device, dimLevel) {
    navigator.sendBeacon(`${baseUrl}/command`, JSON.stringify({
      command: command,
      room: room,
      device: device,
      dimLevel: dimLevel
    }));
  }

  fetch() {
    const options = {
      mode: 'cors'
    };

    if (this.rooms) {
      return Promise.resolve(this.rooms);
    }

    return window.fetch(`${baseUrl}/devices`, options)
      .then(res => res.json())
      .then((jsonRooms) => {
        this.rooms = jsonRooms.map(room => new Room(room));
        return this.rooms;
      });
  }
}
