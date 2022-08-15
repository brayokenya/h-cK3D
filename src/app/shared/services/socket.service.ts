import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    /**
     * WebSocket service for interacting with Locator API sockets.
     */
    private subject: Subject<MessageEvent>;

    constructor() {
    }

    public connect(): Subject<MessageEvent> {
        this.subject = this.create();
        return this.subject;
    }

    private create(): Subject<MessageEvent> {
        const ws = new WebSocket(environment.WS_HOST);

        const observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            }
        );

        const observer = {
            next: (data: object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };

        return Subject.create(observer, observable);
    }
}
