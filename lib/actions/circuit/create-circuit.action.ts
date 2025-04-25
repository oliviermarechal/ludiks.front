import api from "@/lib/api";

export default async function createCircuit(name: string, type: string, projectId: string, description?: string) {
    const response = await api.post('/api/circuits', {
        name,
        type,
        projectId,
        description,
    })

    if (response.status !== 201) {
        throw new Error('Failed to create circuit')
    }

    return response.data
}
