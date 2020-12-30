import React from 'react';
import classNames from 'classnames';
import { LoremIpsum } from 'lorem-ipsum';
import './ContentPlaceholder.scss';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  loremIpsum?: number;
};

const ContentPlaceholder: React.FC<Props> = (props) => {
  const { width, height, className = '', loremIpsum = 0, children } = props;

  const [loremIpsumText = '', setLoremIpsumText] = React.useState<string>('');

  React.useEffect(() => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    setLoremIpsumText(lorem.generateParagraphs(loremIpsum));
  }, [loremIpsum]);

  const rootClassNames = classNames('content-placeholder', className);

  const rootStyles: Record<string, string> = {};
  if (width) rootStyles.width = `${width}px`;
  if (height) rootStyles.height = `${height}px`;

  const renderContent = () => {
    if (loremIpsumText) {
      return <div className="content-placeholder_lipsum">{loremIpsumText}</div>;
    }

    return null;
  };

  return (
    <div className={rootClassNames} style={rootStyles}>
      {renderContent()}
      {children}
    </div>
  );
};

export default ContentPlaceholder;