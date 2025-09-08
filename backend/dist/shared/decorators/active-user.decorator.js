"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUser = void 0;
const common_1 = require("@nestjs/common");
exports.ActiveUser = (0, common_1.createParamDecorator)((data, ctx) => {
    console.log('llegue aca');
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    return request.user;
});
//# sourceMappingURL=active-user.decorator.js.map