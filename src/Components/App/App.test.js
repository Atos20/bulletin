import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  beforeEach(() => {

  });

  it('shoudl render the application without crashing', () => {

    render(<App />);
    
  });
})
