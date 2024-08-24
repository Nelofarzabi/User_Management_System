"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    otp_digit_numbers: process.env.OTP_DIGIT_NUMBERS,
    db: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        host: process.env.DB_HOST,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        invitationExpirationMinutes: process.env.JWT_INVITATION_EXPIRATION_MINUTES,
    },
};
//# sourceMappingURL=config.js.map