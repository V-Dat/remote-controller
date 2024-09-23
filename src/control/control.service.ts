import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { SystemAction } from 'src/constants/enum/system.action';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class ControlService {
  async executeAction(action: SystemAction): Promise<{ message: string }> {
    console.log(`Received action: ${action}`);

    switch (action) {
      case SystemAction.Lock:
        return this.lockScreen();
      case SystemAction.Shutdown:
        return this.shutdown();
      case SystemAction.Restart:
        return this.restart();
      case SystemAction.Sleep:
        return this.sleep();
      case SystemAction.Hibernate:
        return this.hibernate();
      default:
        return { message: `Unknown action: ${action}` };
    }
  }

  private async lockScreen(): Promise<{ message: string }> {
    try {
      await execAsync(
        'dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock',
      );
      return { message: 'Screen locked successfully' };
    } catch (error) {
      console.error('Error locking screen:', error);
      return { message: 'Failed to lock screen' };
    }
  }

  private async shutdown(): Promise<{ message: string }> {
    try {
      await execAsync('systemctl poweroff');
      return { message: 'Shutdown initiated' };
    } catch (error) {
      console.error('Error shutting down:', error);
      return { message: error };
    }
  }

  private async restart(): Promise<{ message: string }> {
    try {
      await execAsync(
        'systemctl reboot && (sleep 60 && pm2 startOrRestart ecosystem.config.js --watch)',
      );
      await execAsync('systemctl reboot');
      return { message: 'Restart initiated' };
    } catch (error) {
      console.error('Error restarting:', error);
      return { message: 'Failed to initiate restart' };
    }
  }

  private async sleep(): Promise<{ message: string }> {
    try {
      await execAsync('systemctl suspend');
      return { message: 'Sleep mode activated' };
    } catch (error) {
      console.error('Error activating sleep mode:', error);
      return { message: 'Failed to activate sleep mode' };
    }
  }

  private async hibernate(): Promise<{ message: string }> {
    try {
      await execAsync('systemctl hibernate');
      return { message: 'Hibernation initiated' };
    } catch (error) {
      console.error('Error initiating hibernation:', error);
      return { message: 'Failed to initiate hibernation' };
    }
  }
}
