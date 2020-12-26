import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
	test('status from props should be in the state', () => {
		const component = create(<ProfileStatus status="some status" />);
		const instance = component.getInstance();
		expect(instance.state.status).toBe('some status');
	});

	test('after creation edit button must be displayed (editMode is false)', () => {
		const component = create(<ProfileStatus status="some status" />);
		const root = component.root;
		const editButton = root.findByType('button');
		expect(editButton).not.toBeUndefined();
	});

	test('after click on edit button status input must be displayed instead of edit button (editMode is true)', () => {
		const component = create(<ProfileStatus status="some status" />);
		const root = component.root;
		const editButton = root.findByType('button');
		editButton.props.onClick();
		const statusInput = root.findByType('input');
		expect(statusInput).not.toBeUndefined;
		expect(editButton).toBeUndefined;
	});

	test('updateStatus callback must be called', () => {
		const mockFunction = jest.fn();
		const component = create(<ProfileStatus status="some status" updateStatus={mockFunction} />);
		const instance = component.getInstance();
		instance.setState({ status: '1' });
		instance.onStatusInputBlur();

		expect(mockFunction.mock.calls.length).toBe(1);
	});
});
