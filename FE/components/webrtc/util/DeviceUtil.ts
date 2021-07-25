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
      this.micSelected = this.getMicSelected();
    }
    if (this.hasVideoDeviceAvailable()) {
      this.initVideoDevices();
      this.camSelected = this.cameras.find((device) => device.type === CameraType.FRONT);
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
    this.log.d('Camera selected', this.camSelected);
  }

  getCamSelected(): IDevice | undefined {
    if (this.cameras.length === 0) {
      this.log.e('No video devices found!');
      return;
    }

    return this.camSelected || this.cameras[0];
  }

  getMicSelected(): IDevice | undefined {
    if (this.microphones.length === 0) {
      this.log.e('No audio devices found!');
      return;
    }

    return this.micSelected || this.microphones[0];
  }

  needUpdateVideoTrack(newVideoSource: string): boolean {
    return this.getCamSelected()?.device !== newVideoSource;
  }

  needUpdateAudioTrack(newAudioSource: string): boolean {
    return this.getMicSelected()?.device !== newAudioSource;
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

  cameraNeedsMirror(deviceField: string): boolean {
    return this.getCameraByDeviceField(deviceField)?.type === CameraType.FRONT;
  }

  areEmptyLabels(): boolean {
    return !!this.cameras.find((device) => device.label === '') || !!this.microphones.find((device) => device.label === '');
  }

  disableVideoDevices() {
    this.videoDevicesDisabled = true;
  }

  clear() {
    this.devices = [];
    this.cameras = [];
    this.microphones = [];
    this.camSelected = undefined;
    this.micSelected = undefined;
    this.videoDevicesDisabled = false;
  }

  private getCameraByDeviceField(deviceField: string): IDevice | undefined {
    return this.cameras.find((opt: IDevice) => opt.device === deviceField || opt.label === deviceField);
  }

  private getMicrophoneByDeviceField(deviceField: string): IDevice | undefined {
    return this.microphones.find((opt: IDevice) => opt.device === deviceField || opt.label === deviceField);
  }

  private resetDevicesArray() {
    this.cameras = [{ label: 'None', device: '', type: undefined }];
    this.microphones = [{ label: 'None', device: '', type: undefined }];
  }


}
