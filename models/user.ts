export interface ICartItem {
  id: number;
  cartId: number;
  productSKUId: number;
  productSKUName: string;
  quantity: number;
  price: number;
  imageUrl: string;
  unitPrice: number;
  stock: boolean;
}
