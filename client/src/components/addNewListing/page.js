// Import necessary React hooks and components from various libraries
import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react"; // WYSIWYG editor for rich text editing
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react"; // UI components for modal and buttons
import { useFormik } from 'formik'; // Formik for form handling
import { Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'; // UI components for input fields
import toast from 'react-hot-toast'; // For displaying toast notifications
import { MdOutlineAddHome } from "react-icons/md"; // Icon for add listing button
import CreatableSelect from 'react-select/creatable'; // Select component that allows creating new options

// Main component for adding a new listing
const AddListing = ({ onNewListing }) => {
    // Modal state management
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const [images, setImages] = useState(null); // State to store selected images
    const [inputValue, setInputValue] = useState(''); // State for the current input in the CreatableSelect
    const [value, setValue] = useState([]); // State to store the selected amenities
    const [content, setContent] = useState(""); // State to store the content from JoditEditor

    // Handle keydown events to add new options in the CreatableSelect
    const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    // Helper function to create a new option in the CreatableSelect
    const createOption = (label) => ({
        label,
        value: label,
    });

    // Formik setup for form handling
    const formik = useFormik({
        initialValues: {
            listingNumber: '',
            listingPrice: '',
            listingCategory: '',
            listingLocation: '',
            listingDescription: '',
            listingPax: '',
            listingAvailability: '',
            listingAmenities: [],
            aboutListing: ''
        },
        onSubmit: values => {
            values.aboutListing = content || ""; // Include content from JoditEditor in the form values
            values.listingAmenities = value.map(v => v.value); // Convert selected amenities to an array of strings
            submitAddListing(values); // Call the function to submit the listing
        },
    });

    // Function to handle the form submission and send the data to the backend
    const submitAddListing = async (values) => {
        let formData = new FormData(); // Create a new FormData object to send as multipart/form-data
        formData.append('listingNumber', values.listingNumber);
        formData.append('listingPrice', values.listingPrice);
        formData.append('listingDescription', values.listingDescription);
        formData.append('listingPax', values.listingPax);
        formData.append('listingLocation', values.listingLocation);
        formData.append('listingCategory', values.listingCategory);
        formData.append('aboutListing', values.aboutListing);
        formData.append('listingAvailability', values.listingAvailability);
        formData.append('listingAmenities', JSON.stringify(values.listingAmenities)); // Convert amenities array to JSON string
        Array.from(images).forEach(image => {
            formData.append('listingImages', image); // Append each image to the form data
        });

        const requestOptions = {
            method: 'POST',
            body: formData
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}listing`, requestOptions);
            const data = await response.json();
            if (response.ok) {
                toast.success(data.msg); // Show success message
                onClose(); // Close the modal
                onNewListing(); // Trigger parent component function to update listing list
            } else {
                toast.error(data.msg || 'Error adding listing'); // Show error message
            }
        } catch (error) {
            toast.error('Error adding listing'); // Show error message if the request fails
        }
    };

    // Reset form and state when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            formik.resetForm(); // Reset the form fields
            setValue([]); // Reset the select values
            setContent(""); // Reset the JoditEditor content
        }
    }, [isOpen]);

    // Configuration for CreatableSelect
    const components = {
        DropdownIndicator: null,
    };

    // Configuration for JoditEditor
    const joditConfig = useMemo(() => ({
        readonly: false,
        height: 400
    }), []);

    return (
        <>
            {/* Button to open the add listing modal */}
            <Button className="bg-transparent" onPress={onOpen}>
                <MdOutlineAddHome color='primary' size={30} aria-label='Add new Listing' />
            </Button>

            {/* Modal for adding a new listing */}
            <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} className="h-auto" scrollBehavior={scrollBehavior}>
                <ModalContent className="max-w-xl w-full mx-auto">
                    <ModalBody>
                        <form className='m-4 border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
                            <h1 className='text-4xl mb-4'>Add a New Listing</h1>
                            <div className="grid grid-cols-3 gap-4">
                                {/* Listing Number input field */}
                                <div>
                                    <label htmlFor="listingNumber">Listing Number</label>
                                    <Input
                                        id="listingNumber"
                                        name="listingNumber"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.listingNumber}
                                    />
                                </div>
                                {/* Listing Price input field */}
                                <div>
                                    <label htmlFor="listingPrice">Listing Price</label>
                                    <Input
                                        id="listingPrice"
                                        name="listingPrice"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.listingPrice}
                                    />
                                </div>
                                {/* Listing Pax input field */}
                                <div>
                                    <label htmlFor="listingPax">Listing Pax</label>
                                    <Input
                                        id="listingPax"
                                        name="listingPax"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.listingPax}
                                    />
                                </div>
                                {/* Listing Category radio buttons */}
                                <div>
                                    <label>Listing Category</label>
                                    <RadioGroup
                                        name="listingCategory"
                                        onChange={formik.handleChange}
                                    >
                                        <Radio value="Room">Room</Radio>
                                        <Radio value="Apartment">Apartment</Radio>
                                    </RadioGroup>
                                </div>
                                {/* Listing Location radio buttons */}
                                <div>
                                    <label>Listing Location</label>
                                    <RadioGroup
                                        name="listingLocation"
                                        onChange={formik.handleChange}
                                    >
                                        <Radio value="Nayabazar">Nayabazar</Radio>
                                        <Radio value="Boudha">Boudha</Radio>
                                    </RadioGroup>
                                </div>
                                {/* Listing Availability radio buttons */}
                                <div>
                                    <label>Availability</label>
                                    <RadioGroup
                                        name="listingAvailability"
                                        onChange={formik.handleChange}
                                    >
                                        <Radio value="Available">Available</Radio>
                                        <Radio value="Unavailable">Unavailable</Radio>
                                    </RadioGroup>
                                </div>
                                {/* Listing Description textarea */}
                                <div className="col-span-3">
                                    <label htmlFor="listingDescription">Listing Description</label>
                                    <Textarea
                                        id="listingDescription"
                                        name="listingDescription"
                                        onChange={formik.handleChange}
                                        value={formik.values.listingDescription}
                                        className="w-full"
                                    />
                                </div>
                                {/* About this Space rich text editor */}
                                <div className="col-span-3">
                                    <label htmlFor="aboutListing">About this Space</label>
                                    <JoditEditor
                                        value={content || ""} 
                                        config={joditConfig}
                                        tabIndex={1}
                                        onBlur={newContent => setContent(newContent)}
                                        onChange={newContent => setContent(newContent)}
                                    />
                                </div>
                                {/* Listing Amenities CreatableSelect */}
                                <div className="col-span-3">
                                    <label htmlFor='listingAmenities'>Listing Amenities</label>
                                    <CreatableSelect
                                        components={components}
                                        inputValue={inputValue}
                                        isClearable
                                        isMulti
                                        menuIsOpen={false}
                                        onChange={(newValue) => setValue(newValue)}
                                        onInputChange={(newValue) => setInputValue(newValue)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type something and press enter..."
                                        value={value}
                                    />
                                </div>
                                {/* Listing Image upload */}
                                <div className="col-span-3 p-2">
                                    <label htmlFor="listingImage">Listing Image</label><br/>
                                    <input type="file" name="listingImage" multiple onChange={(e) => setImages(e.target.files)} />
                                </div>
                            </div>
                            {/* Submit button to add the new listing */}
                            <button className='bg-blue-500 text-white rounded-xl shadow-lg p-2 mt-4 w-full' type="submit">Add New Listing</button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddListing;
