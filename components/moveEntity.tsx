import * as Cesium from 'cesium'
import helpers from '../helpers/helpers'

class MoveEntity {
  viewer: Cesium.Viewer
  scene: Cesium.Scene
  screenHandler: Cesium.ScreenSpaceEventHandler
  entityKeys: any
  callsigns: any
  entities: any
  selectedCallsigns: any
  constructor(
    viewer: Cesium.Viewer,
    entityKeys: any,
    callsigns: any,
    entities: any
  ) {
    this.viewer = viewer
    this.scene = viewer.scene
    this.screenHandler = viewer.screenSpaceEventHandler
    this.entityKeys = entityKeys
    this.callsigns = callsigns
    this.entities = entities
    this.selectedCallsigns = []
  }
  setContextMenuHandler = () => {
    const centerCarto = new Cesium.Cartographic(0, 0, 0)
    const infoBoxer = this.screenHandler.getInputAction(
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    )
    const infoBoxerMod = (touchDown: any) => {
      const picked = this.scene.pick(touchDown.position)
      if (!Cesium.defined(picked)) {
        if (this.selectedCallsigns.length > 0) {
          const cartesian = this.viewer.camera.pickEllipsoid(touchDown.position)
          if (cartesian) {
            const tgtCarto = Cesium.Cartographic.fromCartesian(cartesian)
            this.getEntitiesCartoCenter(this.selectedCallsigns, centerCarto)
            this.selectedCallsigns.forEach((e: any) => {
              const tfgEn = this.getEntityByCallsign(e)
              const tfgEnCarto = Cesium.Cartographic.fromCartesian(tfgEn.pos)
              const relCarto = helpers.cartoDelta(tfgEnCarto, centerCarto)
              const tgtRelCarto = helpers.cartoAdd(tgtCarto, relCarto)
              tfgEn.moveTimeModifier = 1
              tfgEn.tfgMoveTo(tgtRelCarto)
            })
          }
        }

        infoBoxer(touchDown)
        return
      }

      const enId = picked.id.id
      if (enId && this.entityKeys.indexOf(enId) >= 0) {
        const en = this.getEntityByKey(enId)
        this.selectTfgEntity(en.state.callsign)
        return
      }

      infoBoxer(touchDown)
    }

    this.screenHandler.setInputAction(
      infoBoxerMod,
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
  }
  getEntityByKey = (key: any) => {
    const index = this.entityKeys.indexOf(key)
    return this.entities[index]
  }
  selectTfgEntity = (callsign: string) => {
    const enIndex = this.callsigns.indexOf(callsign)
    const selIndex = this.selectedCallsigns.indexOf(callsign)
    if (enIndex < 0 || !callsign) return
    if (selIndex < 0) {
      if (
        this.entities[enIndex].state.flag === 'blue' ||
        this.entities[enIndex].state.flag === 'biru'
      ) {
        this.entities[enIndex].avatar.model.color = Cesium.Color.SLATEBLUE
      } else if (
        this.entities[enIndex].state.flag === 'red' ||
        this.entities[enIndex].state.flag === 'merah'
      ) {
        this.entities[enIndex].avatar.model.color = Cesium.Color.INDIANRED
      }
      this.entities[enIndex].avatar.label.fillColor = Cesium.Color.YELLOW

      this.selectedCallsigns.push(callsign)
    } else {
      if (
        this.entities[enIndex].state.flag === 'blue' ||
        this.entities[enIndex].state.flag === 'biru'
      ) {
        this.entities[enIndex].avatar.model.color = Cesium.Color.DEEPSKYBLUE
      } else if (
        this.entities[enIndex].state.flag === 'red' ||
        this.entities[enIndex].state.flag === 'merah'
      ) {
        this.entities[enIndex].avatar.model.color = Cesium.Color.RED
      }
      this.entities[enIndex].avatar.label.fillColor = Cesium.Color.WHITE

      this.selectedCallsigns.splice(selIndex, 1)
    }
  }
  getEntityByCallsign = (callsign: string) => {
    return this.entities.find((e: any) => {
      return e.state.callsign === callsign
    })
  }
  getEntitiesCartoCenter = (callsignArray: any, cartoCenterOut: any) => {
    if (!callsignArray.length || callsignArray.length === 0) {
      // console.log('GEOCHELON GIGAS')
      return
    }
    const cartoArray: any = []
    callsignArray.forEach((e: any) => {
      const enti = this.getEntityByCallsign(e)
      cartoArray.push(Cesium.Cartographic.fromCartesian(enti.pos))
    })
    const arrayLength = cartoArray.length
    let latNum = 0.0
    let lonNum = 0.0
    let heiNum = 0.0

    cartoArray.forEach((c: any) => {
      latNum += c.latitude
      lonNum += c.longitude
      heiNum += c.height
    })
    latNum /= arrayLength
    lonNum /= arrayLength
    heiNum /= arrayLength
    cartoCenterOut.longitude = lonNum
    cartoCenterOut.latitude = latNum
    cartoCenterOut.height = heiNum
  }
}

export default MoveEntity
