import api from "@/lib/api";

export default async function createProject(name: string) {
    const response = await api.post('/api/projects', {
        name,
    })

    if (response.status !== 201) {
        throw new Error('Failed to create project')
    }

    return response.data
}
