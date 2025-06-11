import api from "@/lib/api";
import { Step } from "@/lib/stores/circuit-store";

export default async function setCircuitSteps(circuitId: string, steps: Step[]) {
    const response = await api.post(`/api/circuits/${circuitId}/set-steps`, {
        steps,
    })

    if (response.status !== 200) {
        throw new Error('Failed to set circuit steps')
    }

    return response.data
}
