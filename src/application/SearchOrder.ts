import Order from '../domain/entities/Order';
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
// use case
export default class SearchOrder {

	constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {
	}

	async execute (orderCode: string): Promise<Output> {
		const order = await this.orderRepository.findByCode(orderCode) as Order;
		return {
			code: order.getCode(),
			cpf: order.cpf.getValue(),
			couponCode: (order.coupon)? order.coupon?.code: ""
		};
	}
}

type Output = {
	code: string,
	cpf: string,
	couponCode: string
}