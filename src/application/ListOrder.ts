import Order from '../domain/entities/Order';
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
// use case
export default class ListOrder {

	constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {
	}

	async execute (): Promise<Output> {
		const orders = await this.orderRepository.list();
		return {
			orders
		};
	}
}

type Output = {
	orders: Order[]
}