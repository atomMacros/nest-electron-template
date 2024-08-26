import { Controller } from '@nestjs/common';
import { IpcHandle } from '@doubleshot/nest-electron';
import { isNoAuth } from '../nest/utils/decorator/jwt.decorator';
import Store from 'electron-store';
import { of } from 'rxjs';
export const store = new Store();

@Controller('session')
export class SessionController {
	constructor() {}

	@IpcHandle('setItem')
	async set(v) {
		console.log('set=========================',v);
		return store.set(v[0], v[1]);
	}

	@IpcHandle('getItem')
	get(key: string) {
		let res = store.get(key);
		console.log('get=========================',key);
		return of(res);
	}

	@IpcHandle('delItem')
	del(key: string) {
		console.log('del=========================',key);
		return store.delete(key);
	}

	@isNoAuth()
	@IpcHandle('clear')
	clear() {
		console.log('clear=========================');
		return store.clear()
	}

	@isNoAuth()
	@IpcHandle('isExist')
	isExist(key: string) {
		console.log('isExist=========================',key);
		return store.has(key)
	}
}
