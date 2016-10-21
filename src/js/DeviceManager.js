/**
 * Created by steve on 23/09/2016.
 */
import Room from './models/Room';

const baseUrl = 'https://8r3niqkqtf.execute-api.us-east-1.amazonaws.com/lw';
const cacheKey = 'roomsCache';


function getFetchOptions() {
  const headers = new Headers();

// TODO validate we have an access key and bounce to settings if not
  headers.append('x-api-key', localStorage.getItem('accessKey'));

  return {
    headers,
    mode: 'cors'
  };
}

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
    if (this.rooms) {
      return Promise.resolve(this.rooms);
    }

    this.rooms = localStorage.getItem(cacheKey);

    if (this.rooms) {
      this.rooms = JSON.parse(this.rooms).map(room => new Room(room));
      return Promise.resolve(this.rooms);
    }

    return window.fetch(`${baseUrl}/devices`, getFetchOptions())
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
    return window.fetch(`${baseUrl}/exec`, Object.assign(getFetchOptions(), {
      method: 'post',
      body: JSON.stringify({
        command: command,
        room: room,
        device: device,
        dimLevel: dimLevel
      })
    }));
  }
}
