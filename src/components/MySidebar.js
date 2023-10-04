import { Navigation } from '@shopify/polaris';
import { HomeMinor, LocationFilledMajor, ArrowLeftMinor } from '@shopify/polaris-icons';
// import { useNavigate, useLocation } from 'react-router-dom'
import React from 'react';
import { useRouter } from 'next/router'

export default function MySidebar() {
    const router = useRouter();
    return (
        <div style={{ textAlign: "left" }}>
            <Navigation>
                <Navigation.Section
                    items={[
                        {
                            label: 'Back to Home',
                            icon: ArrowLeftMinor,
                            onClick: () => router.push('/'),
                        },
                    ]}
                />
                <Navigation.Section
                    separator
                    title="Exercise 1"
                    items={[
                        {
                            label: 'Account',
                            icon: HomeMinor,
                            onClick: () => router.push('/account'),
                            selected: router.pathname === '/account'
                        },
                        {
                            label: 'Address',
                            icon: LocationFilledMajor,
                            onClick: () => router.push('/address'),
                            selected: router.pathname === '/address'
                        },
                    ]}
                />
            </Navigation>
        </div >
    );
}