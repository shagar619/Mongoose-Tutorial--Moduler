

interface IAddress {
    city: string,
    street: string,
    zip: number
}


interface IUser {
    name: string,
    email: string,
    phone: string,
    password: string,
    role: "Admin" | "Customer",
    address: IAddress
}