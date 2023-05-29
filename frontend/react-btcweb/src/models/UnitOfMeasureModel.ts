class UnitOfMeasureModel {
    id: number;
    name: string;
    symbol: string;


    constructor(id: number, name: string, symbol: string){
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }
}

export default UnitOfMeasureModel;