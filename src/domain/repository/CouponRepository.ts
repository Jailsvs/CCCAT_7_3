import Coupon from '../entities/Coupon';

export default interface CouponRepository {
	findByCode(code: string): Promise<Coupon>;
}
