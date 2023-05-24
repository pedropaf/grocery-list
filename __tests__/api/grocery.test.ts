import handler, { GroceryItem } from '../../pages/api/grocery';

test('responds to GET and POST methods', async () => {
  let mockGroceryList: GroceryItem[] = [];
  const mockRes = {
    status: jest.fn(() => mockRes),
    end: jest.fn(),
    json: jest.fn((list) => mockGroceryList = list),
    setHeader: jest.fn(),
  };

  // Test GET method
  await handler({ method: 'GET' }, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();

  // Test POST method with add action
  await handler({ method: 'POST', body: { item: 'Apple', action: 'add' } }, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).toContainEqual({ item: 'Apple', purchased: false });

  // Test POST method with toggle action
  await handler({ method: 'POST', body: { item: 'Apple', action: 'toggle' } }, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).toContainEqual({ item: 'Apple', purchased: true });

  // Test POST method with delete action
  await handler({ method: 'POST', body: { item: 'Apple', action: 'delete' } }, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).not.toContainEqual({ item: 'Apple', purchased: true });

  // Test unsupported method
  await handler({ method: 'PUT' }, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(405);
  expect(mockRes.setHeader).toHaveBeenCalledWith('Allow', ['GET', 'POST']);
});
