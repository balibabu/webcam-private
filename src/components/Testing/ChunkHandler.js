import { FFmpeg } from "@ffmpeg/ffmpeg";

export default async function ChunkHandler(chunk) {
    console.log(chunk);
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    // await ffmpeg.writeFile('input.webm', chunk);

    const reader = new FileReader();
    reader.readAsArrayBuffer(chunk);
    await new Promise((resolve) => {
        reader.onload = () => {
            resolve();
        };
    });
    const uint8ArrayChunk = new Uint8Array(reader.result);
    await ffmpeg.writeFile('input.mp4', uint8ArrayChunk);
    // await ffmpeg.exec(['-i', 'input.mp4', 'output.mp4']);

    await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', 'mpdecimate,setpts=N/FRAME_RATE/TB',
        '-map', '0:v',
        'output.mp4'
    ]);

    const data = await ffmpeg.readFile('output.mp4');
    const blob = new Blob([data.buffer], { type: 'video/mp4' });
    upload(blob)
}


function upload(blob) {
    const formData = new FormData();
    formData.append("file", blob, "video.webm");

    fetch("https://babu2.pythonanywhere.com/upload", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('successfully uploaded')
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}