import * as Cesium from 'cesium'
import CesiumEntity from './cesiumEntity'

class CesiumDrag {
  entity: CesiumEntity
  fscene: Cesium.Scene
  screen: Cesium.ScreenSpaceEventHandler
  touchDownPos: Cesium.Cartesian2
  entityScreenPos: Cesium.Cartesian2
  touchDeltaMovePos: Cesium.Cartesian2
  touchTargetMovePos: Cesium.Cartesian2
  posEmitter: any
  en: any
  heading: number
  prevPos: any
  prevCartoPos: any
  pointHeading: number
  twopi: number
  pi: number
  constructor(entity: CesiumEntity, viewer: Cesium.Viewer) {
    this.entity = entity
    this.fscene = viewer.scene
    this.screen = new Cesium.ScreenSpaceEventHandler(this.fscene.canvas)
    this.touchDownPos = new Cesium.Cartesian2()
    this.entityScreenPos = new Cesium.Cartesian2()
    this.touchDeltaMovePos = new Cesium.Cartesian2()
    this.touchTargetMovePos = new Cesium.Cartesian2()

    this.posEmitter = undefined
    this.en = entity
    this.heading = 0.0
    this.prevPos = entity.pos.clone()
    this.prevCartoPos = Cesium.Cartographic.fromCartesian(this.prevPos)
    this.pointHeading = 0.0
    this.twopi = Math.PI * 2.0
    this.pi = Math.PI

    this.screen.setInputAction((touchDown: any) => {
      this.touchDownPos = touchDown.position
      const picked = this.fscene.pick(this.touchDownPos)
      if (
        Cesium.defined(picked) &&
        !(picked.id === undefined) &&
        picked.id.id === this.en.key
      ) {
        this.fscene.screenSpaceCameraController.enableInputs = false
        this.entityScreenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          this.fscene,
          this.en.pos
        )

        this.screen.setInputAction((touchMove: any) => {
          Cesium.Cartesian2.subtract(
            touchMove.endPosition,
            this.touchDownPos,
            this.touchDeltaMovePos
          )
          Cesium.Cartesian2.add(
            this.entityScreenPos,
            this.touchDeltaMovePos,
            this.touchTargetMovePos
          )
          const cartesian = viewer.camera.pickEllipsoid(this.touchTargetMovePos)
          if (cartesian === undefined) {
            this.screen.removeInputAction(
              Cesium.ScreenSpaceEventType.MOUSE_MOVE
            )
            return
          }
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          this.en.setPosByRad(cartographic.longitude, cartographic.latitude, 1)
          this.heading = Math.atan2(
            cartographic.latitude - this.prevCartoPos.latitude,
            cartographic.longitude - this.prevCartoPos.longitude
          )
          if (this.heading < 0) this.heading += this.twopi
          let deltaRot = this.twopi - this.heading - this.pointHeading
          if (deltaRot > this.pi) deltaRot = -(this.twopi - deltaRot)
          if (deltaRot < -this.pi) deltaRot = this.twopi + deltaRot
          this.pointHeading += deltaRot / 8.0
          this.en.setOriByHPR(this.pointHeading, 0.0, 0.0)
          if (this.pointHeading > this.twopi) this.pointHeading -= this.twopi
          if (this.pointHeading < 0) this.pointHeading += this.twopi
          // this.en.avatar.update()

          this.prevPos = cartesian.clone()
          this.prevCartoPos = Cesium.Cartographic.fromCartesian(this.prevPos)
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

        this.screen.setInputAction((touchUp: any) => {
          this.fscene.screenSpaceCameraController.enableInputs = true
          this.screen.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
          const cr = Cesium.Cartographic.fromCartesian(this.en.pos)
          this.en.state.longitude = (cr.longitude * 180) / Math.PI
          this.en.state.latitude = (cr.latitude * 180) / Math.PI
          this.en.state.altitude = cr.height
          this.en.state.heading = this.heading

          this.screen.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
        }, Cesium.ScreenSpaceEventType.LEFT_UP)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
  }
}

export default CesiumDrag
