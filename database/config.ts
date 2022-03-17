import { createConnection } from "typeorm";

export async function DBConnection() {
    try {
        const connection = await createConnection();
        console.log("Connection succesfully");
    } catch (error) {
        console.log(`Database error: ${error}`);
    }
}
