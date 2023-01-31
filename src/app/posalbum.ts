import { SimplifiedAlbum } from 'spotify-types';

export interface PosAlbum {
  pos: { x: number; y: number };
  album: SimplifiedAlbum;
}

export interface AlbumTable {
  [key: string]: PosAlbum;
}
