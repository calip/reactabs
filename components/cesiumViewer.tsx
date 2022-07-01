import React, { Component } from "react";
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from 'cesium'
import Entity from "cesium/Source/DataSources/Entity";

class CesiumViewer extends Component {
  public viewer: Cesium.Viewer | undefined;

  public start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
  public stop = Cesium.JulianDate.addSeconds(
    this.start,
    360,
    new Cesium.JulianDate()
  );

  componentDidMount() {
    if (this.viewer) {
      this.viewer.clock.startTime = this.start.clone();
      this.viewer.clock.stopTime = this.stop.clone();
      this.viewer.clock.currentTime = this.start.clone();
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
      this.viewer.clock.multiplier = 10;

      this.viewer.timeline.zoomTo(this.start, this.stop);

      const position = Cesium.Cartesian3.fromDegrees(106.774124, -6.200000, 100);


      //Actually create the entity
      const entity = this.viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        // availability: new Cesium.TimeIntervalCollection([
        //   new Cesium.TimeInterval({
        //     start: this.start,
        //     stop: this.stop,
        //   }),
        // ]),

        //Use our computed positions
        position: position,

        //Automatically compute orientation based on position movement.
        // orientation: new Cesium.VelocityOrientationProperty(position),

        //Load the Cesium plane model to represent the entity
        model: {
          uri:"/models/Cesium_Air.glb",
          minimumPixelSize: 64,
        },

        //Show the path as a pink line sampled in 1 second increments.
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.YELLOW,
          }),
          width: 10,
        },
      });

      this.setDragHandler (this.viewer);
      this.viewer.trackedEntity = undefined;
      this.viewer.zoomTo(
        this.viewer.entities,
        new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
      );
    }
  }


  setDragHandler(viewer: Cesium.Viewer) {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    const fscene = viewer.scene;
    let touchDownPos = new Cesium.Cartesian2();
    let moving = false;
    let en: any = null;

    handler.setInputAction(
      (touchDown: any) => {
        touchDownPos = touchDown.position;
        en = fscene.pick(touchDownPos);
        moving = true;
        if(en) {
          fscene.screenSpaceCameraController.enableInputs = false;
          handler.setInputAction (
              (touchMove: any) => {
                if (en && en.id) {
                  const ray = viewer.camera.getPickRay(touchMove.endPosition);

                  if(ray) {
                    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);

                    if(cartesian) {
                      const ellipsoid = viewer.scene.globe.ellipsoid;
                      const c = ellipsoid.cartesianToCartographic(cartesian);
                      const origin = en.id.position.getValue(viewer.clock.currentTime);

                      const cc = ellipsoid.cartesianToCartographic(origin);
                      en.id.position = new Cesium.CallbackProperty(() => {
                        return Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, cc.height)
                      }, false);
                    }
                  }
                }
              },
              Cesium.ScreenSpaceEventType.MOUSE_MOVE
          );

          handler.setInputAction(
            (touchUp: any) => {
              moving = false;
              en = null;
              fscene.screenSpaceCameraController.enableRotate = true;
            },
            Cesium.ScreenSpaceEventType.LEFT_UP
          )
        }
      },
      Cesium.ScreenSpaceEventType.LEFT_DOWN
    );
  }

  computeCirclularFlight(lon: any, lat: any, radius: any, viewer: any) {
    const property = new Cesium.SampledPositionProperty();
    for (let i = 0; i <= 360; i += 45) {
      const radians = Cesium.Math.toRadians(i);
      const time = Cesium.JulianDate.addSeconds(
        this.start,
        i,
        new Cesium.JulianDate()
      );
      const position = Cesium.Cartesian3.fromDegrees(
        lon + radius * 1.5 * Math.cos(radians),
        lat + radius * Math.sin(radians),
        Cesium.Math.nextRandomNumber() * 500 + 1750
      );
      property.addSample(time, position);
  
      //Also create a point for each sample we generate.
      viewer.entities.add({
        position: position,
        point: {
          pixelSize: 8,
          color: Cesium.Color.TRANSPARENT,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
        },
      });
    }
    return property;
  }

  render() {
    return (
      <Viewer full
        ref={e => {
          this.viewer = e ? e.cesiumElement : undefined;
        }}
        infoBox={true}
        selectionIndicator={false}
        shouldAnimate={true}
      />
    );
  }
};

export default CesiumViewer