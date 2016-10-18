/**
 * Created by steve on 23/09/2016.
 */
import Room from './models/Room';

const awsDeviceUrl = 'https://8r3niqkqtf.execute-api.us-east-1.amazonaws.com/lw/devices';
const baseUrl = 'http://ha.skysteve.com:7890';
const cacheKey = 'roomsCache';

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
    const headers = new Headers();

    headers.append('x-api-key', 'Bek1RrO1MZ2EoC6HN8OGb8bEJ7YRFZLS9MhPz8ku');

    const options = {
      headers,
      mode: 'cors'
    };

    if (this.rooms) {
      return Promise.resolve(this.rooms);
    }

    this.rooms = localStorage.getItem(cacheKey);

    if (this.rooms) {
      this.rooms = JSON.parse(this.rooms).map(room => new Room(room));
      return Promise.resolve(this.rooms);
    }

    return window.fetch(awsDeviceUrl, options)
      .then(res => res.json())
      .then((jsonRooms) => {
        return jsonRooms.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }

          return a.id < b.id ? -1 : 0;
        });
      })
      .then((jsonRooms) => {
        localStorage.setItem(cacheKey, JSON.stringify(jsonRooms));
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
