export class Producto{
    private _id:number;
    private _nombre:string;
    private _precio:number;
    private _cantidad:number;

    /**
     * Getter cantidad
     * @return {number}
     */
	public get cantidad(): number {
		return this._cantidad;
	}

    /**
     * Setter cantidad
     * @param {number} value
     */
	public set cantidad(value: number) {
		this._cantidad = value;
	}


	constructor() {
	}

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */

    /**
     * Getter precio
     * @return {number}
     */
	public get precio(): number {
		return this._precio;
	}

    /**
     * Setter precio
     * @param {number} value
     */
	public set precio(value: number) {
		this._precio = value;
	}
	public set id(value: number) {
		this._id = value;
	}
    

    /**
     * Getter nombre
     * @return {string}
     */
	public get nombre(): string {
		return this._nombre;
	}

    /**
     * Setter nombre
     * @param {string} value
     */
	public set nombre(value: string) {
		this._nombre = value;
	}
    

}