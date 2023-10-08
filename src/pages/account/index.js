import React, { useCallback, useEffect } from 'react'
import {
    LegacyCard,
    Form,
    FormLayout,
    Layout,
    Page,
    TextField,
    Button,
    Toast,
    Modal
} from '@shopify/polaris';
import { useState } from 'react';
import { useField, notEmptyString, useDynamicList, useForm } from '@shopify/react-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdress } from '@/redux/addressSlice';

export default function Account() {
    const dispatch = useDispatch();
    // const { updateData } = useData();
    const accountInfo = useSelector(state => state.accountInfo);
    const [toastActive, setToastActive] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // const [data, setData] = useState({
    //     name: "",
    //     email: "",
    //     addresses: [
    //         {
    //             address: "",
    //             city: ""
    //         }
    //     ]
    // });

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`/api/account`);
            const resJson = await res.json();
            if (res.status === 200) {
                // setData(resJson)
                dispatch(updateAdress(resJson))
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }, [])
    const handleSubmitForm = async (form) => {
        const res = await fetch(`/api/submit`, {
            method: 'POST',
            body: JSON.stringify(form)
        });
        // updateData(form)
        // dispatch(updateAdress(form))
    };
    const nameField = useField({
        value: accountInfo.name,
        validates: [notEmptyString('Name is required')],
    });
    const emailField = useField({
        value: accountInfo.email,
        validates: [
            notEmptyString('Email is required'),
            (value) => {
                if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    return 'Email is invalid!';
                }
            },
        ],
    });
    const emptyNewAddress = () => ({
        address: '',
        city: '',
    });
    const { fields: addresses, addItem, removeItem } = useDynamicList(accountInfo.addresses, emptyNewAddress);
    const handleDeleteClick = (index) => {
        setIsDeleteModalOpen(true);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };
    const handleConfirmDelete = (index) => {
        setIsDeleteModalOpen(false);
        removeItem(index)
    };
    const { fields, submit, submitting } =
        useForm({
            fields: {
                name: nameField,
                email: emailField,
            },
            onSubmit: async (form) => {
                let isValidate = true;
                addresses.forEach(item => {
                    if (!item.address.value || !item.address.value.trim()) {
                        item.address.setError("Address is required!")
                        isValidate = false
                    } else {
                        item.address.setError("")
                    }
                    if (!item.city.value || !item.city.value.trim()) {
                        item.city.setError("City is is required!")
                        isValidate = false;
                    } else {
                        item.city.setError("")
                    }
                })
                if (!isValidate) {
                    return { status: 'fail', errors: [{ message: 'bad form data' }] }
                }
                const formData = {
                    name: form.name,
                    email: form.email,
                    addresses: addresses.map((address) => ({
                        address: address.address.value,
                        city: address.city.value
                    }))
                };
                await handleSubmitForm(formData);
                setToastActive(true);
                setTimeout(() => {
                    setToastActive(false);
                }, 1500);
                return { status: 'true' };
            },
        });

    return (
        <div style={{ textAlign: 'left' }}>
            <Page title="Account">
                <Layout>
                    <Layout.AnnotatedSection
                        title="Account details"
                        description="Shopify will use this as your account information."
                    >
                        {toastActive && (
                            <Toast
                                content="Save data successfully!"
                                onDismiss={() => setToastActive(false)}
                            />
                        )}
                        <Form onSubmit={submit}>
                            <LegacyCard sectioned>
                                <FormLayout>
                                    <TextField
                                        label="Full name"
                                        {...fields.name}
                                    />
                                    <TextField
                                        type='email'
                                        label="Email"
                                        {...fields.email}
                                    />
                                </FormLayout>
                            </LegacyCard>
                            <LegacyCard sectioned>
                                <FormLayout>
                                    {addresses.map((address, index) => {
                                        return (
                                            <div key={index} style={{ marginTop: '30px' }}>
                                                <FormLayout key={index}>
                                                    <TextField
                                                        label={`Address (${index + 1})`}
                                                        {...address.address}
                                                        onChange={(value) => {
                                                            address.address.onChange(value)
                                                            if (!value || !value.trim()) {
                                                                address.address.setError("Address is required!")
                                                            } else {
                                                                address.address.setError("")
                                                            }
                                                        }}
                                                        placeholder='Your address'
                                                    />
                                                    <TextField
                                                        label="City"
                                                        {...address.city}
                                                        onChange={(value) => {
                                                            address.city.onChange(value)
                                                            if (!value || !value.trim()) {
                                                                address.city.setError("City is required!")
                                                            } else {
                                                                address.city.setError("")
                                                            }
                                                        }}
                                                        placeholder='Your city'
                                                    />
                                                    <Button onClick={() => handleDeleteClick(index)} destructive> Delete {`Address (${index + 1})`}</Button>
                                                </FormLayout>
                                            </div>
                                        )
                                    })}
                                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                                        <Button onClick={() => addItem()}>New Address</Button>
                                        <Button
                                            submit
                                            primary
                                            disabled={submitting}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </FormLayout>
                            </LegacyCard>
                            <Modal
                                open={isDeleteModalOpen}
                                onClose={handleCancelDelete}
                                title="Confirm Delete"
                                primaryAction={{
                                    content: 'Delete',
                                    onAction: handleConfirmDelete,
                                    destructive: true,
                                }}
                                secondaryActions={[
                                    {
                                        content: 'Cancel',
                                        onAction: handleCancelDelete,
                                    },
                                ]}
                            >
                                <Modal.Section>
                                    <p>Are you sure you want to delete this item?</p>
                                </Modal.Section>
                            </Modal>
                        </Form>
                    </Layout.AnnotatedSection>
                </Layout>
            </Page>
        </div>
    )
}
