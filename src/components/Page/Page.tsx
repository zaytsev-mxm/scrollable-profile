import React from 'react';
import {Link} from 'react-router-dom';

type Props = {
  hasNavigation?: boolean;
  children?: React.ReactElement;
  modalContent?: React.ReactElement | null;
};

const Page: React.FunctionComponent<Props> = (props) => {
  const {hasNavigation, modalContent, children} = props;

  const renderNavigation = () => {
    if (!hasNavigation) return null;

    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/modal">Modal</Link>
          </li>
        </ul>

        <hr/>
      </div>
    );
  };

  return (
    <div>
      {renderNavigation()}
      {children}
    </div>
  );
};

export default Page;