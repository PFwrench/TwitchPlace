let handleSuccess = () => {
  let stickersPlaced = document.getElementsByClassName('placed');

  for (let i = 0; i < stickersPlaced.length; i+=1) {
    stickersPlaced[i].classList.add('final');
  }

  stickersPlaced = document.getElementsByClassName('final');

  for (let i = 0; i < stickersPlaced.length; i+=1) {
    stickersPlaced[i].classList.remove('sticker', 'placed', 'draggable--over');
    if (stickersPlaced[i].parentElement.children.length > 5) {
      for (let j = 0; j < stickersPlaced[i].parentElement.children.length - 5; j+=1) {
        stickersPlaced[i].parentElement.removeChild(stickersPlaced[i].parentElement.children[j]);
      }
    }
  }

  let accuData = {};
  accuData.placeState = document.getElementsByClassName('grid')[0].innerHTML;
  sdk.accumulate('placeState', accuData);
};
