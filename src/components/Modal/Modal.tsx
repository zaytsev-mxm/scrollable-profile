import React from 'react';
import Backdrop from '../Backdrop';

type Props = {
  children?: React.ReactElement;
  onBackDropClick?: (event: React.MouseEvent) => void;
};

const Modal: React.FC<Props> = (props) => {
  const { children, onBackDropClick } = props;
  return (
    <Backdrop onClick={onBackDropClick}>
      {children}
    </Backdrop>
  );
};

export default Modal;