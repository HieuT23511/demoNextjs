import { updateDataAccount } from '@/redux/addressReducer';
import { Layout, LegacyCard, Page, DataTable } from '@shopify/polaris';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function AddressInfo() {
    // const [addresses, setAddresses] = useState([])
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.accountInfo.addresses)
    useEffect(() => {
        fetchDataAddress()
    }, []);
    const fetchDataAddress = useCallback(async () => {
        try {
            const res = await fetch(`/api/account`);
            const resJson = await res.json();
            if (res.status === 200) {
                dispatch(updateDataAccount(resJson))
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }, [])
    const rows = addresses.map((item) => [item.address, item.city])
    return (
        <div style={{ textAlign: 'left' }}>
            <Page title='Address'>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Address details"
                        description='You can click Account menu to edit addresses.'
                    >
                        <LegacyCard sectioned>
                            {addresses.length === 0 ? (
                                <p>No data address, you need update your address</p>
                            ) : (
                                <DataTable
                                    columnContentTypes={[
                                        'text',
                                        'text',
                                    ]}
                                    headings={[
                                        'Address',
                                        'City',
                                    ]}
                                    rows={rows}
                                />
                            )}
                        </LegacyCard>
                    </Layout.AnnotatedSection>
                </Layout >
            </Page>
        </div>
    )
}