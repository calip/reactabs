import * as Cesium from 'cesium'
import { v4 as uuidv4 } from 'uuid'
import helpers from '../helpers/helpers'

class CesiumEntity {
  tfgFraction: number
  posEmitter: any
  tfgDt: number
  tfgHeading: number
  pointHeading: number
  state: any
  avatar: any
  key: any
  modelUri: string
  pos: any
  ori: any
  private radarCallback: any
  private radarHeightCallback: any
  constructor(entity: any, viewer: Cesium.Viewer) {
    this.tfgFraction = 0.0
    this.posEmitter = undefined
    this.tfgDt = 33
    this.tfgHeading = 0.0
    this.pointHeading = 0.0
    // this.moveTimeModifier = 1
    // this.parent = undefined
    // this.hasScheduleStart = false
    // this.childNumber = 0
    // this.childIndex = -1
    this.state = {
      kind: entity.DISTypeID.Kind,
      domain: entity.DISTypeID.Domain,
      category: entity.DISTypeID.Category,
      latitude: -6.05,
      longitude: 106.1,
      altitude: 0,
      heading: 0,
      pitch: 0,
      roll: 0,
      speed: 0,
      id: 0,
      typeId: entity.callsign,
      state: 1,
      callsign: '',
      title: '',
      flag: 'blue',
      fuel: 100.0,
      burnRate: 0.00002,
      distance: 0.0,
      radarRadius: 70 * 1.852 * 1000,
      radarSwath: (Math.PI * 360) / 180.0,
      displayDistance: 10000000,
      coverRadius: 70 * 1.852 * 1000,
      rotOffset: 0,
      labelPosX: 0, //  10
      labelPosY: 40, // -10
      showCover: false,
      hasRoute: false,
      showTypeId: false,
      showTitle: true,
      showFlag: false,
      showFuel: false,
      showDistance: false,
      showLat: false,
      showLon: false,
      showAlt: false,
      showAilments: false,
      showSpeed: false,
      showRoute: false,
      showRadar: false,
      showRadarScan: false,
      showEntity: true,
      disabled: false,
    }
    helpers.cloneState(entity.state, this.state)
    this.key = uuidv4()
    this.modelUri = ''
    this.modelUri = entity.VisualModel.def
    this.pos = Cesium.Cartesian3.fromDegrees(
      this.state.longitude,
      this.state.latitude,
      this.state.altitude
    )
    this.ori = Cesium.Transforms.headingPitchRollQuaternion(
      this.pos,
      new Cesium.HeadingPitchRoll(Math.PI, 0.0, 0.0)
    )

    this.avatar = new Cesium.Entity({
      id: this.key,
      position: this.pos,
      orientation: new Cesium.CallbackProperty(() => {
        return this.ori.clone()
      }, false),

      label: {
        show: true,
        font: '21px Arial',
        text: this.state.title,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        fillColor: Cesium.Color.WHITE,
        showBackground: true,
        backgroundColor: new Cesium.Color(0.1, 0.1, 0.1, 0.7),
        backgroundPadding: new Cesium.Cartesian2(10, 10),
        pixelOffset: new Cesium.Cartesian2(
          this.state.labelPosX,
          this.state.labelPosY
        ),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          this.state.displayDistance
        ),
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.65, 8.0e6, 1.0),
      },
      model: {
        show: true,
        scale: 0.8,
        uri: this.modelUri,
        minimumPixelSize: 48,
        color: Cesium.Color.DEEPSKYBLUE,
        colorBlendMode: Cesium.ColorBlendMode.REPLACE,
        heightReference:
          this.state.domain !== 2
            ? Cesium.HeightReference.CLAMP_TO_GROUND
            : Cesium.HeightReference.NONE,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          this.state.displayDistance
        ),
      },
    })
    viewer.entities.add(this.avatar)
    // viewer.scene.globe.show = false
  }
  setPosByRad = (lon: number, lat: number, height: number) => {
    this.pos = Cesium.Cartesian3.fromRadians(lon, lat, height)
    this.avatar.position = this.pos
  }
  setPosByDeg = (lon: number, lat: number, height: number) => {
    this.pos = Cesium.Cartesian3.fromDegrees(lon, lat, height)
    this.avatar.position = this.pos
  }
  setOriByHPR = (heading: number, pitch: number, roll: number) => {
    const hpr = new Cesium.HeadingPitchRoll(
      heading - Math.PI / 2 + (this.state.rotOffset * pitch) / 180.0,
      roll,
      -pitch
    )
    this.ori = Cesium.Transforms.headingPitchRollQuaternion(this.pos, hpr)
  }
  setDisplayDistance = (distance: number) => {
    this.state.displayDistance = distance
    this.avatar.model.distanceDisplayCondition =
      new Cesium.DistanceDisplayCondition(0, this.state.displayDistance)
  }
  setLabelPosX = (pos: any) => {
    this.state.labelPosX = pos
    this.avatar.label.pixelOffset = new Cesium.Cartesian2(
      pos,
      this.avatar.label.pixelOffset.y
    )
  }
  setLabelPosY = (pos: any) => {
    this.state.labelPosY = pos
    this.avatar.label.pixelOffset = new Cesium.Cartesian2(
      this.avatar.label.pixelOffset.x,
      pos
    )
  }
  setStateLabels = (en: any) => {
    helpers.cloneState(en, this.state)
    const lon = Number(this.state.longitude)
    const lat = Number(this.state.latitude)
    const alt = Number(this.state.altitude)
    const heading = Number(this.state.heading)
    const pitch = Number(this.state.pitch)
    const roll = Number(this.state.roll)

    this.setPosByDeg(lon, lat, alt)
    this.setOriByHPR(heading, pitch, roll)
    this.setDisplayDistance(this.state.displayDistance)
    this.setLabelPosX(this.state.labelPosX)
    this.setLabelPosY(this.state.labelPosY)
  }
}
export default CesiumEntity
