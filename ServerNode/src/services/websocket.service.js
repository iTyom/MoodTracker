module.exports = {
	defineSocket
};


function defineSocket(server) {
	const io = require('socket.io').listen(server);
	io.on('connection', async function (socket) {

		socket.on('user', user => {
			console.log('user : ', user)
		});

		socket.on('new-message', (message) => {
			console.log("defineSocket -> message", message);
			io.emit(message);
		});


		// socket.emit('exemple', {
		// 	type: 'exemple',
		// 	data: data,
		// });
		// socket.on('exemple', exemple => {
		// 	postService.exemple(exemple);
		// });

	});
}