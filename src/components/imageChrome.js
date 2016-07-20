import {Image} from 'react-native'

function resolveAssetSource(source) {
  return ((typeof source === 'object') ? source.uri : source) || null
}

// createObjectURL = function(blob) {
//   var objURL = URL.createObjectURL(blob);
//   this.objectURLs = this.objectURLs || [];
//   this.objectURLs.push(objURL);
//   return objURL;
// };
//
// if (this.objectURLs) {
//   this.objectURLs.forEach(function(objURL) {
//     URL.revokeObjectURL(objURL);
//   });
//   this.objectURLs = null;
// }

class ImageChrome extends Image {
  _doLoadImage(imageUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl);
    xhr.responseType = 'blob';
    xhr.onerror = this._onError
    xhr.onload = () => {
      this.image.src = URL.createObjectURL(xhr.response);
      this.props.source.uri = this.image.src;
      this._onLoad();
    };
    xhr.send();
  }

  _destroyBlob() {
    if (this.image) {
      URL.revokeObjectURL(this.image.src);
    }
  }

  _createImageLoader() {
    const uri = resolveAssetSource(this.props.source)

    this._destroyBlob();
    this._destroyImageLoader()
    this.image = new window.Image()
    this._doLoadImage(uri)
    this._onLoadStart()
  }

  componentWillUnmount() {
    this._destroyBlob();
    this._destroyImageLoader();
  }


}

export default ImageChrome;
