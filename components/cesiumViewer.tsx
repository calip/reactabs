
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from 'cesium'

const position = Cesium.Cartesian3.fromDegrees(106.774124, -6.200000, 100);

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
  
  // //Compute the entity position property.
  const pos = computeCirclularFlight(106.774124, -6.200000, 100);
  console.log(pos)
  return (
    <Viewer full>
      <Resium.Entity
                  name="Airplane"
                  tracked 
                  point={{ pixelSize: 50, color: Cesium.Color.BLUE }}
                  position={position}
        >
          <Resium.ModelGraphics
                      scale={1}
                      uri={"/models/a318.glb"}
                      minimumPixelSize={100}
                      runAnimations
                      show
                      color={Cesium.Color.WHITE}
          />
        </Resium.Entity>
      </Viewer>
  )
}

export default CesiumViewer