import Coupon from '../../../domain/entities/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';
import Connection from "../../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {

	constructor (readonly connection: Connection) {
	}

	async findByCode(code: string): Promise<Coupon> {
		const [couponData] = await this.connection.query("select * from ccca.coupon where code = $1", [code]);
		let coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
		return coupon;
	}

}