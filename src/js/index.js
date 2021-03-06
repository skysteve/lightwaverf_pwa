/**
 * Created by steve on 22/09/2016.
 */
import * as materialDesign from 'material-design-lite'; // eslint-disable-line
import DeviceManager from './DeviceManager';
import initRouter from './router';

const deviceManager = new DeviceManager();

deviceManager.fetch()
  .then(rooms => initRouter(rooms))
  .catch(ex => console.error(ex, ex.stack));


// TODO load settings file
/*
 <input type='file' onchange='openFile(event)'>
 <script>
 var openFile = function(event) {
 var input = event.target;

 var reader = new FileReader();
 reader.onload = function(){
 var arrayBuffer = reader.result;
 var arr = new Uint8Array(arrayBuffer);
 var str = String.fromCharCode.apply(String, arr);
 var json = JSON.parse(str);
 console.log(JSON.stringify(json.aws));
 };
 reader.readAsArrayBuffer(input.files[0]);
 };
 </script>

 */
