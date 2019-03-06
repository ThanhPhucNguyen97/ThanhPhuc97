// const socket = io('http://localhost');
// socket.on('DANH_SACH_ONLINE',arrUerInfo => {
//  console.log(arrUerInfo);
// });
function openStream()
{
	const config = {audio: false, video: true };
	return navigator.mediaDevices.getUserMedia(config);
}
function playStream(idVideoTag,stream)
{
	const video = document.getElementById(idVideoTag);
	video.srcObject = stream;
	video.play();
}

// openStream()
// .then(stream => playStream('localStream',stream));
const peer = new Peer({ key: 'peerjs'});
peer.on('open', id => {
	$('#my-peer').append(id)
	$('#btnSignup').click(() => {
	const username = $('txtUsername').val();
	socket.emit('NGUOI_DUNG_DANG_KY',{ten: username, peerId: id});
});
});

// Called
$('#btnCall').click(() => {
    const id = $('#remoteId').val();
    openStream()
    .then(stream => {
        playStream('localStream', stream);
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});
//Calle
peer.on('call', call => {
    openStream()
    .then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});
