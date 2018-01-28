window.onload = () => {
  sdk.loaded().then(() => {
    sdk.getAccumulateData('placeState', Date.now() - 30*60*1000)
      .then((data) => {
        console.log(data);
        if (data.data.length !== 0) {
          document.getElementsByClassName('grid')[0].innerHTML = data.data[data.data.length - 1].data.placeState;
        }

        let purchaseCells = [];

        const drag = new Draggable.Droppable(document.querySelectorAll('.stickers, .cell'), {
          draggable: '.sticker',
          droppable: '.cell'
        });

        // Handles tracking which cell the dragged sticker is currently over
        drag.on('droppable:over', (e) => {
          e.data.dragEvent.data.source.classList.add('placed');
          if (e.data.dragEvent.originalSource.parentElement.classList.contains('stickers')) {
            e.data.dragEvent.data.originalSource.style.display = 'block';
          }

          cell = e.data.droppable;
        });

        // Handles switching of stickers in carousel
        const rotationAmount = 1;
        const stickers = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'brown', 'black'];
        const stickerEls = document.getElementById('stickers').children;
        let ticker = 0;
        let updateStickers = () => {
          for (let i = 0; i < 4; i+=1) {
            if (i + ticker > stickers.length - 1) {
              stickerEls[i].style.background = stickers[(ticker - stickers.length) + i];
            } else {
              stickerEls[i].style.background = stickers[ticker + i];
            }
          }
        }

        // Initial setting of stickers
        for (let i = 0; i < 4; i+=1) {
          stickerEls[i].style.background = stickers[ticker + i];
        }

        document.getElementById('button-left').addEventListener('click', () => {
          ticker -= rotationAmount;
          if (ticker < 0) {
            ticker = stickers.length + ticker;
          }
          updateStickers();
        });
        document.getElementById('button-right').addEventListener('click', () => {
          ticker += rotationAmount;
          if (ticker >= stickers.length) {
            ticker = ticker - stickers.length;
          }
          updateStickers();
        });

        // Handles the expanding of the stickers and shader to highlight clicked stickers
        let final = document.getElementsByClassName('final');
        for (let i = 0; i < final.length; i+=1) {
          final[i].addEventListener('click', (e) => {
            expanderFn(e);
          });
        }

        let pause = false;

        let timer = setInterval(() => {
          if (!pause) {
            sdk.getAccumulateData('placeState', Date.now() - 30*60*1000)
            .then((data) => {
              console.log(data);
              if (data.data.length !== 0) {
                document.getElementsByClassName('grid')[0].innerHTML = data.data[data.data.length - 1].data.placeState;
              }
            })
            .catch(() => {
              console.log('Error fetching/updating stickers after initial load');
            })
          }
        }, 1*10*1000);

        // Handles adding the cell borders when dragging a sticker
        drag.on('drag:start', (e) => {
          e.data.source.classList.add('up');
          if (e.data.originalSource.parentElement.classList.contains('cell')) {
            e.data.mirror.style.display = 'none'
          }

          document.getElementById('title').style['display'] = 'none';
          document.getElementById('complete').style['display'] = 'flex';

          let cells = document.getElementsByClassName('cell');

          Array.prototype.forEach.call(cells, (cell) => {
            cell.classList.add('cell-border');
          });

          console.log('PAUSED');
          pause = true;
        });

         // Handles starting off the purchasing action
        document.getElementById('purchase').addEventListener('click', () => {
          let stickersPlaced = document.getElementsByClassName('placed');
          let purchases = [];
          for (let i = 0; i < stickersPlaced.length; i += 1) {
            purchases.push({
              SKU: stickersPlaced[i].dataset.SKU,
              row: stickersPlaced[i].parentElement.dataset.row,
              col: stickersPlaced[i].parentElement.dataset.col
            });
          }

          let cells = document.getElementsByClassName('cell');
          Array.prototype.forEach.call(cells, (cell) => {
            cell.classList.remove('cell-border');
          });

          handleSuccess();

          document.getElementById('title').style['display'] = 'flex';
          document.getElementById('complete').style['display'] = 'none';

          console.log('WAITING FOR UPDATED GRID');
          pause = false;
        });
      })
      .catch(() => {
        console.log('Something has gone wrong in stickers.js.');
      });
  });
}
