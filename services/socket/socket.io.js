module.exports = function (io, socket) {
    console.log("có kết nối",socket.id);
    socket.on('noti-admin',(data) =>{
        console.log("data: ", data);
        io.sockets.emit("new-noti-from-user");
    })
}