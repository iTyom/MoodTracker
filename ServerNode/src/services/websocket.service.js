const enigmaService = require('./enigma.service')

module.exports = {
	defineSocket
};


function defineSocket(server) {
	const io = require('socket.io').listen(server);
	io.on('connection', async function (socket) {

		const batch = await enigmaService.getBatch();

		socket.on('user', user => {
			console.log('user : ', user)

		});

		socket.emit('batch', {
			type: 'batch',
			data: batch,
		});
		socket.on('decryptedBatch', decryptedBatch => {
			enigmaService.getDecryptedMessage(decryptedBatch);
		});

	});
}