import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";

const AboutUS = ({ thisListingDetails }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  // Sanitize and modify the stored HTML content
  const sanitizedContent = sanitizeHtml(thisListingDetails.aboutListing, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'span']),
    allowedAttributes: {
      'a': ['href', 'name', 'target'],
      '*': ['style', 'class'],
    },
    allowedStyles: {
      '*': {
        // Allow specific styles or strip unwanted styles
        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/],
        'font-size': [/^\d+(?:px|em|%)$/],
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
    },
    disallowedTagsMode: 'discard',
  });

  const displayAbout = sanitizedContent ? sanitizedContent.substr(0, 550) + '...' : '';

  return (
    <div> 
      <div dangerouslySetInnerHTML={{ __html: displayAbout }} />
      <Button variant='light' onPress={onOpen} className='w-[22%] h-8'><u>Show more</u>〉</Button>
      <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div dangerouslySetInnerHTML={{__html: sanitizedContent}}/>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AboutUS;
