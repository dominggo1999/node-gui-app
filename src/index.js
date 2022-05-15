import {
  QMainWindow,
  QWidget,
  QPushButton,
  FlexLayout,
  QFileDialog,
  FileMode,
} from '@nodegui/nodegui';

import { spawn } from 'child_process';

const view = new QWidget();
view.setLayout(new FlexLayout());

// Initiate file dialog
const fileDialog = new QFileDialog();
fileDialog.setFileMode(FileMode.AnyFile);
fileDialog.setNameFilter('Videos (*.mp4 *.avi *.mov)');

const selectButton = new QPushButton();
selectButton.setText('Select File');

const convertVideo = (file) => {
  selectButton.setText('Converting...');
  selectButton.setDisabled(true);

  const outputDir = './results';
  const fileName = `output_${new Date()}`;
  const outputFile = `${outputDir}/${fileName}.mp3`;

  // console.log(file, `${outputDir}/${fileName}.mp3`);

  const cmd = process.env.NODE_ENV !== 'production' ? 'bin/ffmpeg' : 'ffmpeg';
  const args = [
    '-i', file,
    `./results/output_${Math.random()}.mp3`,
  ];

  const proc = spawn(cmd, args);

  proc.stdout.on('data', (data) => {
    console.log('Log', data);
  });

  proc.stderr.setEncoding('utf8');
  proc.stderr.on('data', (data) => {
    console.log(data);
  });

  proc.on('close', () => {
    console.log('finished');
    selectButton.setDisabled(false);
    selectButton.setText('Select File');
  });
};

selectButton.addEventListener('clicked', () => {
  fileDialog.exec();
  const selectedFiles = fileDialog.selectedFiles();
  if(selectedFiles.length === 1) {
    // Convert video
    convertVideo(selectedFiles[0]);
  }
});

view.layout.addWidget(selectButton);

const win = new QMainWindow();
win.setWindowTitle('Video to mp3 converter');
win.setCentralWidget(view);
win.show();
