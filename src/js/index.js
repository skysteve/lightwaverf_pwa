/**
 * Created by steve on 22/09/2016.
 */
// import BiggerImage from '../components/BiggerImage';
import DeviceManager from './DeviceManager';
import {RoomList as ViewRoomList} from './views/RoomList';

const deviceManager = new DeviceManager();

deviceManager.fetch()
  .then(rooms => new ViewRoomList(rooms))
  .then(viewRooms => viewRooms.render())
  .catch(ex => console.error(ex));

//
// const elContent = document.querySelector('#test');
//
// const template_card = document.querySelector('#template_card');
// const template_listItem = document.querySelector('#template_listItem');
//
// template_card.content.querySelector('.mdl-card__title-text').textContent = 'Living Room';
//
// const clone = document.importNode(template_card.content, true);
// template_listItem.content.querySelector('mdl-list__item-primary-content').appendChild(clone);
// elContent.appendChild(clone);

/* eslint-disable */

/**********************  TODO - Some UI  *************************/



/*if (!window.customElements) {
 alert('Upgrade your browser to view this page');
 throw new Error('Upgrade your browser to view this page');
 }*/


/*
customElements.define('bigger-img', BiggerImage, {extends: 'img'});


const image = new BiggerImage(15, 20); // pass ctor values like so.
document.body.appendChild(image);

const image2 = new BiggerImage(15, 20); // pass ctor values like so.
image.width = 15;
document.body.appendChild(image2);*/

