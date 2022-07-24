import ValidateCoupon from '../../src/application/ValidateCoupon';

test("Deve validar um cupom expirado", async function () {
	const previewOrder = new ValidateCoupon();
	const output = await previewOrder.execute({code: "Vale20", date: new Date(), 
	                                           expireDate: new Date("2022-05-01T10:00:00"), percentage: 20});
	expect(output.isValid).toBe(false);
});

test("Deve validar um cupom não expirado", async function () {
	const previewOrder = new ValidateCoupon();
	const expireDate = new Date();
	expireDate.setHours(expireDate.getHours() +2);

	const output = await previewOrder.execute({code: "Vale20", date: new Date(), 
	                                           expireDate, percentage: 20});
	expect(output.isValid).toBe(true);
});
