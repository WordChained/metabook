import io from 'socket.io-client'


const baseUrl = (process.env.NODE_ENV === 'production') ? '//free-chat-1.herokuapp.com' : '//localhost:3030'
export const socketService = createSocketService()


socketService.setup()
function createSocketService() {
    let socket = null;
    const socketService = {
        async setup() {
            socket = io(baseUrl, { withCredentials: true });
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        once(eventName, data) {
            socket.once(eventName, data)
        },
        // broadcast() {
        //     socket.broadcast(eventName, data)
        // },
        terminate() {
            socket = null
        }
    }
    return socketService
}


// function createDummySocketService() {
//   var listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       2
//       this.setup()
//     },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       if (!listenersMap[eventName]) return
//       listenersMap[eventName].forEach(listener => {
//         listener(data)
//       })
//     },
//     debugMsg() {
//       this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
//     },
//   }
//   return socketService
// }


// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)