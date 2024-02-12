import { MemoryRouter } from 'react-router-dom';
import { renderWithClient } from '../../../testUtils';
import Filters from './Filters';
import { fireEvent, waitFor, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const onFiltersApply = jest.fn();

describe('Unit test - filters', () => {
    it('should render filters', async () => {
        const { getByTestId } = renderWithClient(
            <Filters onFiltersApply={onFiltersApply} />,
        );

        await waitFor(() => {
            const technologyFilter = getByTestId('filters-select-technology');
            expect(technologyFilter).toBeTruthy();
            const versionsFilter = getByTestId('filters-input-version');
            expect(versionsFilter).toBeTruthy();
        });
    });
    it('apply and reset buttons should work', async () => {
        const { getByTestId, getByText } = renderWithClient(
            <Filters onFiltersApply={onFiltersApply} />,
        );
        await waitFor(() => {
            const technologyFilter = getByTestId('filters-select-technology');
            expect(technologyFilter).toBeTruthy();
            const versionsFilter = getByTestId('filters-input-version');
            expect(versionsFilter).toBeTruthy();
            fireEvent.mouseDown(technologyFilter.firstElementChild as Element);
        });
        await waitFor(() => {
            const nodejsOptions = screen.getAllByText('Nodejs');
            expect(nodejsOptions[1]).toBeVisible();
            userEvent.click(nodejsOptions[1], undefined, {
                skipPointerEventsCheck: true,
            });
        });
        act(() => {
            userEvent.type(getByTestId('filters-input-version'), 'somevalue');
        });
        const applyButton = getByTestId('apply-button');
        fireEvent.click(applyButton);
        expect(onFiltersApply).toHaveBeenCalledWith(
            'technology=Nodejs&version=somevalue',
        );
        const resetButton = getByTestId('reset-button');
        fireEvent.click(resetButton);
        fireEvent.click(applyButton);
        expect(onFiltersApply).toHaveBeenCalledWith('');
    });
});
