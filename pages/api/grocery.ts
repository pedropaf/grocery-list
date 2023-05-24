let groceryList: GroceryItem[] = [];

export type GroceryItem = {
  item: string;
  purchased: boolean;
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(groceryList);
      break;
    case 'POST':
      const { item } = req.body;
      const newItem = { item, purchased: false };
      if (method === 'POST') {
        groceryList.push(newItem);
      }
      res.status(200).json(newItem);
      break;
    case 'PUT':
      const { item: toggleItem } = req.body || {};
      groceryList = groceryList.map((groceryItem) =>
        groceryItem.item === toggleItem
          ? { ...groceryItem, purchased: !groceryItem.purchased }
          : groceryItem
      );
      res.status(200).json(groceryList);
      break;
    case 'DELETE':
      const { item: deleteItem } = req.body;
      groceryList = groceryList.filter((groceryItem) => groceryItem.item !== deleteItem);
      res.status(200).json(groceryList);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
