import React from "react";
import CenteredContent from 'components/CenteredContent';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      return (
        <CenteredContent>
          <h1>Something went wrong.</h1>
        </CenteredContent>
      )
    }

    return this.props.children;
  }
}