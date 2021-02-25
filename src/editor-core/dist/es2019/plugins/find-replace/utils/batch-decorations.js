import { createDecorations, findDecorationFromMatch } from './index';
import { getPluginState } from '../plugin'; // max number of decorations to apply at once

const batchIncrement = 100; // position range to apply decorations between before alternating above or below viewport

const posIncrement = 2000;

/**
 * Provides support for applying search match highlight decorations in batches
 */
class BatchDecorations {
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
  /**
   * Applies the decorations needed for the current search results
   * It does so async, splitting them up into batches to help with performance
   */


  async applyAllSearchDecorations(editorView, containerElement, addDecorations, removeDecorations) {
    this.stop();
    this.addDecorations = addDecorations;
    this.removeDecorations = removeDecorations;

    if (!containerElement) {
      return;
    }

    const pmElement = containerElement.querySelector('.ProseMirror');

    if (!pmElement) {
      return;
    }

    const positions = this.calcDecorationPositions(editorView, containerElement, pmElement);
    const {
      startPos,
      endPos,
      viewportStartPos,
      viewportEndPos
    } = positions;
    let dir = 0;
    let before = viewportStartPos;
    let after = viewportEndPos - posIncrement;
    await this.updateDecorationsBetween(editorView, viewportStartPos, viewportEndPos);

    while (before > startPos || after < endPos) {
      if (dir++ % 2 === 0 && before > startPos || after >= endPos) {
        const diff = before - startPos;
        before = Math.max(before - posIncrement, startPos);
        await this.updateDecorationsBetween(editorView, before, before + Math.min(diff, posIncrement));
      } else {
        after = Math.min(after + posIncrement, endPos);
        await this.updateDecorationsBetween(editorView, after, Math.min(after + posIncrement, endPos));
      }
    }
  }

  async updateDecorationsBetween(editorView, startPos, endPos) {
    await this.removeDecorationsBetween(editorView, startPos, endPos);
    await this.addDecorationsBetween(editorView, startPos, endPos);
  }

  async addDecorationsBetween(editorView, startPos, endPos) {
    const {
      selection
    } = editorView.state;
    const {
      matches,
      decorationSet
    } = getPluginState(editorView.state);

    if (matches.length === 0) {
      return;
    }

    const matchesBetween = matches.filter(m => m.start >= startPos && (endPos === undefined || m.start < endPos));
    const selectionMatch = matches.find(match => match.start >= selection.from);
    const selectionIndex = matchesBetween.findIndex(match => match === selectionMatch);
    return await this.batchRequests(counter => {
      let matchesToDecorate = matchesBetween.slice(counter, counter + batchIncrement);

      if (matchesToDecorate.length === 0) {
        return false;
      }

      let useSelectionIndex = selectionIndex >= counter && selectionIndex < counter + batchIncrement;

      if (selectionMatch && useSelectionIndex) {
        const selectionMatchDecoration = findDecorationFromMatch(decorationSet, selectionMatch);

        if (selectionMatchDecoration) {
          matchesToDecorate.splice(selectionIndex % batchIncrement, 1);
          useSelectionIndex = false;
        }
      }

      if (this.addDecorations) {
        this.addDecorations(createDecorations(useSelectionIndex ? selectionIndex % batchIncrement : -1, matchesToDecorate));
      }
    }, {
      increment: batchIncrement,
      until: matchesBetween.length
    });
  }

  async removeDecorationsBetween(editorView, startPos, endPos) {
    const {
      decorationSet
    } = getPluginState(editorView.state);
    const decorations = decorationSet.find(startPos, endPos);

    if (decorations.length === 0) {
      return;
    }

    return await this.batchRequests(counter => {
      let decorationsToRemove = decorations.slice(counter, counter + batchIncrement);

      if (decorationsToRemove.length === 0) {
        return false;
      } // only get those decorations whose from >= startPos


      for (let i = 0; i < decorationsToRemove.length; i++) {
        if (decorationsToRemove[i].from >= startPos) {
          break;
        }

        decorationsToRemove = decorationsToRemove.slice(1);
      }

      if (this.removeDecorations) {
        this.removeDecorations(decorationsToRemove);
      }
    }, {
      increment: batchIncrement,
      until: decorations.length
    });
  }
  /**
   * Calculates Prosemirror start and end positions we want to apply the decorations
   * between
   * Also calculates the positions the are the start and end of the user's viewport
   * so we can apply decorations there first and work outwards
   */


  calcDecorationPositions(editorView, containerElement, pmElement) {
    const containerRect = containerElement.getBoundingClientRect();
    const pmRect = pmElement.getBoundingClientRect();
    const viewportStartPos = this.getStartPos(editorView, 0, pmRect.left);
    const viewportEndPos = this.getEndPos(editorView, containerRect.top + containerRect.height, pmRect.left);
    return {
      viewportStartPos,
      viewportEndPos,
      startPos: 1,
      endPos: editorView.state.doc.nodeSize
    };
  }

  getStartPos(editorView, y, x) {
    const startPos = editorView.posAtCoords({
      top: y,
      left: x
    });
    return startPos ? startPos.pos : 1;
  }

  getEndPos(editorView, y, x) {
    const maxPos = editorView.state.doc.nodeSize;
    const endPos = editorView.posAtCoords({
      top: y,
      left: x
    });
    return endPos ? endPos.pos : maxPos;
  }
  /**
   * Util to batch function calls by animation frames
   * A counter will start at 0 and increment by provided value until reaches limit
   * Passed in fn receives the counter as a param, return false to skip waiting
   * for the animation frame for the next call
   */


  batchRequests(fn, opts) {
    let counter = 0;
    const {
      increment,
      until
    } = opts;
    return new Promise(resolve => {
      const batchedFn = () => {
        let result = fn(counter);

        while (result === false && counter < until) {
          counter += increment;
          result = fn(counter);
        }

        if (counter < until) {
          counter += increment;
          this.rafId = requestAnimationFrame(batchedFn);
        } else {
          this.rafId = undefined;
          resolve();
        }
      };

      this.rafId = requestAnimationFrame(batchedFn);
    });
  }

}

const batchDecorations = new BatchDecorations();
export default batchDecorations;