import { httpService } from "./services/httpService"
const getSecrets = async () => {
    const secrets = await httpService.get('secret/')
    return secrets
}
export const secrets = getSecrets()
