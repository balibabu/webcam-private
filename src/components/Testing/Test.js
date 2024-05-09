import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import ChunkHandler from "./ChunkHandler";


export default function Test() {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [, setRecordedChunks] = React.useState([]);
    const [intervalId, setIntervalId] = React.useState(null);
    const [info, setInfo] = useState('');

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                ChunkHandler(data);
            }
        },
        // eslint-disable-next-line
        [setRecordedChunks]
    );

    const startRecordingInterval = () => {
        setIntervalId(setInterval(() => {
            handleStopCaptureClick();
            handleStartCaptureClick();
        }, 5000));
    };

    const handleStartCaptureClick = () => {
        setCapturing(true);
        webcamRef.current.video.play();
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        startRecordingInterval();
    };

    const handleStopCaptureClick = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            clearInterval(intervalId);
            setIntervalId(null);
            setCapturing(false);
        }
    };


    const videoConstraints = {
        width: 640,
        height: 360,
        facingMode: "user",
        frameRate: 15
    };

    return (
        <div>
            <div>Testing</div>
            <div>{info}</div>
            <Webcam
                width={640}
                height={360}
                audio={false}
                ref={webcamRef}
                videoConstraints={videoConstraints}
            />
            <br />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
        </div>
    );
}
