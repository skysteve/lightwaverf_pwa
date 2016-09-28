/**
 * Created by steve on 22/09/2016.
 */
//import BiggerImage from '../components/BiggerImage';
import DeviceManager from './DeviceManager';

/*if (!window.customElements) {
  alert('Upgrade your browser to view this page');
  throw new Error('Upgrade your browser to view this page');
}*/

const deviceManager = new DeviceManager();
deviceManager.fetch()
  .then(devices => document.write(JSON.stringify(devices, null, 4)))
  .catch(ex => console.error(ex));

/*
customElements.define('bigger-img', BiggerImage, {extends: 'img'});


const image = new BiggerImage(15, 20); // pass ctor values like so.
document.body.appendChild(image);

const image2 = new BiggerImage(15, 20); // pass ctor values like so.
image.width = 15;
document.body.appendChild(image2);*/

