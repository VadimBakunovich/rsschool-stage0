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
  setTimeout(run, 1000);
}, 1000);