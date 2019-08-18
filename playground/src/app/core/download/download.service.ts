import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {
  constructor(
    @Inject(DOCUMENT) private _document: Document) { }

  buildFileStream(data: string, type: string = 'application/octet-stream' ) {
    return new Blob([data], { type });
  }

  download(data: string, filename: string, type?: string) {
    const blob = this.buildFileStream(data, type);

    // IE 10+
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
      return;
    }

    // other cases
    // in order to show a correct filename and not a blob stream as the file name we need to inject a hidden link
    const link = this._createDownloadLink(blob, filename);

    // then force a click
    this._document.body.appendChild(link);
    link.click();
    this._document.body.removeChild(link);
  }

  private _createDownloadLink(blob: Blob, filename: string) {
    const link = this._document.createElement('a');

    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    return link;
  }
}
