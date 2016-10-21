/**
 * Created by steve on 21/10/2016.
 */
export class Page {

  openFile(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = new Uint8Array(reader.result);
      const content = String.fromCharCode.apply(String, arrayBuffer); // eslint-disable-line prefer-spread
      const json = JSON.parse(content);

      if (json.accessKey) {
        localStorage.setItem('accessKey', json.accessKey);
      }
    };

    reader.readAsArrayBuffer(input.files[0]);
  }

  onRender() {
    document.querySelector('#fileLoader').addEventListener('change', this.openFile.bind(this));
  }

  render() {
    const template = document.querySelector('#template_page_settings');
    return document.importNode(template.content, true);
  }
}
