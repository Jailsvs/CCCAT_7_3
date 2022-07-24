import Coupon from '../../../domain/entities/Coupon';
import Dimension from '../../../domain/entities/Dimension';
import Item from '../../../domain/entities/Item';
import Order from "../../../domain/entities/Order";
import OrderItem from '../../../domain/entities/OrderItem';
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}
	
	async list(): Promise<Order[]> {
		const ordersData = await this.connection.query("select * from ccca.order", []);
		let orders: Order[] = [];

		for (const orderData of ordersData) {
			const [couponData] = await this.connection.query("select * from ccca.coupon where code = $1", [orderData.coupon_code]);
			const order = new Order(orderData.cpf, orderData.issue_date, orderData.code);
			if (couponData) {
				const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
				order.addCoupon(coupon);
			}	
			orders.push(order);
		}		
		return orders;	
	}

	async findByCode(code: string): Promise<Order> {
		const [orderData] = await this.connection.query("select * from ccca.order where code = $1", [code]);
		const orderItems = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
		const [couponData] = await this.connection.query("select * from ccca.coupon where code = $1", [code]);
		let order = new Order(orderData.cpf, orderData.issue_date, orderData.code);
		if (couponData) {
			const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
			order.addCoupon(coupon);
		}		
		for (const orderItemData of orderItems) {
			const [itemData] = await this.connection.query("select * from ccca.item where id_item = $1", [orderItemData.id_item]);
			const item = new Item(orderItemData.id_item, itemData.description, orderItemData.price, 
				                    new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
			order.addItem(item, orderItemData.quantity);
		}
		return order;
	}

	async save(order: Order): Promise<void> {
		const [orderData] = await this.connection.query("insert into ccca.order (code, cpf, issue_date, total, freight) values ($1, $2, $3, $4, $5) returning *", [order.getCode(), order.cpf.getValue(), order.date, order.getTotal(), order.freight]);
		for (const orderItem of order.orderItems) {
			await this.connection.query("insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)", [orderData.id_order, orderItem.idItem, orderItem.price, orderItem.quantity]);
		}
	}

	async count(): Promise<number> {
		const [row] = await this.connection.query("select count(*)::int from ccca.order", []);
		return row.count;
	}

	async clean(): Promise<void> {
		await this.connection.query("delete from ccca.order_item", []);
		await this.connection.query("delete from ccca.order", []);
	}
}