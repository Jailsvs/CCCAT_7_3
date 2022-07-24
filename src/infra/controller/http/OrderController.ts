import Connection from "../../database/Connection";
import Http from "../../http/Http";
import ItemRepositoryDatabase from "../../repository/database/ItemRepositoryDatabase";
import PreviewOrder from "../../../application/PreviewOrder";
import SearchOrder from '../../../application/SearchOrder';
import OrderRepositoryDatabase from '../../repository/database/OrderRepositoryDatabase';
import ListOrder from '../../../application/ListOrder';
// Interface Adapter
export default class OrderController {

	constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/orders/preview", function (params: any, body: any) {
			const itemRepository = new ItemRepositoryDatabase(connection);
			const previewOrder = new PreviewOrder(itemRepository);
			const output = previewOrder.execute(body);
			return output;
		});

		http.on("get", "/orders/:code", function (params: any, body: any) {
			const itemRepository = new ItemRepositoryDatabase(connection);
			const orderRepository = new OrderRepositoryDatabase(connection);
			const searchOrder = new SearchOrder(itemRepository, orderRepository);
			const output = searchOrder.execute(params.code);
			return output;
		});

		http.on("get", "/orders", function (params: any, body: any) {
			const itemRepository = new ItemRepositoryDatabase(connection);
			const orderRepository = new OrderRepositoryDatabase(connection);
			const listOrder = new ListOrder(itemRepository, orderRepository);
			const output = listOrder.execute();
			return output;
		});
	}
}
