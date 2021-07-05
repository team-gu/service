import { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

export default function useSocketSignal({ roomId, setStep }) {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  useEffect(() => {
    socketRef.current = io.connect('https://witherview.herokuapp.com/');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        socketRef.current.emit('join room', roomId);

        socketRef.current.on('all users', (users) => {
          setPeers([]);
          const getPeers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            getPeers.push(peer);
          });
          setPeers(getPeers);
        });

        socketRef.current.on('user joined', (payload) => {
          const item = peersRef.current.find(
            (p) => p.peerID === payload.callerID
          );
          if (!item) {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
            setPeers((users) => [...users, peer]);
          }
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on('refresh', () => {
          setPeers([]);
          setStep(0);
        });

        // TODO: stomp 시그널링과 분리해서 stomp topic에 추가
        socketRef.current.on('clicked', () => {
          setStep((prev) => prev + 1);
        });
      });
  }, []);
  return {
    createPeer,
    addPeer,
    userVideo,
    peersRef,
    socketRef,
    peers,
  };
}
