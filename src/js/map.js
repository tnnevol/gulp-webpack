/* global L */
/* global AMapUI */
import './lib/common';
import '_less/map.less';
/* 这里只是为了监听ejs这个文件 */
import 'raw-loader!@/views/map.ejs';

$(() => {
  page.getCenter();
});

const page = {
  areaId: 100000,
  map: null,

  // 初始化地图
  _initMap  ({ el, center }) {
    const map = L.map(el, {
      center: center,
      zoom: 7,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      touchZoom: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      tap: false,
      keyboard: true
    })
      .on('click', ({ containerPoint, latlng, target }) => {
        console.log('当前点击的位置', latlng);
      });
    const normalMap = L.tileLayer.chinaProvider('TianDiTu.Realm.Map', { // 全球境界线
      maxZoom: 20,
      minZoom: 5,
      zIndex: 10
    });
    const annotion = L.tileLayer.chinaProvider('GaoDe.Normal.Annotion', { // 文字层
      maxZoom: 20,
      minZoom: 5,
      zIndex: 10
    });
    const satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', { // 卫星图
      maxZoom: 20,
      minZoom: 5,
      zIndex: 8
    });
    const group = L.layerGroup([normalMap, satelliteMap, annotion]);
    group.addTo(map);
    return map;
  },

  // 初始化地图的mark点
  _initMarker (center) {},

  /**
 * 获取行政区
 */
  async getDistrictExplorer () {
    let _district = null;
    await new Promise((resolve, reject) => {
      if (!window.AMapUI) {
        reject(new Error('需要引入高德jsapi\nhttps://webapi.amap.com/maps?v=1.4.15&key="key"\nhttps://webapi.amap.com/ui/1.0/main.js'));
      }
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        const districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(this.areaId, (err, areaNode) => {
          if (err) {
            reject(err);
          }
          _district = {
            areaNode,
            districtExplorer
          };

          resolve(_district);
        });
      });
    });
    return _district;
  },

  /**
 * 获取中心点
 */
  async getCenter () {
    const district = await this.getDistrictExplorer();
    const center = district.areaNode._data.geoData.parent.properties.center;
    this.map = this._initMap({
      el: $('#rootMap')[0],
      center: [center[1], center[0]]
    });
    // this.drawPolygon({
    //   districtExplorer: district.districtExplorer,
    //   areaNode: district.areaNode,
    //   map: this.map
    // });
  }

};
