import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { utils } from '@atlaskit/util-service-support';
import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { logger } from './logger';
export class Channel {
  constructor(config, pubSubClient) {
    _defineProperty(this, "eventEmitter", new EventEmitter2());

    this.config = config;
    this.pubSubClient = pubSubClient;
  }
  /**
   * Get initial document from service
   */


  async getDocument() {
    try {
      const {
        doc,
        version
      } = await utils.requestService(this.config, {
        path: `document/${this.config.docId}`
      });
      return {
        doc,
        version
      };
    } catch (err) {
      logger(`Collab-Edit: Document "${this.config.docId}" does not exist. Creating one locally.`);
      return {
        doc: {},
        version: 1
      };
    }
  }
  /**
   * Connect to pubsub to start receiving events
   */


  async connect() {
    const {
      docId
    } = this.config;
    const {
      doc,
      version
    } = await this.getDocument();
    this.pubSubClient.on('CONNECT', () => {
      logger('Connected to FPS-service');
    });
    await this.pubSubClient.join([`ari:cloud::fabric:collab-service/${docId}`]);
    this.pubSubClient.on('avi:pf-collab-service:steps:created', (_event, payload) => {
      logger('Received FPS-payload', {
        payload
      });
      this.emit('data', payload);
    }).on('avi:pf-collab-service:telepointer:updated', (_event, payload) => {
      logger('Received telepointer-payload', {
        payload
      });
      this.emit('telepointer', payload);
    });
    this.eventEmitter.emit('connected', {
      doc,
      version
    });
  }

  debounce(getState) {
    logger(`Debouncing steps`);

    if (this.debounced) {
      clearTimeout(this.debounced);
    }

    this.debounced = window.setTimeout(() => {
      logger(`Sending debounced`);
      this.sendSteps(getState(), getState);
    }, 250);
  }
  /**
   * Send steps to service
   */


  async sendSteps(state, getState, localSteps) {
    if (this.isSending) {
      this.debounce(getState);
      return;
    }

    const version = getVersion(state); // Don't send any steps before we're ready.

    if (typeof version === undefined) {
      return;
    }

    const {
      steps
    } = localSteps || sendableSteps(state) || {
      steps: []
    }; // sendableSteps can return null..

    if (steps.length === 0) {
      logger(`No steps to send. Aborting.`);
      return;
    }

    this.isSending = true;

    try {
      const response = await utils.requestService(this.config, {
        path: `document/${this.config.docId}/steps`,
        requestInit: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            version,
            steps
          })
        }
      });
      this.isSending = false;
      logger(`Steps sent and accepted by service.`);
      this.emit('data', response);
    } catch (err) {
      this.isSending = false;
      logger(`Error sending steps: "${err}"`);
    }
  }
  /**
   * Get steps from version x to latest
   */


  async getSteps(version) {
    return await utils.requestService(this.config, {
      path: `document/${this.config.docId}/steps`,
      queryParams: {
        version
      }
    });
  }
  /**
   * Send telepointer
   */


  async sendTelepointer(data) {
    logger(`Sending telepointer`, data);
    await utils.requestService(this.config, {
      path: `document/${this.config.docId}/telepointer`,
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    });
  }
  /**
   * Subscribe to events emitted by this channel
   */


  on(evt, handler) {
    this.eventEmitter.on(evt, handler);
    return this;
  }
  /**
   * Unsubscribe from events emitted by this channel
   */


  off(evt, handler) {
    this.eventEmitter.off(evt, handler);
    return this;
  }
  /**
   * Emit events to subscribers
   */


  emit(evt, data) {
    this.eventEmitter.emit(evt, data);
    return this;
  }

}