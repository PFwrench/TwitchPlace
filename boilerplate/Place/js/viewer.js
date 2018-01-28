/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/*

  Set Javascript specific to the extension viewer view in this file.

*/


const rows = 32;
const cols = 24;
const width = 316;
const height = 380;

let createCells = (rows, cols, width, height) => {

  console.log("CREATING CELLS");

  let row = 0;
  let cell = 0;
  let grid = document.getElementsByClassName('grid');

  for (let i = 0; i < rows; i += 1) {
    row = document.createElement('div');
    row.classList.add('row');
    row.style.height = height/rows;

    for (let j = 0; j < cols; j += 1) {
      cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.width = width / cols;
      cell.dataset.row = i;
      cell.dataset.col = j;

      row.appendChild(cell);
    }

    grid[0].appendChild(row);
  }
};

createCells(rows, cols, width, height);

Muxy.setup({
  clientID: '58sk0dqqicz11sxaqkpo87o288ekzz'
});

const sdk = Muxy.SDK();
const tc = Muxy.TwitchClient();
