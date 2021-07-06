import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { PureComponent } from 'react'
import StatelessElementBrowser from './components/StatelessElementBrowser'
export default class ElementBrowser extends PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      categories: [],
      items: [],
      searchTerm: '',
      selectedCategory: this.props.defaultCategory
    })

    _defineProperty(this, 'setCategories', () => {
      const items = this.fetchItems()
      const categories = this.filterCategories(items, this.props.categories)
      this.setState({
        items,
        categories
      })
    })

    _defineProperty(this, 'filterCategories', (items, categories = []) => {
      const { showCategories } = this.props

      if (!showCategories) {
        return []
      }

      return categories.filter(
        category =>
          category.name === 'all' ||
          items.some(item => (item.categories || []).includes(category.name))
      )
    })

    _defineProperty(this, 'fetchItems', (query, category) => {
      return this.props.getItems(query, category)
    })

    _defineProperty(this, 'handleSearch', searchTerm => {
      const { defaultCategory } = this.props
      this.setState({
        searchTerm,
        selectedCategory: defaultCategory
      })
    })

    _defineProperty(this, 'handleCategorySelection', clickedCategory => {
      const { selectedCategory: stateCategoryValue } = this.state
      /**
       * Reset selection if clicked on the same category twice.
       */

      if (stateCategoryValue === clickedCategory.name) {
        return this.setState({
          selectedCategory: this.props.defaultCategory
        })
      }

      this.setState({
        selectedCategory: clickedCategory.name,
        searchTerm: ''
      })
    })
  }

  componentDidMount() {
    this.setCategories()
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm, selectedCategory } = this.state

    if (
      searchTerm !== prevState.searchTerm ||
      selectedCategory !== prevState.selectedCategory
    ) {
      const items = this.fetchItems(searchTerm, selectedCategory)
      this.setState({
        items
      })
    }
  }

  render() {
    const {
      onInsertItem,
      onSelectItem,
      showSearch,
      showCategories,
      mode
    } = this.props
    const { categories, searchTerm, selectedCategory, items } = this.state
    return /*#__PURE__*/ React.createElement(StatelessElementBrowser, {
      items: items,
      categories: categories,
      onSearch: this.handleSearch,
      onSelectCategory: this.handleCategorySelection,
      onSelectItem: onSelectItem,
      onInsertItem: onInsertItem,
      selectedCategory: selectedCategory,
      showSearch: showSearch,
      showCategories: showCategories,
      mode: mode,
      searchTerm: searchTerm
    })
  }
}

_defineProperty(ElementBrowser, 'defaultProps', {
  defaultCategory: 'all',
  onInsertItem: () => {}
})
