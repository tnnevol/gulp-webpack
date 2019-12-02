/* global L */

L.TileLayer.ChinaProvider = L.TileLayer.extend({
  initialize: function (type, options) {
    var providers = L.TileLayer.ChinaProvider.providers;
    var parts = type.split('.');
    var providerName = parts[0];
    var mapName = parts[1];
    var mapType = parts[2];
    var url = providers[providerName][mapName][mapType];
    options.subdomains = providers[providerName].Subdomains;
    L.TileLayer.prototype.initialize.call(this, url, options);
  }
});
/**
 * 注：天地图例如 https://t{s}.tianditu.gov.cn/vec_w/wmts 那他的layer=vec
 * @type {{GaoDe: {Satellite: {Annotion: string, Map: string}, Normal: {Map: string}, Subdomains: string[]}, Google: {Satellite: {Map: string}, Normal: {Map: string}, Subdomains: Array}, Geoq: {Normal: {Gray: string, Cold: string, Color: string, Warm: string, Map: string, PurplishBlue: string}, Subdomains: Array}, TianDiTu: {Terrain: {Annotion: string, Map: string}, Satellite: {Annotion: string, Map: string}, Normal: {Annotion: string, Map: string}, Realm: {Annotion: string, Map: string}, Subdomains: string[]}}}
 */
L.TileLayer.ChinaProvider.providers = {
  TianDiTu: {
    Normal: {
      Map: 'https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093',
      Annotion: 'https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093'
    },
    Satellite: {
      Map: 'https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093',
      Annotion: 'https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093'
    },
    Terrain: {
      Map: 'https://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093',
      Annotion: 'https://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093'
    },
    Realm: {
      Map: 'https://t{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093',
      Annotion: 'https://t{s}.tianditu.gov.cn/ibo_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e9969c67119dafda8410953696547093'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  GaoDe: {
    Normal: {
      Map: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      Annotion: 'https://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x={x}&y={y}&z={z}&ltype=4'// 修改ltype可得到不同地图，取值0~7.
    },
    Satellite: {
      Map: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Annotion: 'https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    Subdomains: ['1', '2', '3', '4']
  },
  Google: {
    Normal: {
      Map: 'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Subdomains: []
  },
  Geoq: {
    Normal: {
      Map: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      Color: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}',
      PurplishBlue: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      Gray: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      Warm: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
      Cold: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}'
    },
    Subdomains: []
  }
};
L.tileLayer.chinaProvider = function (type, options) {
  return new L.TileLayer.ChinaProvider(type, options);
};
