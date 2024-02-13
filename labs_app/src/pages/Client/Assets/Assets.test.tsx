import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { renderWithClient } from '../../../testUtils';
import Assets from './Assets';
import { waitFor, within } from '@testing-library/react';

const onFiltersApply = jest.fn();

describe('Unit test - assets', () => {
    it('should render assets', async () => {
        const { getByTestId } = renderWithClient(
            <MemoryRouter initialEntries={['/client/1']}>
                <Routes>
                    <Route path="client/:clientId" element={<Assets />}></Route>
                </Routes>
            </MemoryRouter>,
        );

        await waitFor(() => {
            const assetsTable = getByTestId('assets-table');
            expect(assetsTable).toBeTruthy();
            const rows = within(assetsTable).getAllByRole('row');
            expect(rows).toHaveLength(3);
        });
    });
});
