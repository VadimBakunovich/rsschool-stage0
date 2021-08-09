setInterval(() => {
	const sec = document.getElementById('sec');
	const min = document.getElementById('min');
	const hour = document.getElementById('hour');
	const now = new Date();
	const move = (hand, angle) => hand.setAttribute('transform', `rotate(${angle} 150 150)`);
	move(sec, 6 * now.getSeconds());
	move(min, 6 * now.getMinutes() + now.getSeconds() / 10);
	move(hour, 30 * (now.getHours() % 12) + now.getMinutes() / 2);
}, 500);