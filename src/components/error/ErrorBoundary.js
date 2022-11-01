import React from 'react';
import CenteredContent from 'components/CenteredContent';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <CenteredContent>
          <h1>Something went wrong.</h1>
        </CenteredContent>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}
