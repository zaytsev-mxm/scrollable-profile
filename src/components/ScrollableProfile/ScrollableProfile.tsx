import React from 'react';
// import throttle from 'lodash/throttle';
import ContentPlaceholder from '../ContentPlaceholder';

import './ScrollableProfile.scss';

type Props = {
  children?: React.ReactElement;
};

const ScrollableProfile: React.FC<Props> = (props) => {
  const { children } = props;

  const [scrolledPercent, setScrolledPercent] = React.useState<number>(0);
  const [scrolledTopPx, setScrolledTopPx] = React.useState<number>(0);
  const scrollableProfileRootRef = React.useRef<HTMLDivElement>(null);
  const scrollableProfileContentRef = React.useRef<HTMLDivElement>(null);

  const handleScroll: React.EventHandler<any> = (event) => {
    const { target, deltaY = 0 } = event;
    const { scrollHeight } = target;

    // @ts-ignore
    const currentMarginTop = getComputedStyle(scrollableProfileContentRef.current).marginTop
    const currentMarginTopNumber = parseInt(currentMarginTop) || 0;
    const marginTopGiven = currentMarginTopNumber + deltaY;
    let marginTop: number = marginTopGiven;

    if (marginTopGiven >= 0) {
      marginTop = 0
    }

    // @ts-ignore
    const maxScroll = scrollHeight - scrollableProfileRootRef?.current?.offsetHeight;
    if (Math.abs(marginTopGiven) > maxScroll) {
      marginTop = maxScroll * -1;
    }

    setScrolledTopPx(marginTop);

    const scrolledPercentValue = (Math.abs(marginTop) * 100) / scrollHeight;

    setScrolledPercent(scrolledPercentValue);
  };

  React.useEffect(() => {
    const ref = scrollableProfileRootRef.current;

    const eventName = 'mousewheel';

    const addScrollListener = () => {
      ref?.addEventListener(eventName, handleScroll);
    };
    const removeScrollListener = () => {
      ref?.removeEventListener(eventName, handleScroll);
    };

    addScrollListener();

    return removeScrollListener;
  })

  const renderContent = () => {
    if (children) {
      return children;
    }

    return <ContentPlaceholder loremIpsum={32} />
  };

  const renderScrollBar = () => {
    const scrollBarStyle = {
      top: `${scrolledPercent}%`,
    };
    return (
      <div className="scrollable-profile_scroll-bar">
        <div className="scrollable-profile_scroll-bar_point" style={scrollBarStyle} />
      </div>
    );
  };

  const scrollableProfileContentStyle = {
    marginTop: `${scrolledTopPx}px`,
  };

  return (
    <div className="scrollable-profile-root" ref={scrollableProfileRootRef}>
      <div
        className="scrollable-profile_content"
        ref={scrollableProfileContentRef}
        style={scrollableProfileContentStyle}
      >
        {renderContent()}
      </div>
      {renderScrollBar()}
    </div>
  );
};

export default ScrollableProfile;