import isValidDomain from 'is-valid-domain';
import isValidIp from 'is-ip';
export default class Validators {

    isValid(payload: string) {
        return isValidDomain(payload) || isValidIp(payload);
    }

    isValidDomain(payload: string) {
        return isValidDomain(payload);
    }
    isValidIp(payload: string) {
        return isValidIp;
    }

}
