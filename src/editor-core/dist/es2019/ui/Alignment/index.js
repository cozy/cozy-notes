import React from 'react';
import { PureComponent } from 'react';
import AlignmentButton from './AlignmentButton';
import { AlignmentWrapper } from './styles';
import { iconMap } from '../../plugins/alignment/ui/ToolbarAlignment/icon-map';
const alignmentOptions = [{
  title: 'Align left',
  value: 'start'
}, {
  title: 'Align center',
  value: 'center'
}, {
  title: 'Align right',
  value: 'end'
}];
export default class Alignment extends PureComponent {
  render() {
    const {
      onClick,
      selectedAlignment,
      className
    } = this.props;
    return /*#__PURE__*/React.createElement(AlignmentWrapper, {
      className: className,
      style: {
        maxWidth: 3 * 32
      }
    }, alignmentOptions.map(alignment => {
      const {
        value,
        title
      } = alignment;
      return /*#__PURE__*/React.createElement(AlignmentButton, {
        content: iconMap[value],
        key: value,
        value: value,
        label: title,
        onClick: onClick,
        isSelected: value === selectedAlignment
      });
    }));
  }

}