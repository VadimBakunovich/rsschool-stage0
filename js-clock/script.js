for (let i = 1; i < 61 ; i++) {
	dashes.innerHTML += `<line 
                            x1="150" y1="0" 
                            x2="150" y2="6" 
                            stroke="black" stroke-width="${i % 5 ? 1 : 4}"
                            transform="rotate(${i * 6} 150 150)" />`;
}

setTimeout(function run() {
  const now = new Date();
	const move = (hand, angle) => hand.setAttribute('transform', `rotate(${angle} 150 150)`);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  date.textContent = now.toLocaleDateString('en-US', options);
  time.textContent = now.toLocaleTimeString('en-GB');
	move(sec, 6 * now.getSeconds());
	move(min, 6 * now.getMinutes() + now.getSeconds() / 10);
	move(hour, 30 * (now.getHours() % 12) + now.getMinutes() / 2);
  const ringParam = (elem, time) => {
    time = (time === 0) ? 60 : time;
    const offset = 5 * time / 3;
    elem.setAttribute('stroke-dasharray', `${offset} ${100 - offset}`);
  };
  ringParam(ringMin, now.getMinutes());
  ringParam(ringSec, now.getSeconds());
  let hours = (now.getHours() > 12) ? now.getHours() - 12 : now.getHours();
  hours = (hours % 12) ? hours : 12;
  const hourOffs = 25 * hours / 3;
	ringHour.setAttribute('stroke-dasharray', `${hourOffs} ${100 - hourOffs}`);
  hText.textContent = (now.getHours() < 10) ? '0' + now.getHours() : now.getHours();
  mText.textContent = (now.getMinutes() < 10) ? '0' + now.getMinutes() : now.getMinutes();
  sText.textContent = (now.getSeconds() < 10) ? '0' + now.getSeconds() : now.getSeconds();
  setTimeout(run, 1000);
}, 1000);