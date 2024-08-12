'use client'
import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup, Textarea } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { MdOutlineAddHome } from "react-icons/md";
import CreatableSelect from 'react-select/creatable';

const AddListing = ({ onNewListing }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const [images, setImages] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState([]);
    const [content, setContent] = useState(""); // Initialized as an empty string

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

    const createOption = (label) => ({
        label,
        value: label,
    });

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
            values.aboutListing = content || ""; // Ensure JoditEditor content is included
            values.listingAmenities = value.map(v => v.value); // Ensure listingAmenities is correctly captured
            submitAddListing(values);
        },
    });

    const submitAddListing = async (values) => {
        let formData = new FormData();
        formData.append('listingNumber', values.listingNumber);
        formData.append('listingPrice', values.listingPrice);
        formData.append('listingDescription', values.listingDescription);
        formData.append('listingPax', values.listingPax);
        formData.append('listingLocation', values.listingLocation);
        formData.append('listingCategory', values.listingCategory);
        formData.append('aboutListing', values.aboutListing);
        formData.append('listingAvailability', values.listingAvailability);
        formData.append('listingAmenities', JSON.stringify(values.listingAmenities));
        Array.from(images).forEach(image => {
            formData.append('listingImages', image);
        });

        const requestOptions = {
            method: 'POST',
            body: formData
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}listing`, requestOptions);
            const data = await response.json();
            if (response.ok) {
                toast.success(data.msg);
                onClose(); // Close the modal after successful submission
                onNewListing(); // Trigger parent component function to update listing list
            } else {
                toast.error(data.msg || 'Error adding listing');
            }
        } catch (error) {
            toast.error('Error adding listing');
        }
    };

    useEffect(() => {
        if (!isOpen) {
            formik.resetForm(); // Reset form when modal is closed
            setValue([]); // Reset the select values
            setContent(""); // Reset the JoditEditor content
        }
    }, [isOpen]);

    const components = {
        DropdownIndicator: null,
    };

    const joditConfig = useMemo(() => ({
        readonly: false,
        height: 400
    }), []);

    return (
        <>
            <Button className="bg-transparent" onPress={onOpen}>
                <MdOutlineAddHome color='primary' size={30} aria-label='Add new Listing' />
            </Button>
            <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} className="h-auto" scrollBehavior={scrollBehavior}>
                <ModalContent className="max-w-xl w-full mx-auto">
                    <ModalBody>
                        <form className='m-4 border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
                            <h1 className='text-4xl mb-4'>Add a New Listing</h1>
                            <div className="grid grid-cols-3 gap-4">
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
                                <div className="col-span-3 p-2">
                                    <label htmlFor="listingImage">Listing Image</label><br/>
                                    <input type="file" name="listingImage" multiple onChange={(e) => setImages(e.target.files)} />
                                </div>
                            </div>
                            <button className='bg-blue-500 text-white rounded-xl shadow-lg p-2 mt-4 w-full' type="submit">Add New Listing</button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddListing;
