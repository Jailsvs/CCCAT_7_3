import SearchOrder from "../../src/application/SearchOrder";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("Deve retornar um pedido pelo código", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const orderRepository = new OrderRepositoryDatabase(connection);
	const serachOrder = new SearchOrder(itemRepository, orderRepository);
	const orderOutput = await serachOrder.execute("202200000001");
	expect(orderOutput.code).toBe("202200000001");
	expect(orderOutput.couponCode).toBe("");
	await connection.close();
});
