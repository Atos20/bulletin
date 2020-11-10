import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { News } from './News';

describe('News', () => {
  it('News should render withou crashing', () => {
    render(
      <MemoryRouter>
        <News 
          laterReadings={[]}
          deleteSavedReading={jest.fn()}
        />
      </MemoryRouter>
    );
  });

});