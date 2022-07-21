import React, { PureComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default class FourNotFour extends PureComponent {
  render(): ReactNode {
    return (
      <div>
        <div>Not Found</div>
        <div>
          Go to HomePage
          <Link to="/">HomePage</Link>
        </div>
      </div>
    );
  }
}
