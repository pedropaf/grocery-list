import handler, { GroceryItem } from '../../pages/api/grocery';

let mockGroceryList: GroceryItem[] = [];
const mockRes = {
  status: jest.fn(() => mockRes),
  end: jest.fn(),
  json: jest.fn((list) => (mockGroceryList = list)),
  setHeader: jest.fn(),
};

beforeEach(() => {
  mockRes.status.mockClear();
  mockRes.end.mockClear();
  mockRes.json.mockClear();
  mockRes.setHeader.mockClear();
});

test('GET method responds with grocery list', async () => {
  await handler({ method: 'GET' }, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).toEqual([]);
});

test('POST method adds an item to the grocery list', async () => {
  await handler({ method: 'POST', body: { item: 'Apple' } }, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).toEqual({ item: 'Apple', purchased: false });
});

test('PUT method toggles the purchased status of an item in the grocery list', async () => {
  mockGroceryList = [{ item: 'Apple', purchased: false }];

  await handler({ method: 'PUT', body: { item: 'Apple' } }, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).toEqual([{ item: 'Apple', purchased: true }]);
});

test('POST method deletes an item from the grocery list', async () => {
  mockGroceryList = [{ item: 'Apple', purchased: false }];

  await handler({ method: 'DELETE', body: { item: 'Apple' } }, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalled();
  expect(mockGroceryList).toEqual([]);
});
