/**
 * Created by steve on 23/09/2016.
 */
import Room from './models/Room';

const url = 'http://192.168.1.109:7890/devices';

export default class DeviceManager {

  constructor() {

  }

  fetch() {
    const options = {
      mode: 'cors'
    };

    return window.fetch(url, options)
      .then(res => res.json())
      .then(jsonRooms => jsonRooms.map(room => new Room(room)));
  }
};
