/**
 * Created by steve on 22/09/2016.
 */
export default class extends Image {
  // Give img default size if users don't specify.
  constructor(width = 50, height = 50) {
    super(width * 10, height * 10);
    this.setAttribute('src', 'https://s2.graphiq.com/sites/default/files/stories/t2/tiny_cat_12573_8950.jpg');
    this.style.paddingLeft = '10px';
  }

  set width(val) {
    this.setAttribute('width', val * 5);
  }
}
