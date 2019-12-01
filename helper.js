/* Helper methods */


export function wave(rippleType, e) {
  var btn = e.currentTarget;
  var wave = btn.getElementsByClassName('wave')[0];
  if (wave) {
    wave.classList.remove('hide');
    var waveRadius = wave.offsetWidth / 2;
    if (e.nativeEvent.touches) {
      var left = e.touches[0].pageX - getOffset(btn).left  - waveRadius;
      var top = e.touches[0].pageY - getOffset(btn).top- waveRadius;
    } else {
      var left = e.nativeEvent.pageX - getOffset(btn).left - waveRadius;
      var top = e.nativeEvent.pageY - getOffset(btn).top - waveRadius;
    }

    btn.classList.add('show-ripples');
    wave.classList.add(rippleType);
    wave.style.top = top + "px";
    wave.style.left = left + "px";
    
    setTimeout(function() {
      btn.classList.remove('show-ripples'); 
      wave.classList.remove(rippleType);
      wave.classList.add('hide');
    }, 500);
  }
  
}

export function waveCircular(rippleType, e) {
  var checkBox = e.currentTarget,
      waveCheckbox = checkBox.getElementsByClassName('wave-circular')[0];
  if (waveCheckbox) {
    waveCheckbox.classList.add(rippleType);
    waveCheckbox.classList.remove('hide');
    setTimeout(function() {
      waveCheckbox.classList.add('hide');
      waveCheckbox.classList.remove(rippleType);
    }, 400);
  } 
}

