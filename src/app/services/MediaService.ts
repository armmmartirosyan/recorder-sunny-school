export class MediaService {
    private constraints = {
        audio: true,
        video: {
            width: 1280,
            height: 720
        },
    };

    public async getDevices(): Promise<MediaDeviceInfo[]> {
        return  await navigator.mediaDevices.enumerateDevices();
    }

    public async play(): Promise<MediaStream | undefined> {
        try{
            const video = document.querySelector("video")!;
            const stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
            };

            return stream;
        }catch (e) {
            console.log(e);
        }
    }

    // public updateDeviceList() {
    //     const audioList = document.getElementById("audioList")!;
    //     const videoList = document.getElementById("videoList")!;
    //
    //     navigator.mediaDevices.enumerateDevices().then((devices) => {
    //         audioList.innerHTML = "";
    //         videoList.innerHTML = "";
    //
    //         devices.forEach((device) => {
    //             const elem = document.createElement("li");
    //             const [_kind, type, direction] = device.kind.match(/(\w+)(input|output)/i)!;
    //             console.log({device});
    //             elem.innerHTML = `<strong>${device.label}</strong> (${direction})`;
    //             if (type === "audio") {
    //                 audioList.appendChild(elem);
    //             } else if (type === "video") {
    //                 videoList.appendChild(elem);
    //             }
    //         });
    //     });
    // }
}
