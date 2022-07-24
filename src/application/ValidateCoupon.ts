import Coupon from '../domain/entities/Coupon';

// use case
export default class ValidateCoupon {

	constructor () {
	}

	async execute (input: Input): Promise<Output> {
		// Entity (Clean Architecture)
		const coupon = new Coupon(input.code, input.percentage, input.expireDate);
		return {
			isValid: !coupon.isExpired(input.date)
		};
	}
}

type Input = {
	code: string;
	percentage: number;
	expireDate: Date;
	date: Date
}

type Output = {
	isValid: boolean
}
