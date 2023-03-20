let video;
let poseNet;
let pose;
let showCircle = true; // variable pour savoir si le cercle doit être affiché ou pas

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  // création de la checkbox
  createCheckbox('Clown MODE', true).changed(toggleCircle);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function toggleCircle() {
  showCircle = !showCircle; // inverse la valeur de la variable showCircle
}

function draw() {
  image(video, 0, 0);
  if (pose && showCircle) { // affiche le cercle uniquement si la checkbox est cochée
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, 64);
  }
}