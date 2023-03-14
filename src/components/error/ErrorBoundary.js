import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div
          className="flex-center-all w-100 h-100"
          style={{ height: '100vh' }}
        >
          <h1>Что-то пошло не так</h1>
          <Link to="/">Вернуться домой</Link>
        </div>
      );
    }

    return children;
  }
}
