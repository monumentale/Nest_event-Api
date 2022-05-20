import { Injectable } from '@nestjs/common';
import { sign } from "jsonwebtoken";
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
    private tokenExpiresIn: number;
    static secretKey: string = "this is a secret key";

    constructor(private readonly userService: UserService){ }

    async signPayload(payload: any) {
        this.tokenExpiresIn = 86400;//24 hours{ milliseconds }
        return sign(payload, AuthService.secretKey, { expiresIn: "24h" });
    }

    async validateUser(payload: any): Promise<User> {
        return await this.userService.getUserByPayload(payload);
    }

    setTokenExpiresIn(expiresIn: number): void {
        this.tokenExpiresIn = expiresIn;
    }

    getTokenExpiresIn(): number {
        return this.tokenExpiresIn;
    }
}