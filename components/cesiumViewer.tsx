
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from 'cesium'

const position = Cesium.Cartesian3.fromDegrees(106.774124, -6.200000, 500000);

const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const stop = Cesium.JulianDate.addSeconds(
  start,
  360,
  new Cesium.JulianDate()
);

function CesiumViewer() {
  function computeCirclularFlight(lon: number, lat: number, radius: number) {
    const property = new Cesium.SampledPositionProperty();
    for (let i = 0; i <= 360; i += 45) {
      const radians = Cesium.Math.toRadians(i);
      const time = Cesium.JulianDate.addSeconds(
        start,
        i,
        new Cesium.JulianDate()
      );
      const position = Cesium.Cartesian3.fromDegrees(
        lon + radius * 1.5 * Math.cos(radians),
        lat + radius * Math.sin(radians),
        Cesium.Math.nextRandomNumber() * 500 + 1750
      );
      console.log(position)
      property.addSample(time, position);
  
      // //Also create a point for each sample we generate.
      // viewer.entities.add({
      //   position: position,
      //   point: {
      //     pixelSize: 8,
      //     color: Cesium.Color.TRANSPARENT,
      //     outlineColor: Cesium.Color.YELLOW,
      //     outlineWidth: 3,
      //   },
      // });
    }
    return property;
  }
  
  const pos = computeCirclularFlight(106.774124, -6.200000, 0.3);
  return (
    <Viewer full shouldAnimate={true} >
      <Resium.Clock
        startTime={start.clone()}
        stopTime={stop.clone()}
        currentTime={start.clone()}
        clockRange={Cesium.ClockRange.LOOP_STOP}
        multiplier={10}
        
      />
      <Resium.Camera />
      <Resium.CameraFlyTo
                destination={position}
                duration={0}
            />
      {/* <Resium.Entity 
        name="a"
        position={position}
        point={
          {
            pixelSize: 8,
            color: Cesium.Color.TRANSPARENT,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 3
          }
        }
        ></Resium.Entity> */}
      <Resium.Entity
                  name="Airplane"
                  availability={new Cesium.TimeIntervalCollection([
                    new Cesium.TimeInterval({
                      start: start,
                      stop: stop,
                    })
                  ])}
                  point={{ pixelSize: 50, color: Cesium.Color.BLUE }}
                  position={pos}
                  orientation={new Cesium.VelocityOrientationProperty(pos)}
                  path={{resolution: 1, material: new Cesium.PolylineGlowMaterialProperty(
                      {
                        glowPower:0.1,
                        color: Cesium.Color.YELLOW
                      }
                    ), width: 10}
                  }
                  model={{
                    uri:"/models/a318.glb",
                    minimumPixelSize: 64
                  }}
        >
        </Resium.Entity>
      </Viewer>
  )
}

export default CesiumViewer