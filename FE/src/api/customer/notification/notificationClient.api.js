import { request } from "../../../helper/request";

export class NotificationClientApi {
    static getAll = () => {
        return request({
          method: "GET",
          url: `/client/notification/listAdmin`,
        });
      };
      static getNotRead = () => {
        return request({
          method: "GET",
          url: `/client/notification/listAdminNotRead`,
        });
      };
}

