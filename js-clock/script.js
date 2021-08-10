setInterval(() => {
	const now = new Date();
	const move = (hand, angle) => hand.setAttribute('transform', `rotate(${angle} 150 150)`);
  const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].filter((i, idx) => idx === now.getDay());
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'].filter((i, idx) => idx === now.getMonth());
  date.textContent = weekDay + ', ' + now.getDate() + ' ' + month + ' ' + now.getFullYear();
  time.textContent = now.getHours() + ':' + minutes + ':' + seconds;
	move(sec, 6 * now.getSeconds());
	move(min, 6 * now.getMinutes() + now.getSeconds() / 10);
	move(hour, 30 * (now.getHours() % 12) + now.getMinutes() / 2);
}, 1000);