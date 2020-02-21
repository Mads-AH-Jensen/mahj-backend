const logger = require('../utils/logger.util');
const wolDevice = require('../controllers/wol-device.controller');

module.exports = (io) => {
    io.on('connection', async socket => {
        socket.on('requestStatus', async data => {
            logger.server(`Received requestStatus event with data: ${ data._id }`);
            socket.emit('statusUpdate', { _id: data._id, isAwake: await wolDevice.status(data._id) });
        });

        socket.on('wakeWolDevice', async data => {
            logger.server(`Received wakeWolDevice event for ${ data._id }`);
            await wolDevice.wake(data._id)
            
            logger.server(`Polling for status changes on ${ data._id }`);
            socket.emit('statusUpdate', { _id: data._id, isAwake: await wolDevice.pollStatus(data._id) });
        });

        io.emit('wolDevices', await wolDevice.list());
    });
};