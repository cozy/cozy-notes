import _defineProperty from '@babel/runtime/helpers/defineProperty'
import { outlier } from './outlier'
export class PluginPerformanceReport {
  constructor(entry) {
    _defineProperty(this, 'count', 0)

    _defineProperty(this, 'pluginNames', [])

    _defineProperty(this, 'nodes', {})

    _defineProperty(this, 'nodesDuration', 0)

    _defineProperty(this, 'plugins', {})

    _defineProperty(this, 'slowPlugins', {})

    _defineProperty(this, 'options', {
      samplingRate: 100,
      slowThreshold: 300,
      outlierThreshold: 30,
      outlierFactor: 3
    })

    _defineProperty(
      this,
      'isChild',
      child =>
        child.startTime >= this.entry.startTime &&
        child.startTime + child.duration <=
          this.entry.startTime + this.entry.duration
    )

    this.entry = entry
  }

  static fromEntry(entry) {
    return new PluginPerformanceReport(entry)
  }

  getEntryByName(entryList, name) {
    return entryList.getEntriesByName(name).find(this.isChild)
  }

  getMethodSum(methods) {
    return Object.values(methods).reduce((a, b) => a + b, 0)
  }

  greaterEquals(a, b) {
    return typeof b === 'number' ? a >= b : false
  }

  hasOutlierMethods(methods, outliers) {
    return (
      this.greaterEquals(methods.stateApply, outliers.stateApplyOutlier) ||
      this.greaterEquals(methods.viewUpdate, outliers.viewUpdateOutlier)
    )
  }

  get trigger() {
    if (this.entry.duration > this.options.slowThreshold) {
      return 'slow'
    } else if (
      this.hasSlowPlugins &&
      this.entry.duration > this.options.outlierThreshold
    ) {
      return 'distribution'
    } else if (this.count > 0 && this.count % this.options.samplingRate === 0) {
      return 'sample'
    } else {
      return 'none'
    }
  }

  get hasSlowPlugins() {
    return Object.keys(this.slowPlugins).length > 0
  }

  withEntryList(entryList) {
    this.entryList = entryList
    this.stateApplied = this.getEntryByName(
      entryList,
      '🦉 EditorView::state::apply'
    )
    this.viewUpdated = this.getEntryByName(
      entryList,
      '🦉 EditorView::updateState'
    )
    this.onChangeCalled = this.getEntryByName(
      entryList,
      '🦉 ReactEditorView::onChange'
    )
    this.onEditorViewStateUpdatedCalled = this.getEntryByName(
      entryList,
      '🦉 ReactEditorView::onEditorViewStateUpdated'
    )
    this.withPlugins(this.pluginNames)
    return this
  }

  withPlugins(pluginNames) {
    const emptyEntry = {
      duration: 0
    }
    this.pluginNames = pluginNames
    this.plugins = pluginNames.reduce((acc, name) => {
      const pluginApplied = this.entryList
        ? this.getEntryByName(this.entryList, `🦉${name}::apply`) || emptyEntry
        : emptyEntry
      const pluginViewUpdated = this.entryList
        ? this.getEntryByName(this.entryList, `🦉${name}::view::update`) ||
          emptyEntry
        : emptyEntry
      const pluginOnEditorViewStateUpdated = this.entryList
        ? this.getEntryByName(
            this.entryList,
            `🦉${name}::onEditorViewStateUpdated`
          ) || emptyEntry
        : emptyEntry
      acc[name] = {
        stateApply: pluginApplied.duration,
        viewUpdate: pluginViewUpdated.duration,
        onEditorViewStateUpdated: pluginOnEditorViewStateUpdated.duration
      }
      return acc
    }, {})

    if (this.stateApplied && pluginNames.length > 0) {
      const pluginEntries = Object.entries(this.plugins)
      const stateApplyOutlier = outlier(
        pluginEntries.map(([, { stateApply }]) => stateApply),
        this.options.outlierFactor
      )
      const viewUpdateOutlier = outlier(
        pluginEntries.map(([, { viewUpdate }]) => viewUpdate),
        this.options.outlierFactor
      )
      const budget = this.options.outlierThreshold / pluginEntries.length
      /**
       * Consider plugin methods slow that are
       * statistically significantly slower than peers
       * AND where the sum of methods for a plugin is slower than 16.7ms / plugins.length
       */

      const pluginIsOutlier = ([, methods]) =>
        this.getMethodSum(methods) > budget &&
        this.hasOutlierMethods(methods, {
          stateApplyOutlier,
          viewUpdateOutlier
        })

      this.slowPlugins = pluginEntries
        .filter(pluginIsOutlier)
        .reduce((acc, [n, d]) => ({ ...acc, [n]: d }), {})
    }

    return this
  }

  withNodes(nodes, nodesDuration = 0) {
    this.nodes = nodes
    this.nodesDuration = nodesDuration
    return this
  }

  withCount(count) {
    this.count = count
    return this
  }

  withOptions(options) {
    Object.assign(this.options, options)
    return this
  }

  toJSON() {
    return {
      trigger: this.trigger,
      duration: this.entry.duration,
      nodes: this.nodes,
      plugins: this.plugins,
      slowPlugins: this.slowPlugins,
      stepDurations: {
        stateApply: this.stateApplied ? this.stateApplied.duration : 0,
        viewUpdate: this.viewUpdated ? this.viewUpdated.duration : 0,
        onChange: this.onChangeCalled ? this.onChangeCalled.duration : 0,
        onEditorViewStateUpdated: this.onEditorViewStateUpdatedCalled
          ? this.onEditorViewStateUpdatedCalled.duration
          : 0,
        countNodes: this.nodesDuration
      }
    }
  }
}
