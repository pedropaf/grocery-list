let groceryList = [];

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
      const { item, action } = req.body;
      if (action === 'add') {
        groceryList.push({ item, purchased: false });
      } else if (action === 'delete') {
        groceryList = groceryList.filter((groceryItem) => groceryItem.item !== item);
      } else if (action === 'toggle') {
        groceryList = groceryList.map((groceryItem) =>
          groceryItem.item === item
            ? { ...groceryItem, purchased: !groceryItem.purchased }
            : groceryItem
        );
      }
      res.status(200).json(groceryList);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
