const entityData = {
  sceneHeader: '',
  // -- navigator
  vktfgShow: false,
  vkclockShow: false,
  dDayReference: '',
  // maptoolsShow: false,
  // buttonToggleMaptools: '>>',
  // -- persistence
  fileNames: [],
  allFileNames: [],
  selectedFileName: '',
  activeFileName: '',
  vknotification: 'kosong',
  eraseTargetName: '',
  entypeSelections: [],
  // -- forces - member parameter
  initialFuelSet: '',
  // -- tamg
  activeTamgFile: '',
  selectedActionName: '',
  selectedActionIndex: -1,
  tamgInclusions: [],
  showTamgEditComponent: false,
  // -- tfg
  selectedEnCallsign: '',
  createdEtNames: [],
  // -- landmark
  activeLandmarkFile: '',
  landmarkInclusions: [],
  // currentLandmarkEditComponent: '',
  showLandmarkEditComponent: false,
  // -- state display
  contextEntityCallsign: '',
  contextEntityTitle: '',
  contextEntityFlag: '',
  callsign: '',
  typeId: '',
  radarRadius: 70,
  radarSwath: 360,
  coverRadius: 70,
  latitude: 0,
  longitude: 12,
  altitude: 0,
  speed: 0,
  fuel: 100,
  traveld: 0.0,
  fuelBurnRate: '0.0002',
  transformLat: 0,
  transformLon: 0,
  transformAlt: 0,
  transformHeading: 0,
  transformPitch: 0,
  transformRoll: 0,
  displayDistance: 10000000,
  labelPosX: 10,
  labelPosY: -10,
  showTitle: true,
  showTypeId: false,
  showFuel: false,
  showDistance: false,
  showLat: false,
  showLon: false,
  showAlt: false,
  showSpeed: false,
  showRoute: false,
  showRadar: false,
  showRadarScan: false,
  showCover: false,
  showEntity: true,
  // -- clock
  accValueChecks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  appkey: '',
  timeArrow: 1.0,
  isTimeframedMode: false,
  playSym: '&#9656;',
  playRevSym: '&plusmn;',
  playFastSym: '&plusmn;',
  timeArrowSym: '&plusmn;',
  tamgDayPrefix: '',
  currentTimeDayNum: 0,
  currentTimeYear: '201A',
  currentTimeMonth: 6,
  currentTimeDate: 1,
  currentTimeHour: 0,
  currentTimeMinute: 0,
  currentTimeSecond: 0,
  currentTime: '',
  acceleration: 1.0,
  isPlaying: false,
}

export default entityData
