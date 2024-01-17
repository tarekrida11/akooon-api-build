import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { MailerService } from 'src/mailer/mailer.service';
import { MailData } from './interfaces/mail-data.interface';
export declare class MailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService<AllConfigType>);
    userSignUp(mailData: MailData<{
        code: string;
    }>): Promise<void>;
    forgotPassword(mailData: MailData<{
        code: string;
        name: string;
    }>): Promise<void>;
}
