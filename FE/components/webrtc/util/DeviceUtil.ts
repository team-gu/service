import { OpenVidu, Device } from 'openvidu-browser';
import { IDevice, CameraType } from '../types/device-type';
import { ILogger } from '../types/logger-type';
import { LoggerUtil } from './LoggerUtil';
import { Util } from './Util';

export class DevicesUtil {

  private devices: Device[] = [];
  private cameras: IDevice[] = [];
  private microphones: IDevice[] = [];
  private camSelected: IDevice | undefined;
  private micSelected: IDevice | undefined;
  private log: ILogger;
  private videoDevicesDisabled: boolean = false;

  constructor(private OV: OpenVidu, private loggerSrv: LoggerUtil, private utilSrv: Util) {
    this.log = this.loggerSrv.get('DevicesService');
  }

  async initDevices() {
    await this.initOpenViduDevices();
    this.devices.length > 0 ? this.log.d('Devices found: ', this.devices) : this.log.w('No devices found!');
    this.resetDevicesArray();
    if (this.hasAudioDeviceAvailable()) {
      this.initAudioDevices();
      // const defaultMic = this.microphones.find((device) => device.device === 'default');
      this.micSelected = this.microphones[0];
    }
    if (this.hasVideoDeviceAvailable()) {
      this.initVideoDevices();
      // const defaultCam = this.cameras.find((device) => device.type === CameraType.FRONT);
      this.camSelected = this.cameras[0]
    }
  }
  private async initOpenViduDevices() {
    this.devices = await this.OV.getDevices();
  }

  private initAudioDevices() {
    const audioDevices = this.devices.filter((device) => device.kind === 'audioinput');
    audioDevices.forEach((device: Device) => {
      this.microphones.push({ label: device.label, device: device.deviceId });
    });
  }

  private initVideoDevices() {
    const FIRST_POSITION = 0;
    const videoDevices = this.devices.filter((device) => device.kind === 'videoinput');
    videoDevices.forEach((device: Device, index: number) => {
      const myDevice: IDevice = {
        label: device.label,
        device: device.deviceId,
        type: CameraType.BACK
      };
      if (this.utilSrv.isMobile()) {
        // We assume front video device has 'front' in its label in Mobile devices
        if (myDevice.label.toLowerCase().includes(CameraType.FRONT.toLowerCase())) {
          myDevice.type = CameraType.FRONT;
        }
      } else {
        // We assume first device is web camera in Browser Desktop
        if (index === FIRST_POSITION) {
          myDevice.type = CameraType.FRONT;
        }
      }

      this.cameras.push(myDevice);
    });
  }

  getCamSelected(): IDevice {
    if (this.cameras.length === 0) {
      this.log.e('No video devices found!');
      return { label: '', device: '' };
    }

    return this.camSelected || this.cameras[0];
  }

  getMicSelected(): IDevice {
    if (this.microphones.length === 0) {
      this.log.e('No audio devices found!');
      return { label: '', device: '' };
    }

    return this.micSelected || this.microphones[0];
  }

  getCameras(): IDevice[] {
    return this.cameras;
  }

  getMicrophones(): IDevice[] {
    return this.microphones;
  }

  hasVideoDeviceAvailable(): boolean {
    return !this.videoDevicesDisabled && !!this.devices?.find((device) => device.kind === 'videoinput');
  }

  hasAudioDeviceAvailable(): boolean {
    return !!this.devices?.find((device) => device.kind === 'audioinput');
  }

  private resetDevicesArray() {
    this.cameras = [];
    this.microphones = [];
  }


}
