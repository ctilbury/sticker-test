gsap.registerPlugin(Draggable);

let p = new Peel('#original-sticker', {
  corner: Peel.Corners.TOP_LEFT,
  topShadow: false,
  bottomShadow: false
});

p.handlePress(function(evt) {
  p.setPeelPath(0, 0, 400, 470);
  p.t = 0;
  gsap.to(p, {
    t: 1,
    delay: 0.1,
    duration: 1,
    ease: "power2.inOut",
    onUpdate: () => {
      p.setTimeAlongPath(p.t);
    },
    onComplete: () => {
      swapToDraggable();
    }
  });
});

swapToDraggable = () => {
  document.querySelector('#draggable-sticker').classList.remove('hidden');
  document.querySelector('#original-sticker').classList.add('peeled');
  document.querySelector('#original-sticker .peel-back').style.clipPath = 'none';
  setUpDrag();
}

setUpDrag = () => {
  let rotationDrag = Draggable.create('#draggable-sticker', {
    type: 'rotation',
    onPress: setDraggable,
  });
  
  let translateDrag = Draggable.create('#draggable-sticker', {
    type: 'x, y',
    onPress: setDraggable,
  });
  
  // Draggable.create() returns an array of Draggables, here we have one Draggable per array, so:
  rotationDrag = rotationDrag[0]
  translateDrag = translateDrag[0]

  rotationDrag.disable();
  
  function setDraggable(e) {
    let isRotation = this.vars.type === 'rotation';
    let isCorner = e.target.className === 'draggable-corner';
  
    if (isCorner) {
      if (!isRotation) {
        translateDrag.disable();
        rotationDrag.enable().startDrag(e);
      }
    } else if (isRotation) {
      rotationDrag.disable();
      translateDrag.enable().startDrag(e);
    }
  }
}