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
    if (this.state.hasError) {
      return (
        <CenteredContent>
          <h1>Something went wrong.</h1>
        </CenteredContent>
      );
    }

    return this.props.children;
  }
}
