import React from 'react';
import sanitizeHtml from 'sanitize-html'; // Importing sanitize-html to sanitize HTML content
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react"; // Importing necessary components from NextUI

const AboutUS = ({ thisListingDetails }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Using NextUI's useDisclosure for managing modal state
  const [scrollBehavior, setScrollBehavior] = React.useState("inside"); // Setting the scroll behavior for the modal

  // Sanitize and modify the stored HTML content
  const sanitizedContent = sanitizeHtml(thisListingDetails.aboutListing, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'span']), // Allowing additional tags like h1, h2, span
    allowedAttributes: {
      'a': ['href', 'name', 'target'], // Allowing specific attributes for anchor tags
      '*': ['style', 'class'], // Allowing style and class attributes for all tags
    },
    allowedStyles: {
      '*': {
        // Allow specific styles or strip unwanted styles
        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/], // Allowing specific color formats
        'font-size': [/^\d+(?:px|em|%)$/], // Allowing specific font-size formats
        'text-align': [/^left$/, /^right$/, /^center$/], // Allowing specific text alignment values
      },
    },
    disallowedTagsMode: 'discard', // Discard disallowed tags instead of escaping them
  });

  // Truncate the content for the initial display
  const displayAbout = sanitizedContent ? sanitizedContent.substr(0, 550) + '...' : '';

  return (
    <div> 
      {/* Display truncated content initially */}
      <div dangerouslySetInnerHTML={{ __html: displayAbout }} />

      {/* Button to open the modal for more content */}
      <Button variant='light' onPress={onOpen} className='w-[22%] h-8'>
        <u>Show more</u>〉
      </Button>

      {/* Modal to display the full sanitized content */}
      <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AboutUS;
