import React from 'react';
export class AnnotationViewWrapper extends React.PureComponent {
  componentDidMount() {
    const {
      onViewed
    } = this.props;

    if (onViewed) {
      onViewed();
    }
  }

  render() {
    return this.props.children;
  }

}