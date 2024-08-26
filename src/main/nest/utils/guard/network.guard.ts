import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import Store from 'electron-store';

export const store = new Store();


@Injectable()
export class NetworkGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request = context.switchToHttp().getRequest();
    request['net'] = 1
    return true;
  }
}
