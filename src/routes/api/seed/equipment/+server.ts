import { seedEquipmentData } from "$lib/db/mutations/equipment";

export async function GET() {
    const data = await seedEquipmentData()
    return data
}