import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/layout/Footer';
import ContactUsPage from '../pages/ContactUsPage';
import { MemoryRouter } from 'react-router-dom';
import { ADDRESS, BUSINESS_NAME } from '../constants/nap';
import '@testing-library/jest-dom';
beforeAll(() => {
  class MockIntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
    root = null;
    rootMargin = '';
    thresholds = [0];
  }
  // @ts-ignore
  global.IntersectionObserver = MockIntersectionObserver;
});

describe('NAP consistency and microformats', () => {
  test('Footer renders microformat address with h-card and p-adr', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const hcard = screen.getByText(/Branch Office:/i).closest('address');
    expect(hcard).toBeTruthy();
    expect(hcard?.className).toContain('h-card');
    const adr = hcard?.querySelector('.p-adr');
    expect(adr).toBeTruthy();
    // Check visible lines
    expect(screen.getByText(ADDRESS.streetAddressLine1)).toBeInTheDocument();
    expect(screen.getByText(ADDRESS.streetAddressLine2)).toBeInTheDocument();
    expect(screen.getByText(ADDRESS.regionLine)).toBeInTheDocument();
  });

  test('Contact page renders h-card with p-name and p-adr', () => {
    render(<ContactUsPage />);
    const addressEl = screen.getByText(/Branch Office/i).parentElement?.querySelector('address');
    expect(addressEl).toBeTruthy();
    expect(addressEl?.className).toContain('h-card');
    const pname = addressEl?.querySelector('.p-name');
    expect(pname).toBeTruthy();
    expect(pname?.textContent).toContain(BUSINESS_NAME);
    const adr = addressEl?.querySelector('.p-adr');
    expect(adr).toBeTruthy();
    expect(screen.getByText(ADDRESS.streetAddressLine1)).toBeInTheDocument();
    expect(screen.getByText(ADDRESS.streetAddressLine2)).toBeInTheDocument();
    expect(screen.getByText(ADDRESS.regionLine)).toBeInTheDocument();
  });
});
