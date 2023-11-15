import { request } from "../../../helper/request";

export class NotificationClientApi {
    static getAll = () => {
        return request({
          method: "GET",
          url: `/client/notification/listAdmin`,
        });
      };
    
}