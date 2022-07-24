import Connection from "./Connection";
import pgp from "pg-promise";

// Adapter, Wrapper = Design Pattern de comportamento
export default class PgPromiseAdapter implements Connection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:postgres@localhost:5433"); //database era /app
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}
	// conversão de uma interface em outra
	close(): Promise<void> {
		return this.connection.$pool.end();
	}

}