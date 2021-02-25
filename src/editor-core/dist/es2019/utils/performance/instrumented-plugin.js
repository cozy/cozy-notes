import { Plugin } from 'prosemirror-state';
import { startMeasure, stopMeasure } from '@atlaskit/editor-common';
import { shouldTrackTransaction } from './should-track-transaction';
export class InstrumentedPlugin extends Plugin {
  constructor(spec, options = {}) {
    const {
      transactionTracking = {
        enabled: false
      },
      uiTracking = {
        enabled: false
      }
    } = options;

    if (transactionTracking.enabled && spec.state) {
      const originalApply = spec.state.apply.bind(spec.state);

      spec.state.apply = (tr, value, oldState, newState) => {
        const shouldTrackTransactions = shouldTrackTransaction(transactionTracking);

        if (!shouldTrackTransactions) {
          return originalApply(tr, value, oldState, newState);
        }

        const self = this;
        const measure = `🦉${self.key}::apply`;
        startMeasure(measure);
        const result = originalApply(tr, value, oldState, newState);
        stopMeasure(measure, () => {});
        return result;
      };
    }

    if (uiTracking.enabled && spec.view) {
      const originalView = spec.view.bind(spec);

      spec.view = editorView => {
        const self = this;
        const measure = `🦉${self.key}::view::update`;
        const view = originalView(editorView);

        if (view.update) {
          const originalUpdate = view.update;

          view.update = (view, state) => {
            startMeasure(measure);
            originalUpdate(view, state);
            stopMeasure(measure, () => {});
          };
        }

        return view;
      };
    }

    super(spec);
  }

  static fromPlugin(plugin, options) {
    return new InstrumentedPlugin(plugin.spec, options);
  }

}