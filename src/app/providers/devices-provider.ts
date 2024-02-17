import { IGetDevices } from "../models/provider-models";
import { isEmpty } from "lodash";

class DevicesProvider {
  private isRequested: boolean = false;

  async requestDevices() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => track.stop());
  }

  public async getDevices() {
    try {
      if (!this.isRequested) {
        await this.requestDevices();
        this.isRequested = true;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const deviceList = {
        cameras: [],
        microphones: [],
        speakers: [],
      } as IGetDevices;

      if (!isEmpty(devices)) {
        deviceList.cameras = [
          ...devices.filter(
            (device) =>
              device.kind.includes("videoinput") &&
              device.deviceId !== "default"
          ),
        ];
        deviceList.microphones = [
          ...devices.filter(
            (device) =>
              device.kind.includes("audioinput") &&
              device.deviceId !== "default"
          ),
        ];
        deviceList.speakers = [
          ...devices.filter(
            (device) =>
              device.kind.includes("audiooutput") &&
              device.deviceId !== "default"
          ),
        ];
      }

      return deviceList;
    } catch (e: any) {
      return e;
    }
  }
}

export const devicesProvider = new DevicesProvider();
