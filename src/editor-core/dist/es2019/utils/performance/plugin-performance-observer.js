import _defineProperty from '@babel/runtime/helpers/defineProperty'
import { PluginPerformanceReport } from './plugin-performance-report'
export class PluginPerformanceObserver {
  constructor(callback) {
    _defineProperty(this, 'getNodeCounts', () => [{}, 0])

    _defineProperty(this, 'getPlugins', () => [])

    _defineProperty(this, 'getOptions', () => ({}))

    _defineProperty(this, 'reportCount', 0)

    _defineProperty(this, 'onObserveration', entries => {
      const reports = entries
        .getEntriesByName('🦉 ReactEditorView::dispatchTransaction')
        .map(entry =>
          PluginPerformanceReport.fromEntry(entry)
            .withCount(++this.reportCount)
            .withEntryList(entries)
            .withNodes(...this.getNodeCounts())
            .withPlugins(this.getPlugins())
            .withOptions(this.getOptions())
            .toJSON()
        )
      reports
        .filter(report => report.trigger !== 'none')
        .forEach(report => this.callback(report))
    })

    _defineProperty(
      this,
      'observer',
      window.PerformanceObserver
        ? new PerformanceObserver(this.onObserveration)
        : {
            observe() {},

            disconnect() {},

            takeRecords() {
              return []
            }
          }
    )

    this.callback = callback
  }

  withNodeCounts(getNodeCounts) {
    this.getNodeCounts = () => {
      const start = performance.now()
      const result = getNodeCounts()
      return [result, performance.now() - start]
    }

    return this
  }

  withPlugins(getPlugins) {
    this.getPlugins = getPlugins
    return this
  }

  withOptions(getOptions) {
    this.getOptions = getOptions
    return this
  }

  observe() {
    try {
      this.observer.observe({
        buffered: false,
        type: 'measure'
      })
    } catch (err) {
      // Older API implementations do not support the simpler type init
      this.observer.observe({
        entryTypes: ['measure']
      })
    }
  }

  disconnect() {
    this.observer.disconnect()
  }

  takeRecords() {
    return this.observer.takeRecords()
  }
}
