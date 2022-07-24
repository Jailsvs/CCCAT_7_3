import axios from "axios";
import Order from '../../src/domain/entities/Order';

test.skip("Deve simular uma compra", async function () {
	const response = await axios({
		url: "http://localhost:3000/orders/preview",
		method: "post",
		data: {
			cpf: "886.634.854-68",
			orderItems: [
				{ idItem: 1, quantity: 1 },
				{ idItem: 2, quantity: 1 },
				{ idItem: 3, quantity: 3 }
			]
		}
	});
	const output = response.data;
	expect(output.total).toBe(6350);
});

test("Deve retornar a compra com código 202200000001", async function () {
	const response = await axios({
		url: "http://localhost:3000/orders/202200000001",
		method: "get"
	});
	const output = response.data;
	expect(output.code).toBe("202200000001");
});

test("Deve retornar todos as compras cadastradas", async function () {
	const response = await axios({
		url: "http://localhost:3000/orders",
		method: "get"
	});
	const output = response.data;
	expect(output).toHaveLength;
});