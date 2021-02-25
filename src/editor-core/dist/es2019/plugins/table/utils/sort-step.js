import { Slice } from 'prosemirror-model';
import { ReplaceStep, Step, StepMap, StepResult } from 'prosemirror-transform';
export const tableSortingStepType = 'atlaskit-table-sorting-ordering';
export class TableSortStep extends Step {
  constructor(pos, prev, next) {
    super();
    this.prev = prev;
    this.next = next;
    this.pos = pos;
  }

  invert() {
    return new TableSortStep(this.pos, this.next, this.prev);
  }

  apply(doc) {
    return StepResult.ok(doc);
  }

  map() {
    return null;
  }

  getMap() {
    return new StepMap([0, 0, 0]);
  }

  toJSON() {
    return {
      stepType: tableSortingStepType
    };
  }

  static fromJSON() {
    return new ReplaceStep(0, 0, Slice.empty);
  }

}
/** Register this step with Prosemirror */

Step.jsonID(tableSortingStepType, TableSortStep);