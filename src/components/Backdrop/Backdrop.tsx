import React from 'react';
import './Backdrop.scss';

type Props = {
  children?: React.ReactElement;
  onClick?: (event: React.MouseEvent) => void;
};

const Backdrop: React.FunctionComponent<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <div className="backdrop-root">
      <div className="backdrop-shadow" onClick={onClick} />
      <div className="backdrop-content">{ children }</div>
    </div>
  );
};

export default Backdrop;