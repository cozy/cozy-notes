import { EventEmitter } from 'events';
import { Step } from 'prosemirror-transform';

import { Transaction, EditorState } from 'prosemirror-state';

const participants = {
  rick: {
    sid: 'rick',
    name: 'Rick Sanchez',
    avatar:
      'https://pbs.twimg.com/profile_images/897250392022540288/W1T-QjML_400x400.jpg',
  },
  morty: {
    sid: 'morty',
    name: 'Morty Smith',
    avatar:
      'https://pbs.twimg.com/profile_images/685489227082129408/YhGfwW73_400x400.png',
  },
  summer: {
    sid: 'sumsum',
    name: 'Summer Smith',
    avatar:
      'https://pbs.twimg.com/profile_images/878646716328812544/dYdU_OKZ_400x400.jpg',
  },
};

const others = (sid) =>
  Object.keys(participants).reduce((all, id) => (id === sid ? all : all.concat(participants[id])), []);

class Mediator extends EventEmitter {
  emit(eventName, data) {
    switch (eventName) {
      case 'init': {
        const { sid, doc } = data;
        this.emit(`${sid}:init`, { doc });
        this.emit(`${sid}:connected`, { sid });

        const joined = Object.keys(participants).reduce((all, id) => {
          const { sid: sessionId, ...rest } = participants[id];
          return all.concat({
            sessionId,
            ...rest,
            lastActive: 0,
          });
        }, []);

        others(sid).forEach(({ sid: xSid }) => {
          window.setTimeout(() => {
            this.emit(`${xSid}:presence`, { joined });
          }, 0);
        });
        return;
      }
      case 'data':
      case 'telepointer': {
        const { sid, ...rest } = data;
        others(sid).forEach(({ sid }) => {
          this.emit(`${sid}:${eventName}`, { ...rest });
        });
        return;
      }
    }
    super.emit(eventName, data);
  }
}

const mediator = new Mediator();

export class MockCollabEditProvider {
    getState = () => {};
    createStep = (json) => {};
    sid;
    eventBus;

    constructor(eventBus, sid, initialDoc) {
      console.log("instance a new Mock")
      // If there's no sid then it's single user, being used for test
      if (sid) {
        this.sid = sid;
        this.eventBus = eventBus;
      } else {
        this.eventBus = new EventEmitter();
      }
      this.initialDoc = initialDoc.content
    }

    getCurrentDoc() {
      console.log("get current doc", this.initialDoc)
      return this.initialDoc
    }

    initialize(getState, createStep) {
      // from editor-core/src/plugins/collab-edit/plugin.js:L128
      // getState: () => view.state
      // createStep: (json) => Step.fromJSON( view.state.schema, json)
      console.log("initialize the mock", {getState, createStep})
      this.getState = getState;
      this.createStep = createStep;
      const { sid } = this;
      this.eventBus.emit('init', { sid, doc: this.getCurrentDoc() });

      return this;
    }

    send(tr, oldState, newState) {
      console.log('send in mock', {tr, oldState, newState } )
      const { sid } = this;
      if (tr.steps && tr.steps.length) {
        const json = tr.steps.map(step => step.toJSON());
        console.log('steps', json )
        this.eventBus.emit('data', { json, sid });
      }
    }

    on(evt, handler) {
      // from editor-core/src/plugins/collab-edit/plugin.js:L105
      // on init: data => { isReady = true ; handleInit(data, view, options) }
      // on connected: data => handleConnection(data, view)
      // on data: data => applyRemoteData(data, view, options)
      // on presence: data => handlePresence(data, view)
      // on telepointer: data => handleTelepointer(data, view)
      // on local-steps: data => {
      //          const { steps } = data;
      //          const { state } = view;
      //
      //          const { tr } = state;
      //          steps.forEach((step: Step) => tr.step(step));
      //
      //          const newState = state.apply(tr);
      //          view.updateState(newState);
      //        }
      // on error: err => { ('not implemented') }
      console.log('on', {evt, handler}, handler)
      const { sid } = this;
      if (sid) {
        this.eventBus.on(`${sid}:${evt}`, handler);
      } else {
        this.eventBus.on(evt, handler);
      }
      return this;
    }

    emit(evt, ...args) {
      console.log('emit', {evt, ...args})
      const { sid } = this;
      if (sid) {
        this.eventBus.emit(evt, { sid, ...args });
      } else {
        this.eventBus.emit(evt, ...args);
      }
    }

    sendMessage(data) {
      console.log('sendMessage', data)
      const { sid } = this;
      if (sid) {
        this.eventBus.emit(`${data.type}`, { sid, ...data });
      }
    }
  }


const getCollabEditProviderFor = (participants) => (sid, initialDoc) =>
  Promise.resolve(new MockCollabEditProvider(mediator, sid, initialDoc));

export const collabEditProvider = getCollabEditProviderFor(participants);
