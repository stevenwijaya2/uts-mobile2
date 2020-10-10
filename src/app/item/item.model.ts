export interface Item {
    id: number;
    name: string;
    model: string;
    brand: string;
    imageUrl: string;
    price: number;
    stock: number;
    type: string;
    desc: {
        base_clock: string;
        boost_clock: string;
        core: number;
        thread: number;
        processor_compabilty: string;
        motherboard_chipset: string;
        ram_type: string;
        ram_speed: string;
    }
}
