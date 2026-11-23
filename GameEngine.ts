export interface ThirdPersonCameraConfig {
  distance: number;
  height: number;
  shoulderOffsetX: number;
  smoothness: number;
}

export interface CameraVector3 {
  x: number;
  y: number;
  z: number;
}

export class GameEngine {
  public cameraPos: CameraVector3 = { x: 0, y: 4.5, z: -7 };
  public lookAtPos: CameraVector3 = { x: 0, y: 1.6, z: 0 };
  public yaw = 0;
  public pitch = 0.22;

  public config: ThirdPersonCameraConfig = {
    distance: 6.5,
    height: 3.2,
    shoulderOffsetX: 0.9,
    smoothness: 0.14,
  };

  public updateThirdPersonCamera(
    targetPos: CameraVector3,
    deltaSeconds = 0.016
  ): { cameraPos: CameraVector3; lookAtPos: CameraVector3 } {
    const lerpFactor = 1 - Math.exp(-this.config.smoothness * 60 * deltaSeconds);

    const sinYaw = Math.sin(this.yaw);
    const cosYaw = Math.cos(this.yaw);

    // Right vector for slight over-the-shoulder offset
    const rightX = cosYaw * this.config.shoulderOffsetX;
    const rightZ = -sinYaw * this.config.shoulderOffsetX;

    const desiredX =
      targetPos.x - sinYaw * this.config.distance + rightX;
    const desiredY =
      targetPos.y + this.config.height + Math.sin(this.pitch) * 2.0;
    const desiredZ =
      targetPos.z - cosYaw * this.config.distance + rightZ;

    this.cameraPos.x += (desiredX - this.cameraPos.x) * lerpFactor;
    this.cameraPos.y += (desiredY - this.cameraPos.y) * lerpFactor;
    this.cameraPos.z += (desiredZ - this.cameraPos.z) * lerpFactor;

    const desiredLookX = targetPos.x + sinYaw * 2.5 + rightX * 0.5;
    const desiredLookY = targetPos.y + 1.5;
    const desiredLookZ = targetPos.z + cosYaw * 2.5 + rightZ * 0.5;

    this.lookAtPos.x += (desiredLookX - this.lookAtPos.x) * lerpFactor;
    this.lookAtPos.y += (desiredLookY - this.lookAtPos.y) * lerpFactor;
    this.lookAtPos.z += (desiredLookZ - this.lookAtPos.z) * lerpFactor;

    return {
      cameraPos: { ...this.cameraPos },
      lookAtPos: { ...this.lookAtPos },
    };
  }

  public rotateCamera(deltaYaw: number, deltaPitch: number): void {
    this.yaw += deltaYaw;
    this.pitch = Math.max(-0.35, Math.min(0.85, this.pitch + deltaPitch));
  }
}

export default GameEngine;
