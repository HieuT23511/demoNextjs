import React, { useCallback, useEffect } from 'react'
import {
    LegacyCard,
    Form,
    FormLayout,
    Layout,
    Page,
    TextField,
    Button,
    Toast
} from '@shopify/polaris';
import { useState } from 'react';
import { useField, notEmptyString, useDynamicList, useForm } from '@shopify/react-form';

export default function Account() {
    const [toastActive, setToastActive] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        addresses: [
            {
                address: "",
                city: ""
            }
        ]
    });
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const res = await fetch(`/api/account`);
        const resJson = await res.json();
        console.log({ resJson });
        if (resJson) {
            setAccount(resJson)
        }
        setLoading(false)
    }, [])
    const onSubmit = async (form) => {
        setData(form)
        console.log(data);
        const res = await fetch(`/api/submit`, {
            method: 'POST',
            body: JSON.stringify(form.addresses)
        });
    };

    const nameField = useField({
        value: data.name,
        validates: [notEmptyString('Name is required')],
    });
    const emailField = useField({
        value: data.email,
        validates: [
            notEmptyString('Email is required'),
            (value) => {
                if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    return 'Email không hợp lệ';
                }
            },
        ],
    });

    const emptyNewAddress = () => ({
        address: '',
        city: '',
    });
    const { fields: addresses, addItem, removeItem } = useDynamicList(data.addresses, emptyNewAddress);

    const deleteAddressWithConfirmation = (index) => {
        const isConfirmed = window.confirm('Are you sure to delete this address?');
        if (isConfirmed) {
            removeItem(index);
        }
    };

    const { fields, submit, submitting } =
        useForm({
            fields: {
                name: nameField,
                email: emailField,
            },

            onSubmit: async (form) => {
                const formData = {
                    name: form.name,
                    email: form.email,
                    addresses: addresses.map((address) => ({
                        address: address.address.value,
                        city: address.city.value
                    }))
                };
                try {
                    await onSubmit(formData);
                    setToastActive(true);
                    setTimeout(() => {
                        setToastActive(false);
                    }, 1500);
                } catch (error) {
                    console.error('Lỗi khi lưu dữ liệu:', error);
                }
                return { status: 'true' };
            },
        });
    return (
        <div style={{ textAlign: 'left' }}>
            <div>
                <h2>list address: {JSON.stringify(account)}</h2>
            </div>
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
                                    {addresses.map((address, index) => (
                                        <div key={index} style={{ marginTop: '30px' }}>
                                            <FormLayout key={index}>
                                                <TextField
                                                    label={`Address(${index + 1})`}
                                                    {...address.address}
                                                    placeholder='your address'
                                                />
                                                <TextField
                                                    label="City"
                                                    {...address.city}
                                                    placeholder='your city'
                                                />
                                                <button onClick={() => deleteAddressWithConfirmation(index)}> Delete {`Address(${index + 1})`}</button>
                                            </FormLayout>
                                        </div>
                                    ))}
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
                        </Form>
                    </Layout.AnnotatedSection>
                </Layout>
            </Page>
        </div>
    )
}
