// let video;
// let eyePositions;
// let faceapi;

// function setup() {
//   createCanvas(640, 480);
//   video = createCapture(VIDEO);
//   video.hide();
//   faceapi = ml5.faceApi(video, { maxFaces: 1, detectionType: 'single' }, modelLoaded);
// }

// function modelLoaded() {
//   console.log('Modèle de détection des yeux chargé');
//   faceapi.detect(gotResult);
// }

// function draw() {
//   image(video, 0, 0);
//   if (eyePositions) {
//     noFill();
//     stroke(255, 0, 0);
//     strokeWeight(2);
//     rect(eyePositions.leftEye[0] * 2, eyePositions.leftEye[1] * 2, eyePositions.leftEye[2] * 2, eyePositions.leftEye[3] * 2);
//     rect(eyePositions.rightEye[0] * 2, eyePositions.rightEye[1] * 2, eyePositions.rightEye[2] * 2, eyePositions.rightEye[3] * 2);
//   }
// }

// function gotResult(err, result) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   if (result && result[0].parts.leftEye && result[0].parts.rightEye) {
//     const leftEye = result[0].parts.leftEye[0];
//     const rightEye = result[0].parts.rightEye[0];
//     eyePositions = {
//       leftEye: [leftEye.x, leftEye.y, leftEye.width, leftEye.height],
//       rightEye: [rightEye.x, rightEye.y, rightEye.width, rightEye.height],
//     };
//   }
//   faceapi.detect(gotResult);
// }

let video;
let poseNet;
let pose;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);
  if (pose) {
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, 64);
  }
}