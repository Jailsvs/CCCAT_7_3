import ListOrder from '../../src/application/ListOrder';
import PgPromiseAdapter from '../../src/infra/database/PgPromiseAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';

test("Deve retornar um array de pedidos com 1 pedido", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const orderRepository = new OrderRepositoryDatabase(connection);
	const listOrder = new ListOrder(itemRepository, orderRepository);
	const orderOutput = await listOrder.execute();
	//console.log(orderOutput);
	expect(orderOutput.orders).toHaveLength;
	await connection.close();
});
