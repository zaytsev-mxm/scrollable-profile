import React from 'react';
import Page from '../../components/Page';
import Modal from '../../components/Modal';
import ContentPlaceholder from '../../components/ContentPlaceholder';
import ScrollableProfile from '../../components/ScrollableProfile';
import './ModalPage.scss';

function ModalPage() {
  const [modalContent, setModalContent] = React.useState<React.ReactElement|null>(null);

  const scrollLock = (lock?: boolean) => {
    const domElHtml = document.querySelector('html');
    const domElBody = document.querySelector('body');

    if (!domElHtml || !domElBody) return;

    if (lock) {
      domElHtml.style.overflow = 'hidden';
      domElBody.style.overflow = 'hidden';
    } else {
      domElHtml.style.overflow = '';
      domElBody.style.overflow = '';
    }
  };

  const handleModalToggle = (event: React.MouseEvent | null, show?: boolean) => {
    const doShow = typeof show === 'boolean' ? show : !Boolean(modalContent);
    if (doShow) {
      const newModalContent = <ScrollableProfile />;
      setModalContent(newModalContent);
      scrollLock(true);
    } else {
      setModalContent(null);
      scrollLock(false);
    }
  };

  const renderModal = () => {
    if (!modalContent) return null;

    const hideModal = () => handleModalToggle(null, false);

    return <Modal onBackDropClick={hideModal}>{ modalContent }</Modal>
  };

  return (
    <Page modalContent={modalContent}>
      <div className="page_modal-page">
        <ContentPlaceholder height={3000}>
          <button
            className="page_modal-page_toggle-modal"
            onClick={handleModalToggle}
          >
            Show modal
          </button>
        </ContentPlaceholder>
        {renderModal()}
      </div>
    </Page>
  );
}

export default ModalPage;